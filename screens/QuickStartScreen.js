import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, FlatList, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
import BackButton from '../components/BackButton';
import { db, auth } from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';

const QuickStartScreen = ({ navigation, route }) => {
  const user = auth.currentUser;
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState(route.params?.exercises || [
    {name: 'Exercise 1', sets: [{weight: '', reps: ''}]}, 
  ]);
  

  useEffect(() => {
    if (route.params?.newExercise) {
      setExercises(prevExercises => {
        const newExercises = [...prevExercises, {name: route.params.newExercise, sets: [{weight: '', reps: ''}]}];
        route.params.newExercise = null;

        return newExercises;
      });
    }
  }, [route.params?.newExercise]);

  useEffect(() => {
    (async () => {
      const savedExercises = await getData('@workout');
      if (savedExercises) {
        setExercises(savedExercises);
      }
  
      const savedWorkoutName = await getData('@workoutName');
      if (savedWorkoutName) {
        setWorkoutName(savedWorkoutName);
      }
    })();
  }, []);
  
  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      // saving error
    }
  }
  
  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }
  
  // and when you change workoutName, store it in AsyncStorage
  useEffect(() => {
    storeData('@workoutName', workoutName);
  }, [workoutName]);
  

  const saveToFirestore = async (exercises, workoutName) => {
    const currentDate = new Date().toLocaleString();
    const workoutId = uuidv4();
    const docRef = db.collection('workouts').doc(user.uid).collection('userWorkouts').doc(workoutId);
    try {
      await docRef.set({ workoutName, exercises, createdAt: currentDate });
      console.log('Document successfully written!');
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };
  
  
  const currentDate = new Date().toLocaleString();

  const handleWeightChange = (text, exerciseIndex, setIndex) => {
    let newExercises = [...exercises];
    newExercises[exerciseIndex].sets[setIndex].weight = text;
    setExercises(newExercises);
    storeData(newExercises);
  };

  const handleRepsChange = (text, exerciseIndex, setIndex) => {
    let newExercises = [...exercises];
    newExercises[exerciseIndex].sets[setIndex].reps = text;
    setExercises(newExercises);
    storeData(newExercises);
  };

  const handleAddSet = (exerciseIndex) => {
    let newExercises = [...exercises];
    newExercises[exerciseIndex].sets.push({weight: '', reps: ''});
    setExercises(newExercises);
    storeData(newExercises);
  };

  function handleRemoveExercise(index) {
    setExercises(prevExercises => {
      const newExercises = prevExercises.filter((_, i) => i !== index);
      storeData('@workout', newExercises); // Update stored data in AsyncStorage
      return newExercises;
    });
  }
  

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
    </View>
  );

  const renderExerciseItem = ({ item, index }) => (
    <View style={styles.exerciseItem}>
      <View style={styles.exerciseHeader}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <TouchableOpacity onPress={() => handleRemoveExercise(index)}>
          <AntDesign name="close" size={24} color="red" /> 
        </TouchableOpacity>
      </View>
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

  const endWorkout = async () => {
    // move this line inside endWorkout
    await saveToFirestore(exercises, workoutName);
    Alert.alert("Success", "Exercises saved successfully!", [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]);
    setExercises([]);
    setWorkoutName(''); // reset workout name
    await AsyncStorage.removeItem('@workout'); // clear the AsyncStorage
  };
  

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <BackButton />
        <View style={styles.header}>
          <TextInput 
            style={styles.workoutNameInput} 
            placeholder="Enter Workout Name" 
            value={workoutName}
            onChangeText={setWorkoutName}
          />
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
        <Button
          title="End Workout"
          onPress={endWorkout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#010202',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2e2e2e',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  header: {
    marginLeft: 20,
    height: 50,
    alignItems: 'flex-start', // align text to the left
  },
  workoutName: {
    fontSize: 12,
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
  },
  setInputField: {
    width: '40%',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    backgroundColor: '#fff',
    color: '#333',
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workoutNameInput: {
    color: '#fff',
    fontSize: 16,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
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