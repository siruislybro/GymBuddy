import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import BackButton from '../../../components/BackButton';
import { doc, getDoc, setDoc, updateDoc, Timestamp, arrayUnion, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../../../../firebase';

const CaloriesScreen = ( {navigation} ) => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [recommendedCalories, setRecommendedCalories] = useState(null);
  const [manualCalories, setManualCalories] = useState('');
  const [currentCalories, setCurrentCalories] = useState(0);
  const [foodLog, setFoodLog] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const user = auth.currentUser;
 

  const knowYourCalories = () => {
    navigation.navigate("RecommendedCaloriesScreen")
  }


  const changeGoal = async () => {
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'nutrition', 'calories'));
      setRecommendedCalories(null);
    } catch (error) {
      console.error("Error changing goal:", error);
    }
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
        
        if (data.lastUpdated && data.lastUpdated.toDate() < today) {
          setCurrentCalories(0);
          setLastUpdated(todayTimestamp);
          setFoodLog([]);
          await updateDoc(doc(db, 'users', user.uid, 'nutrition', 'calories'), {
            current: 0,
            lastUpdated: todayTimestamp,
            foodLog: []
          });
        }
         else {
          setCurrentCalories(data.current ? data.current : 0);
          setLastUpdated(data.lastUpdated ? data.lastUpdated.toDate() : null);
          setFoodLog(data.foodLog ? data.foodLog : []);
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

    const handleItemPress = async (item) => {
      // Make sure the item object has the necessary properties
      if (!item || item.name === undefined || item.calories === undefined) {
        console.error("Invalid item:", item);
        return;
      }
    
      const newCurrent = currentCalories + item.calories;
      const logEntry = { name: item.name, calories: item.calories, timestamp: new Date().getTime() };
      setCurrentCalories(newCurrent);
      await updateDoc(doc(db, 'users', user.uid, 'nutrition', 'calories'), {
        current: newCurrent,
        foodLog: arrayUnion(logEntry)
      });
      setFoodLog(prevLog => [...prevLog, logEntry]);
    }
    
    
    const renderFoodLogItem = ({item, index}) => {
      let timestamp = item.timestamp ? new Date(item.timestamp).toLocaleString() : "Invalid Date";
      return (
        <View key={item.name.toString() + index} style={styles.foodLogItemContainer}>
          <Text style={styles.foodLogItemName}>{item.name}</Text>
          <Text style={styles.foodLogItemCalories}>Calories: {parseFloat(item.calories).toFixed(1)}</Text>
          <Text style={styles.foodLogItemTime}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
        </View>
      );
    };

    const renderSearchResultItem = ({ item, index }) => {
      return (
        <TouchableOpacity key={item.name.toString() + index} style={styles.foodLogItemContainer} onPress={() => handleItemPress(item)}>
          <Text style={styles.foodLogItemName}>{item.name}</Text>
          <Text style={styles.foodLogItemCalories}>Calories: {parseFloat(item.calories).toFixed(1)}</Text>
        </TouchableOpacity>
      );
    };

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
          <Text style={styles.title}>Recommended Daily Calories: {parseFloat(recommendedCalories).toFixed(1)}</Text>
          <Text style={styles.title}>Current Calories: {parseFloat(currentCalories).toFixed(1)}</Text>
          <Text style={styles.title}>Calories Left: {parseFloat(recommendedCalories - currentCalories).toFixed(1)}</Text>
          <Button title="Change Goal" onPress={changeGoal} />
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
        <FlatList
          data={foodLog}
          keyExtractor={(item, index) => item.name.toString() + index}
          renderItem={({ item }) => (
            <View style={styles.foodLogItemContainer}>
              <Text style={styles.foodLogItemName}>{item.name}</Text>
              <Text style={styles.foodLogItemCalories}>Calories: {parseFloat(item.calories).toFixed(1)}</Text>
              <Text style={styles.foodLogItemTime}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
              
            </View>
          )}
        />
      <Text style={styles.title}>Calories</Text>
      {recipes.length > 0 ? (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.name.toString()}
          renderItem={renderSearchResultItem}
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
    backgroundColor: '#FAFAFA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 15,
    alignItems: 'center'
  },
  searchInput: {
    flex: 1,
    borderColor: '#DDD',
    borderWidth: 1,
    padding: 10,
    borderRadius: 30,
    marginRight: 10,
    color: 'black'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4caf50',
    marginVertical: 10
  },
  foodLogItemContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  foodLogItemName: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black'
  },
  foodLogItemCalories: {
    fontSize: 14,
    color: 'black'
  },
  foodLogItemTime: {
    fontSize: 14,
    color: 'gray'
  },
  noResults: {
    textAlign: 'center',
    fontSize: 18,
    color: '#4caf50',
    marginTop: 20
  },
});

export default CaloriesScreen;
