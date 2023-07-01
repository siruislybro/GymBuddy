import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BackButton from '../../../components/BackButton';

const WorkoutDetailScreen = ({ route }) => {
  const { workout } = route.params;

  return (
    <View style={styles.container}>
        <View style={styles.topBar}>
        <BackButton />
        </View>
      <Text style={styles.title}>{workout.workoutName}</Text>
      {workout.exercises.map((exercise, index) => (
        <View key={index}>
          <Text style={styles.exercise}>{exercise.name}</Text>
          {/* Assuming exercise.sets is an array of sets, each containing weight and reps */}
          {exercise.sets.map((set, setIndex) => (
            <Text 
            style={styles.exerciseDetails}
            key={setIndex}>{`Set ${setIndex + 1}: ${set.weight} kg - ${set.reps} reps`}</Text>
          ))}
        </View>
      ))}
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
    backgroundColor: '#010202',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white'
  },
  exercise: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  exerciseDetails: {
    color: 'white',
  },
});

export default WorkoutDetailScreen;