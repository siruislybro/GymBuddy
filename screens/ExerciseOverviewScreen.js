// ExerciseOverviewScreen.js
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Button, ScrollView } from 'react-native';
import axios from 'axios';

import ExerciseCard from "../components/ExerciseCard.js"

const API_KEY = 'DIPsRHPESoUC2bCJ8qjDvw==0CkuC18ovLG4RD1a'; // replace with your actual API key
const API_URL = 'https://api.api-ninjas.com/v1/exercises?muscle=';

const ExerciseOverviewScreen = ({ navigation, route }) => {
  const [exercises, setExercises] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Mapping muscle groups into major parts
  const majorParts = {
    'Arms': ['biceps', 'forearms', 'triceps'],
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

  const handleNavigate = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
      return;
    }
    setSelectedCategory(category);
  };

  useEffect(() => {
    Object.values(majorParts).flat().forEach(fetchExercises);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        keyExtractor={(item, index) => item.id || String(index)}  // If your data item doesn't have 'id', use index as a fallback
        renderItem={({ item }) => (
          <ExerciseCard
            title={item.name}
            difficulty={item.difficulty}
            instructions={item.instructions}
            item={item}
            onPress={() => navigation.navigate('ExerciseDetails', { exercise: item })}
            navigation={navigation}
          />
        )}
      />
      <View style={styles.buttonsContainer}>
        <ScrollView horizontal>
          {selectedCategory ? 
            majorParts[selectedCategory].map((muscleGroup) => (
              <Button
                key={muscleGroup}
                title={`View ${muscleGroup} Exercises`}
                onPress={() => fetchExercises(muscleGroup)}
              />
            )) :
            Object.keys(majorParts).map((category) => (
              <Button
                key={category}
                title={`View ${category} Exercises`}
                onPress={() => handleNavigate(category)}
              />
            ))
          }
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  buttonsContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    padding: 10,
  },
});

export default ExerciseOverviewScreen;
