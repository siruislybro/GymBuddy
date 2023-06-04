import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddExercisesScreen = ({ navigation, route }) => {
  const [exerciseName, setExerciseName] = useState('');
  const [showCategoryButtons, setShowCategoryButtons] = useState(false);
  const exercises = route.params?.exercises || [];

  const muscleGroups = {
    'Arms': ['biceps', 'triceps', 'forearms'],
    'Legs': ['quadriceps', 'calves', 'hamstrings'],
    'Chest': ['chest'],
    'Back': ['lower_back', 'upper_back'],
  };

  const addExercise = useCallback((exercise) => {
    setExerciseName(exercise);
  }, []);

  const handleAddExercise = () => {
    if (exerciseName === '') {
      alert('Exercise name required!');
    } else {
      const updatedExercises = [...exercises, { name: exerciseName, sets: [{ weight: '', reps: '' }] }];
      console.log(updatedExercises);
      setExerciseName('');
      navigation.navigate('QuickStart', { exercises: updatedExercises });
    }
  };

  const handleViewExercises = () => {
    setShowCategoryButtons(true);
  };

  const handleNavigate = (category) => {
    const muscles = muscleGroups[category];
    muscles.forEach(muscle => {
      const cleanedMuscle = muscle.replace('_', ' ');
      navigation.navigate('ExerciseOverview', { muscle: cleanedMuscle, addExercise });
    });
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
