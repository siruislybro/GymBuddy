import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

const PastWorkoutsDetailsScreen = ({ route }) => {
  const { workout } = route.params;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.workoutName}>{workout.workoutName}</Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#010202',
  },
  content: {
    padding:20,
  },
  workoutName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EDEDED',
    marginBottom: 10,
  },
  workoutDescription: {
    fontSize: 16,
    color: '#EDEDED',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EDEDED',
    marginBottom: 10,
  },
  exerciseContainer: {
    marginBottom: 20,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EDEDED',
    marginBottom: 10,
  },
  dataTable: {
    borderWidth: 1,
    borderColor: '#EDEDED',
  },
});

export default PastWorkoutsDetailsScreen;
