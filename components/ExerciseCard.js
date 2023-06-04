import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Button } from 'react-native';

const ExerciseCard = ({ title, difficulty, onPress }) => {
  const navigation = useNavigation();

  const handleAddExercise = () => {
    navigation.navigate('QuickStart', { newExercise: title });
  };

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.muscle}>{difficulty}</Text>
        <Button title="Add Exercise" onPress={handleAddExercise} />
        <Button title="Go to Details" onPress={onPress} />
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
