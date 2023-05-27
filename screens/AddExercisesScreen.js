import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddExercisesScreen = ({ navigation }) => {
  const [exerciseName, setExerciseName] = useState('');
  const [showCategoryButtons, setShowCategoryButtons] = useState(false);

  const handleSubmit = () => {
    if (exerciseName === '') {
      alert('Exercise name required!');
    } else {
      console.log('Exercise Name:', exerciseName);
      setExerciseName('');
      navigation.goBack();
    }
  };

  const handleAddExercises = () => {
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

      <Button title="Submit" onPress={handleSubmit} />
      {!showCategoryButtons && (
        <Button
          title="Add Exercises"
          onPress={handleAddExercises}
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
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  categoryButtons: {
    marginTop: 16,
  },
});

export default AddExercisesScreen;
