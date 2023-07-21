import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import BackButton from '../../../components/BackButton';
import { Ionicons } from '@expo/vector-icons';

const AddExercisesScreen = ({ navigation, route }) => {
  const [exerciseName, setExerciseName] = useState('');
  const [showCategoryButtons, setShowCategoryButtons] = useState(false);
  const exercises = route.params?.exercises || [];

  const muscleGroups = {
    'Arms': ['biceps', 'triceps', 'forearms', 'shoulders'],
    'Legs': ['quadriceps', 'calves', 'hamstrings', 'glutes'],
    'Chest': ['chest'],
    'Back': ['lats', 'lower_back', 'middle_back', 'traps', 'neck'],
    'Core': ['abdominals', 'abductors', 'adductors'],
  };
  

  const addExercise = useCallback((exercise) => {
    setExerciseName(exercise);
  }, []);
  
  const handleAddExercise = () => {
    if (exerciseName === '') {
      alert('Exercise name required!');
    } else {
      const updatedExercises = [...exercises, { name: exerciseName, sets: [{ weight: '', reps: '' }] }];
      route.params.exercises = updatedExercises; // Mutating the route params directly
      console.log(updatedExercises);
      setExerciseName('');
      navigation.navigate('QuickStart', { newExercise: exerciseName });
    }
  };
  
  
  

  const handleViewExercises = () => {
    setShowCategoryButtons(true);
  };

  const handleNavigate = (category) => {
    const muscles = muscleGroups[category];
    navigation.navigate('ExerciseOverview', { muscles: muscles });
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BackButton />
      </View>
      <Text style={styles.label}>Exercise Name</Text>
      <TextInput
        style={styles.input}
        value={exerciseName}
        onChangeText={setExerciseName}
        placeholder="Enter exercise name"
        placeholderTextColor="#ddd"
      />

      <TouchableOpacity style={styles.button} onPress={handleAddExercise}>
        <Ionicons name="add-circle-outline" size={24} color="white" />
        <Text style={styles.buttonText}>Add Exercise</Text>
      </TouchableOpacity>

      <View style={styles.buttonSpacing}></View>

      {!showCategoryButtons && (
        <TouchableOpacity style={styles.button} onPress={handleViewExercises}>
          <Ionicons name="eye-outline" size={24} color="white" />
          <Text style={styles.buttonText}>View Exercises</Text>
        </TouchableOpacity>
      )}
      
      {showCategoryButtons && (
        <View style={styles.categoryButtons}>
          {Object.keys(muscleGroups).map((category) => (
            <TouchableOpacity key={category} style={styles.button} onPress={() => handleNavigate(category)}>
              <Text style={styles.buttonText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label: {
    marginBottom: 16,
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    color: '#fff',
    backgroundColor: '#333',
  },
  buttonSpacing: {
    marginTop: 15,
  },
  categoryButtons: {
    marginTop: 16,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
});


export default AddExercisesScreen;
