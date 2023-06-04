import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';

const StatisticsScreen = () => {
  // Replace with your data
  const workouts = ['Workout 1', 'Workout 2', 'Workout 3'];
  const exercises = ['Exercise 1', 'Exercise 2', 'Exercise 3'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>Workouts</Text>
        <FlatList
          data={workouts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        />
      </View>

      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>Exercises</Text>
        <FlatList
          data={exercises}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  categoryContainer: {
    flex: 1,
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 24,
    marginBottom: 10,
  },
  item: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default StatisticsScreen;
