import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { db, auth } from '../../../../firebase';


const WorkoutPlansScreen = ({ route }) => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const navigation = useNavigation();
  
  // Access user data from route params
  const { user: userData } = route.params;
  console.log('route params', userData);
  console.log('user', auth.currentUser)
  console.log(userData === auth.currentUser)
  useEffect(() => {
    fetchWorkoutPlans();
  }, []);

  const fetchWorkoutPlans = async () => {
    try {
      let userId;
      if (userData === auth.currentUser) {
        userId = userData.uid;
      } else {
        userId = userData.id;
      }
      
      const snapshot = await 
        db.collection('users')
        .doc(userId)
        .collection('workoutPlans')
        .get();

      console.log(snapshot.docs)

      const workouts = snapshot.docs.map((doc) => ({
        id: doc.id,
        exercises: doc.data().exercises,
      }));

      setWorkoutPlans(workouts);
    } catch (error) {
      console.log('Error fetching saved workouts:', error);
    }
  };

  const renderWorkoutItem = ({ item }) => {
    console.log('item', item);

    const handleStartWorkout = (exercises) => {
      console.log('exercises', exercises)
      navigation.navigate('WorkoutPlanDetails', { workout: item });
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
    backgroundColor: '#F5F5F5',
  },
  workoutItem: {
    marginBottom: 10,
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
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
