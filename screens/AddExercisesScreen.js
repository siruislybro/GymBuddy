import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Exercise from '../models/Exercise';

const AddExercisesScreen = ({ navigation, route }) => {
  const [exerciseName, setExerciseName] = useState('');
  const [showCategoryButtons, setShowCategoryButtons] = useState(false);
  const exercises = route.params?.exercises || [];

  const handleAddExercise = () => {
    if (exerciseName === '') {
      alert('Exercise name required!');
    } else {
      const newExercise = {
        name: exerciseName,
        sets: [
          {
            weight: 0,
            reps: 0,
            done: false
          }
          //...add more sets as needed
        ]
      }
      const updatedExercises = [...exercises, newExercise];
      console.log(updatedExercises);
      setExerciseName('');
      navigation.navigate("QuickStart", { exercises: updatedExercises });
    }
  };

  const handleViewExercises = () => {
    setShowCategoryButtons(true);
  };

  const handleNavigate = (categoryId) => {
    // Navigate to the ExerciseOverviewScreen with the selected categoryId
    navigation.navigate('ExerciseOverview', { categoryId });
  };

  return (
    <View style={styles.container}>
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
          <Button
            title="Chest"
            onPress={() => handleNavigate('c1')}
          />
          <Button
            title="Back"
            onPress={() => handleNavigate('c2')}
          />
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
  },
  label: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  buttonSpacing: {
    marginTop: 15,
  },
  categoryButtons: {
    marginTop: 16,
  },
});

export default AddExercisesScreen;