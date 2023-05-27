import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const QuickStartScreen = () => {
  const exercises = [
    { name: 'Push-ups', duration: 30 }, // Example exercise with a duration of 30 seconds
    { name: 'Squats', duration: 45 },
    { name: 'Plank', duration: 60 },
    // Add more exercises as needed
  ];

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timer, setTimer] = useState(exercises[0].duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      // Move to the next exercise when the timer reaches 0
      setCurrentExerciseIndex(prevIndex =>
        prevIndex === exercises.length - 1 ? 0 : prevIndex + 1
      );
      setTimer(exercises[currentExerciseIndex].duration);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const startWorkout = () => {
    setTimer(exercises[currentExerciseIndex].duration);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.exerciseName}>{exercises[currentExerciseIndex].name}</Text>
      <Text style={styles.timer}>{timer}</Text>
      <Button title="Start Workout" onPress={startWorkout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default QuickStartScreen;
