import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, FlatList, Text, TextInput, TouchableOpacity } from 'react-native';
// import { CheckBox } from '@react-native-community/checkbox';

const QuickStartScreen = ({ navigation, route }) => {
  const [exercises, setExercises] = useState(route.params?.exercises || [
    {name: 'Exercise 1', sets: [{weight: '', reps: ''}]}, 
    //...
  ]);

  useEffect(() => {
    if (route.params?.exercises) {
      setExercises(route.params.exercises);
    }
  }, [route.params?.exercises]);

  const currentDate = new Date().toLocaleString();

  const handleWeightChange = (text, exerciseIndex, setIndex) => {
    let newExercises = [...exercises];
    newExercises[exerciseIndex].sets[setIndex].weight = text;
    setExercises(newExercises);
  };

  const handleRepsChange = (text, exerciseIndex, setIndex) => {
    let newExercises = [...exercises];
    newExercises[exerciseIndex].sets[setIndex].reps = text;
    setExercises(newExercises);
  };

  const handleAddSet = (exerciseIndex) => {
    let newExercises = [...exercises];
    newExercises[exerciseIndex].sets.push({weight: '', reps: ''});
    setExercises(newExercises);
  };

  const renderSetItem = (exerciseIndex) => ({ item, index }) => (
    <View style={styles.setInput}>
      <Text>Set {index + 1}</Text>
      <TextInput
        placeholder="Weight (kg)"
        style={styles.setInputField}
        value={item.weight.toString()}
        onChangeText={text => handleWeightChange(text, exerciseIndex, index)}
      />
      <TextInput
        placeholder="Reps"
        style={styles.setInputField}
        value={item.reps}
        onChangeText={text => handleRepsChange(text, exerciseIndex, index)}
      />
      {/* <CheckBox
        value={item.checked}
        onValueChange={() => handleCheckedChange(exerciseIndex, index)}
      /> */}
    </View>
  );

  const renderExerciseItem = ({ item, index }) => (
    <View style={styles.exerciseItem}>
      <Text style={styles.exerciseName}>{item.name}</Text>
      <FlatList
        data={item.sets}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderSetItem(index)}
      />
      <TouchableOpacity onPress={() => handleAddSet(index)} style = {styles.addButton}>
        <Text style={styles.addSetButtonText}>Add Set</Text>
      </TouchableOpacity>
    </View>
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Button
          title="Back"
          onPress={handleGoBack}
          style={styles.backButton}
        />
        <View style={styles.header}>
          <Text style={styles.workoutName}>Workout Name</Text>
          <Text style={styles.dateTime}>{currentDate}</Text>
        </View>
      </View>
      <FlatList
        data={exercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderExerciseItem}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Add Exercises"
          onPress={() => navigation.navigate('AddExercisesScreen', { exercises: exercises})}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 20,
  },
  header: {
    marginLeft: 20,
    alignItems: 'flex-start', // align text to the left
  },
  workoutName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  dateTime: {
    fontSize: 16,
    color: '#777',
  },
  setInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  setInputField: {
    width: '40%',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    margin: 2,
  },
  exerciseList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    marginVertical: 100
  },
  exerciseButton: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
  exerciseName: {
    fontSize: 20,   // Adjust the value as needed
    fontWeight: 'bold',
  },
  addButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  addSetButtonText: {
    fontSize: 16,
    color: '#007BFF', // Feel free to change this color to your liking.
  },
});

export default QuickStartScreen;