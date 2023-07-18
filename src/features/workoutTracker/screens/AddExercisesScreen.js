import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import BackButton from '../../../components/BackButton';

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
      />

      <Button title="Add Exercise" onPress={handleAddExercise} />

      <View style={styles.buttonSpacing}></View>
      {!showCategoryButtons && (
        <Button
          title="View Exercises"
          onPress={handleViewExercises}
        />
      )}
      {showCategoryButtons && (
        <View style={styles.categoryButtons}>
          {Object.keys(muscleGroups).map((category) => (
            <Button
              key={category}
              title={category}
              onPress={() => handleNavigate(category)}
            />
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
    color: '#fff',
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
});


export default AddExercisesScreen;
