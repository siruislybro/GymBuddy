import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button, SearchBar, Icon } from 'react-native-elements';
import axios from 'axios';
import BackButton from '../../../components/BackButton';
import ExerciseCard from "../../../components/ExerciseCard.js"

const API_KEY = 'DIPsRHPESoUC2bCJ8qjDvw==0CkuC18ovLG4RD1a'; 
const API_URL = 'https://api.api-ninjas.com/v1/exercises?muscle=';

const ExerciseOverviewScreen = ({ navigation, route }) => {

  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const majorParts = {
    'Arms': ['biceps', 'forearms', 'triceps', 'shoulders'],
    'Chest': ['chest'],
    'Back': ['lats', 'lower_back', 'middle_back', 'traps', 'neck'],
    'Core': ['abdominals', 'abductors', 'adductors'],
    'Legs': ['calves', 'glutes', 'hamstrings', 'quadriceps'],
  };

  const fetchExercises = async (muscleGroup) => {
    const response = await axios.get(`${API_URL}${muscleGroup}`, { headers: { 'X-Api-Key': API_KEY }});
    const fetchedExercises = response.data;
    setExercises(prevExercises => [...prevExercises, ...fetchedExercises]);
  };

  useEffect(() => {
    // Limit simultaneous API requests
    const muscleGroups = route.params.muscles || [];
    const fetchAllExercises = async () => {
      for (let muscleGroup of muscleGroups) {
        await fetchExercises(muscleGroup);
      }
    }
    fetchAllExercises();
  }, []);
  
  // Filtering
  useEffect(() => {
    const muscles = route.params?.muscles || [];
    if (searchQuery) {
      setFilteredExercises(exercises.filter(exercise => 
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        muscles.includes(exercise.muscle.toLowerCase())
      ));
    } else {
      setFilteredExercises(exercises.filter(exercise =>
        muscles.includes(exercise.muscle.toLowerCase())
      ));
    }
  }, [searchQuery, exercises]);
  
  

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <BackButton />
        <SearchBar
          placeholder="Search for exercises..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchInputContainer}
        />
      </View>
      <FlatList
        data={filteredExercises}
        keyExtractor={(item, index) => item.id || String(index)} 
        renderItem={({ item }) => (
          <ExerciseCard
            title={item.name}
            difficulty={item.difficulty}
            muscle={item.muscle}
            instructions={item.instructions}
            item={item}
            onPress={() => navigation.navigate('ExerciseDetails', { exercise: item })}
            navigation={navigation}
          />
        )}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#010202',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    flex: 1,
  },
  searchInputContainer: {
    backgroundColor: '#454545',
  },
});

export default ExerciseOverviewScreen;
