import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput, StyleSheet, Button, ScrollView } from 'react-native';
import axios from 'axios';
import BackButton from '../../../components/BackButton';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../../../firebase';

const CaloriesScreen = ( {navigation} ) => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [recommendedCalories, setRecommendedCalories] = useState(null);
  const [manualCalories, setManualCalories] = useState('');
  const user = auth.currentUser;

  const knowYourCalories = () => {
    navigation.navigate("RecommendedCalories")
  }

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
          recommended: manualCalories
        });
        setRecommendedCalories(manualCalories);
      } catch (error) {
        console.error("Error setting recommended calories:", error);
      }
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
        <Text style={styles.title}>Recommended Daily Calories: {recommendedCalories}</Text>
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
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCalories}>Calories: {item.calories}</Text>
            </View>
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
