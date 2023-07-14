import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { db, auth } from '../../../../firebase';


const WorkoutPlansScreen = () => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchWorkoutPlans();
  }, []);

  const fetchWorkoutPlans = async () => {
    try {
      const user = auth.currentUser; // Assuming you have authenticated the user
      const snapshot = await 
        db.collection('users')
        .doc(user.uid)
        .collection('workoutPlans')
        .get();
      print(snapshot.docs)
      const workouts = snapshot.docs.map((doc) => ({
      id: doc.id,
      exercises: doc.data().exercises,
    }));
      console.log('Workouts:', workouts);
      setWorkoutPlans(workouts);
    } catch (error) {
      console.log('Error fetching saved workouts:', error);
    }
  };

  const handleStartWorkout = (workout) => {
    const exerciseNames = workout.exercises.map((exercise) => exercise.name);
    console.log(exerciseNames)
    navigation.navigate('QuickStart', { exercises: exerciseNames });
  };

  const renderWorkoutItem = ({ item }) => (
    <TouchableOpacity style={styles.workoutItem} onPress={() => handleStartWorkout(item)}>
      <Text style={styles.workoutName}>{item.id}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={workoutPlans}
        keyExtractor={(item) => item.id}
        renderItem={renderWorkoutItem}
        ListEmptyComponent={<Text>No saved workouts</Text>}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('QuickStart', { exercises: [] })}
      >
        <Text style={styles.addButtonText}>Start New Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  workoutItem: {
    marginBottom: 10,
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  workoutName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  workoutDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  addButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 10,
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default WorkoutPlansScreen;
