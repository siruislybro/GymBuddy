import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import BackButton from '../../../components/BackButton';
import { doc, getDoc, setDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../../../../firebase';

const CaloriesScreen = ( {navigation} ) => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [recommendedCalories, setRecommendedCalories] = useState(null);
  const [manualCalories, setManualCalories] = useState('');
  const [currentCalories, setCurrentCalories] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);
  const user = auth.currentUser;
 

  const knowYourCalories = () => {
    navigation.navigate("RecommendedCalories")
  }
  
  
// Fetch recommended and current calories from Firestore
useEffect(() => {
  const fetchCaloriesData = async () => {
    try {
      const docSnap = await getDoc(doc(db, 'users', user.uid, 'nutrition', 'calories'));
      if (docSnap.exists()) {
        const data = docSnap.data();
        setRecommendedCalories(data.recommended);

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayTimestamp = Timestamp.fromDate(today);
        console.log(todayTimestamp);

        if (data.lastUpdated && data.lastUpdated.toDate() < today) {
          setCurrentCalories(0);
          setLastUpdated(todayTimestamp);
          await updateDoc(doc(db, 'users', user.uid, 'nutrition', 'calories'), {
            current: 0,
            lastUpdated: todayTimestamp
          });
        } else if (data.current) {
          setCurrentCalories(data.current);
          setLastUpdated(data.lastUpdated ? data.lastUpdated.toDate() : null);
        } else {
          setCurrentCalories(0);
          setLastUpdated(null);
        }
      }
    } catch (error) {
      console.error("Error fetching calories data:", error);
    }
  }

  fetchCaloriesData();
}, []);



  
    // Fetch recommended calories from Firestore
    useEffect(() => {
      const fetchRecommendedCalories = async () => {
        try {
          const docSnap = await getDoc(doc(db, 'users', user.uid, 'nutrition', 'calories'));
          if (docSnap.exists()) {
            setRecommendedCalories(docSnap.data().recommended);
          }
        } catch (error) {
          console.error("Error fetching recommended calories:", error);
        }
      }
  
      fetchRecommendedCalories();
    }, []);

    const handleManualSubmit = async () => {
      try {
        await setDoc(doc(db, 'users', user.uid, 'nutrition', 'calories'), {
          recommended: manualCalories,
          current: 0,
          lastUpdated: new Date()
        });
        setRecommendedCalories(manualCalories);
        setCurrentCalories(0);
        setLastUpdated(new Date());
      } catch (error) {
        console.error("Error setting recommended calories:", error);
      }
    }

    const handleItemPress = async (calories) => {
      const newCurrent = currentCalories + calories;
      setCurrentCalories(newCurrent);
      await updateDoc(doc(db, 'users', user.uid, 'nutrition', 'calories'), {
        current: newCurrent
      });
    }

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://api.api-ninjas.com/v1/nutrition',
        {
          params: { query },
          headers: {
            'X-Api-Key': 'DIPsRHPESoUC2bCJ8qjDvw==0CkuC18ovLG4RD1a',
          },
        }
      );
      setRecipes(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const onSearch = () => {
    if (query) {
      fetchRecipes();
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          onChangeText={text => setQuery(text)}
          value={query}
          placeholder="Search food..."
          returnKeyType="search"
          onSubmitEditing={onSearch}
        />
        <Button title="Search" onPress={onSearch} />
      </View>
      {recommendedCalories ? (
        <View>
          <Text style={styles.title}>Recommended Daily Calories: {recommendedCalories}</Text>
          <Text style={styles.title}>Current Calories: {currentCalories}</Text>
          <Text style={styles.title}>Calories Left: {recommendedCalories - currentCalories}</Text>
        </View>
      ) : (
        <View>
          <Text>No recommended calories set.</Text>
          <TextInput
            value={manualCalories}
            onChangeText={text => setManualCalories(text)}
            placeholder="Enter your calories..."
            keyboardType="numeric"
          />
          <Button title="Set Calories" onPress={handleManualSubmit} />
          <Button title="Know Your Calories" onPress={knowYourCalories} />
        </View>
      )}
      <Text style={styles.title}>Calories</Text>
      {recipes.length > 0 ? (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.name.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(item.calories)}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCalories}>Calories: {item.calories}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noResults}>No results found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderColor: '#DDD',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 5,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemCalories: {
    fontSize: 16,
  },
  noResults: {
    textAlign: 'center',
  },
});

export default CaloriesScreen;
