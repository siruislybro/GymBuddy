import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SavedWorkoutsScreen = () => {
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchSavedWorkouts();
  }, []);

  const fetchSavedWorkouts = async () => {
    try {
      const workouts = await AsyncStorage.getItem('@savedWorkouts');
      if (workouts) {
        setSavedWorkouts(JSON.parse(workouts));
      }
    } catch (error) {
      console.log('Error fetching saved workouts:', error);
    }
  };

  const storeSavedWorkouts = async (workouts) => {
    try {
      await AsyncStorage.setItem('@savedWorkouts', JSON.stringify(workouts));
    } catch (error) {
      console.log('Error storing saved workouts:', error);
    }
  };

  const handleAddWorkout = (workout) => {
    const updatedWorkouts = [...savedWorkouts, workout];
    setSavedWorkouts(updatedWorkouts);
    storeSavedWorkouts(updatedWorkouts);
  };

  const handleStartWorkout = (workout) => {
    navigation.navigate('QuickStartScreen', { exercises: workout.exercises });
  };

  const renderWorkoutItem = ({ item }) => (
    <TouchableOpacity style={styles.workoutItem} onPress={() => handleStartWorkout(item)}>
      <Text style={styles.workoutName}>{item.name}</Text>
      <Text style={styles.workoutDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={savedWorkouts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderWorkoutItem}
        ListEmptyComponent={<Text>No saved workouts</Text>}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('QuickStartScreen', { exercises: [] })}
      >
        <Text style={styles.addButtonText}>Create New Workout</Text>
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
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  workoutName: {
    fontSize: 16,
    fontWeight: 'bold',
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

export default SavedWorkoutsScreen;
