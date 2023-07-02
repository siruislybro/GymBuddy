import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

function ExerciseDetails({ instructions, difficulty, muscle, equipment }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Muscle: {muscle}</Text>
      {/* <Text style={styles.text}>Equipment: {equipment}</Text>
      <Text style={styles.text}>Difficulty: {difficulty}</Text>
      <Text style={styles.text}>Instructions: {instructions}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
});

export default ExerciseDetails;
