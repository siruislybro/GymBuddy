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
      setWorkoutPlans(workouts);
//       workoutPlans.forEach((workoutPlan) => {
//   console.log('Workout Plan:', workoutPlan.id);
//   workoutPlan.exercises.forEach((exercise) => {
//     console.log('Exercise Name:', exercise.name);
//     exercise.sets.forEach((set) => {
//       console.log('Set:', set);
//       console.log('Weight:', set.weight);
//       console.log('Reps:', set.reps);
//     });
//   });
// });
    } catch (error) {
      console.log('Error fetching saved workouts:', error);
    }
  };

  const renderWorkoutItem = ({ item }) => {
    console.log('item', item);

    const handleStartWorkout = (exercises) => {
      console.log('exercises', exercises)
      navigation.navigate('QuickStart', { exercises });
    };

    return (
      <TouchableOpacity style={styles.workoutItem} onPress={() => handleStartWorkout(item.exercises)}>
        <Text style={styles.workoutName}>{item.id}</Text>
      </TouchableOpacity>
    );
  };

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
