import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const ExerciseCard = ({title, difficulty, instructions, onSelect}) => {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.muscle}>{difficulty}</Text>
        {showInstructions && (
          <Text style={styles.muscle}>{instructions}</Text>
        )}
        <Button title="See More" onPress={() => setShowInstructions(!showInstructions)} />
        <Button title="Go to Details" onPress={onSelect} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  info: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  muscle: {
    fontSize: 16,
    color: '#888',
  },
});

export default ExerciseCard;
