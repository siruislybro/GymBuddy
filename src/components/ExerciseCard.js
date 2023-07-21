import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';

const ExerciseCard = ({ title, difficulty, onPress, muscle }) => {
  const navigation = useNavigation();

  const handleAddExercise = () => {
    navigation.navigate('QuickStart', { newExercise: title });
  };

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.muscle}>Targets: {muscle.replace(/_/g, ' ')}</Text>
        <Text style={styles.muscle}>{difficulty}</Text>
        <Button
          icon={<Icon name='plus' type='font-awesome' color='white' />}
          title=" Add Exercise"
          onPress={handleAddExercise}
          buttonStyle={styles.button}
        />
        <Button
          icon={<Icon name='info' type='font-awesome' color='white' />}
          title=" Go to Details"
          onPress={onPress}
          buttonStyle={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  info: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  muscle: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#F08080',
    borderRadius: 20,
    marginTop: 10,
  },
});

export default ExerciseCard;
