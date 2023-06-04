import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ExerciseDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { exercise } = route.params;

  const handleAddExercise = () => {
    navigation.navigate('QuickStart', { newExercise: exercise.name });
  };

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.title}>{exercise.title}</Text>
      <Text style={styles.subtitle}>Muscles targeted: {exercise.muscle}</Text>
      <Text style={styles.subtitle}>Difficulty: {exercise.difficulty}</Text>
      <Text style={styles.details}>{exercise.instructions}</Text>
      <Button title="Add Exercise" onPress={handleAddExercise} />
    </ScrollView>
  );
};

export default ExerciseDetailsScreen;

const styles = StyleSheet.create({
  screen: {
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 15,
  },
  details: {
    fontSize: 16,
  },
});
