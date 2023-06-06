import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, FlatList, Text, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
// import { CheckBox } from '@react-native-community/checkbox';

const QuickStartScreen = ({ navigation, route }) => {
  const [exercises, setExercises] = useState(route.params?.exercises || [
    {name: 'Exercise 1', sets: [{weight: '', reps: ''}]}, 
    
  ]);

  useEffect(() => {
    if (route.params?.exercises) {
      setExercises(route.params?.exercises);
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
        value={item.weight}
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

  function handleRemoveExercise(index) {
    setExercises(prevExercises => prevExercises.filter((_, i) => i !== index));
  }

  const renderExerciseItem = ({ item, index }) => (
    <View style={styles.exerciseItem}>
      <TouchableOpacity onPress={() => handleRemoveExercise(index)}>
        <AntDesign name="close" size={24} color="red" /> 
      </TouchableOpacity>
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

  const backButtonHandler = () => {
    navigation.goBack();
  };
  

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <TouchableOpacity 
            style={styles.backButton} 
            onPress={backButtonHandler}>
            <Icon name='arrow-back' color='white' />
        </TouchableOpacity>
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
    backgroundColor: '#1a1a1a',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2e2e2e',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  backButton: {
    marginRight: 10,
    opacity: 2,
    TouchableOpacity: 0.75,
  },
  header: {
    marginLeft: 20,
    alignItems: 'flex-start', // align text to the left
  },
  workoutName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  dateTime: {
    fontSize: 16,
    color: '#bbb',
    marginBottom: 20,
  },
  setInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#2e2e2e',
    borderRadius: 10,
    margin: 10,
  },
  setInputField: {
    width: '40%',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    margin: 2,
    backgroundColor: '#fff',
    color: '#333',
  },
  exerciseItem: {
    backgroundColor: '#2e2e2e',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 10,
  },
  addSetButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default QuickStartScreen;