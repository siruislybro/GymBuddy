import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';

const WorkoutPlanDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { workout } = route.params;

  const handleStartWorkout = () => {
    navigation.navigate('QuickStart', { exercises: workout.exercises });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.content}>
      <Text style={styles.workoutName}>{workout.id}</Text>
      <Text style={styles.workoutDescription}>{workout.description}</Text>
      <Text style={styles.sectionTitle}>Exercises:</Text>
      {workout.exercises.map((exercise, index) => (
        <View style={styles.exerciseContainer} key={index}>
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          <DataTable style={styles.dataTable}>
            <DataTable.Header>
              <DataTable.Title>Set</DataTable.Title>
              <DataTable.Title>Reps</DataTable.Title>
            </DataTable.Header>
            {exercise.sets.map((set, setIndex) => (
              <DataTable.Row key={setIndex}>
                <DataTable.Cell>{setIndex + 1}</DataTable.Cell>
                <DataTable.Cell>{set.reps}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleStartWorkout}>
          <Text style={styles.buttonText}>Start this Workout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = {
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding:20
  },
  workoutName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  workoutDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  workoutDuration: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exerciseContainer: {
    marginBottom: 20,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dataTable: {
    borderWidth: 1,
    borderColor: '#000',
  },
  button: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
};

export default WorkoutPlanDetailsScreen;
