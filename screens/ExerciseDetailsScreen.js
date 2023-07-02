// ExerciseDetailsScreen.js
import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton';

const ExerciseDetailsScreen = ({ route }) => {
    const navigation = useNavigation();
    const { exercise } = route.params;
  
    const handleAddExercise = () => {
      navigation.navigate('QuickStart', { newExercise: exercise.name });
    };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BackButton />
        <Text style={styles.title}>{exercise.name}</Text>
      </View>
      <Text style={styles.subtitle}>Difficulty: {exercise.difficulty}</Text>
      <Text style={styles.subtitle}>Muscle group: {exercise.muscle.replace('_', ' ')}</Text>
      <ScrollView style={styles.instructionsContainer}>
        <Text style={styles.instructions}>{exercise.instructions}</Text>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={handleAddExercise}>
        <Text style={styles.buttonText}>Add to Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#010202',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EDEDED',
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#EDEDED',
    marginBottom: 10,
  },
  instructionsContainer: {
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  instructions: {
    color: '#303030',
    fontSize: 16,
  },
  button: {
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#EDEDED',
    fontSize: 16,
  },
});

export default ExerciseDetailsScreen;
