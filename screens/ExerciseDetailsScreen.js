import React from 'react';
import { Text, StyleSheet, View, Image, ScrollView, Button } from 'react-native';
import ExerciseDetails from '../components/ExerciseDetails';
import { useLayoutEffect } from 'react';
import { EXERCISES } from "../data/tempData";
import IconButton from "../components/IconButton";
import { Ionicons } from '@expo/vector-icons';

function ExerciseDetailsScreen({ route, navigation }) {
  const exerciseId = route.params.exerciseId;

  const selectedExercise = EXERCISES.find((exercise) => exercise.id === exerciseId);

  function headerButtonPressHandler() {
    console.log('Pressed!');
  }

  function backButtonPressHandler() {
    navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="star"
          color="white"
          onPress={headerButtonPressHandler}
        />
      ),
      headerLeft: () => (
        <IconButton
          icon="arrow-back"
          size={24}
          color="white"
          onPress={backButtonPressHandler}
        />
      ),
    });
  }, [navigation, headerButtonPressHandler, backButtonPressHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedExercise.imageUrl }} />
      <Text style={styles.title}>{selectedExercise.title}</Text>
      <ExerciseDetails
        instructions={selectedExercise.instructions}
        complexity={selectedExercise.difficulty}
        textStyle={styles.detailText}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    marginVertical: 50,
    height: 210,
    width: "100%",
},
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white',
  },
  detailText: {
    color: 'black',
    flexDirection: 'column',
    
  },
});

export default ExerciseDetailsScreen;
