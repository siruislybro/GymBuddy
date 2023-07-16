import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { index } from 'd3';

const WorkoutPlanDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { workout } = route.params;

  const handleStartWorkout = () => {
    navigation.navigate('QuickStart', { exercises: workout.exercises });
  };

  const renderExerciseItem = ({ item }) => {
    return (
      <View style={styles.exerciseItem}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <Text style={styles.exerciseReps}>Reps: {item.reps}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.workoutName}>{workout.id}</Text>
      <Text style={styles.workoutDescription}>{workout.description}</Text>
      <Text style={styles.workoutDuration}>Duration: {workout.duration} minutes</Text>
      <Text style={styles.sectionTitle}>Exercises:</Text>
      <FlatList
        data={workout.exercises}
        renderItem={renderExerciseItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style = {styles.button} onPress={handleStartWorkout}>
            <Text style={styles.buttonText}>Start this Workout</Text>
        </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  workoutName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  workoutDescription: {
    fontSize: 16,
    marginTop: 10,
  },
  workoutDuration: {
    fontSize: 16,
    marginTop: 10,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  exerciseItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  exerciseReps: {
    fontSize: 14,
    marginTop: 5,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
};

export default WorkoutPlanDetailsScreen;
