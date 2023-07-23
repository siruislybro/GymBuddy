import React, { useState, useEffect, useContext, } from 'react';
import { View, Button, StyleSheet, FlatList, Text, TextInput, TouchableOpacity, Alert, Modal} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../../components/BackButton';
import { db, auth } from '../../../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import { WorkoutContext } from '../../../components/WorkoutContext';
import UserContext from '../../../components/UserContext';
import firebase from 'firebase/compat';
import { Ionicons } from '@expo/vector-icons';


const QuickStartScreen = ({ navigation, route }) => {
  const nav = useNavigation();
  const user = auth.currentUser;
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState([]);
  const { setWorkoutActive, setWorkoutEnded } = useContext(WorkoutContext);
  const [duration, setDuration] = useState(0);
  const [restTime, setRestTime] = useState(60);
  const [restInterval, setRestInterval] = useState(null);
  const [isTimerModalVisible, setIsTimerModalVisible] = useState(false);
  
  useEffect(() => {
    if (route.params?.exercises) {
      console.log('true')
      setExercises(route.params.exercises);
    }
  }, [route.params?.exercises]);

  // Decrement rest time every second.
  useEffect(() => {
    if (restTime > 0 && restInterval) {
      const id = setInterval(() => {
        setRestTime((restTime) => restTime - 1);
      }, 1000);
      return () => clearInterval(id);
    } else if (restTime === 0 && restInterval) {
      clearInterval(restInterval);
      setRestInterval(null);
    }
  }, [restTime, restInterval]);

    // Handlers for rest timer.
    const handleRestStart = () => {
      const id = setInterval(() => {
        setRestTime((restTime) => restTime - 1);
      }, 1000);
      setRestInterval(id);
    };
  
    const handleRestEnd = () => {
      clearInterval(restInterval);
      setRestInterval(null);
      setRestTime(60); // Reset timer.
      setIsTimerModalVisible(false);
    };
  
    const handleRestIncrease = () => {
      if (restTime < 600) setRestTime((restTime) => restTime + 30); // Limit to 10 mins.
    };
  
    const handleRestDecrease = () => {
      if (restTime > 30) setRestTime((restTime) => restTime - 30); // Limit to 30 seconds.
    };

  useEffect(() => {
    if (route.params?.newExercise) {
      console.log('newtrue')
      setExercises((prevExercises) => {
        const newExercises = [
          ...prevExercises,
          { name: route.params.newExercise, sets: [{ weight: '', reps: '' }] },
        ];
        return newExercises;
      });
    }
  }, [route.params?.newExercise]);

  useEffect(() => {
    (async () => {
      const savedExercises = await getData('@workout');
      console.log('command ran')
      if (savedExercises) {
        console.log('savedExercises', savedExercises);
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
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      console.log('jsonValue', jsonValue)
      return jsonValue !== null && jsonValue !== "[]" ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    storeData('@workout', exercises);
  }, [exercises]);

  const saveToFirestore = async (exercises, workoutName, duration) => {
    const currentDate = new Date().toLocaleString();
    const workoutId = `${user.uid}-${workoutName}-${Date.now()}`;
    const docRef = db
      .collection('users')
      .doc(user.uid)
      .collection('workouts')
      .doc(workoutId);
    try {
      await docRef.set({ workoutName, exercises, createdAt: currentDate , duration});
      console.log('Document successfully written!');
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };

  const handleWeightChange = (text, exerciseIndex, setIndex) => {
    let newExercises = [...exercises];
    newExercises[exerciseIndex].sets[setIndex].weight = text;
    setExercises(newExercises);
  };

  const handleRepsChange = async (text, exerciseIndex, setIndex) => {
    let newExercises = [...exercises];
    newExercises[exerciseIndex].sets[setIndex].reps = text;
    setExercises(newExercises);
    await storeData('@workout', newExercises);
  };

  const handleAddSet = async (exerciseIndex) => {
    let newExercises = [...exercises];
    newExercises[exerciseIndex].sets.push({ weight: '', reps: '' });
    setExercises(newExercises);
    await storeData('@workout', newExercises);
  };

  const handleRemoveExercise = (index) => {
    setExercises((prevExercises) => {
      const newExercises = prevExercises.filter((_, i) => i !== index);
      storeData('@workout', newExercises); // Update stored data in AsyncStorage
      return newExercises;
    });
  };

  const renderSetItem = (exerciseIndex) => ({ item, index }) => (
    <View style={styles.setInput}>
      <Text>Set {index + 1}</Text>
      <TextInput
        placeholder="Weight (kg)"
        style={styles.setInputField}
        value={item.weight}
        keyboardType="numeric"
        onChangeText={(text) => handleWeightChange(text, exerciseIndex, index)}
      />
      <TextInput
        placeholder="Reps"
        style={styles.setInputField}
        value={item.reps}
        keyboardType="numeric"
        onChangeText={(text) => handleRepsChange(text, exerciseIndex, index)}
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
      <TouchableOpacity onPress={() => handleAddSet(index)} style={styles.addButton}>
        <Text style={styles.addSetButtonText}>Add Set</Text>
      </TouchableOpacity>
    </View>
  );

  const updateLeaderboard = async (userId, userName, exercises) => {
    const leaderboardRef = db.collection('leaderboard');
  
    for (let exercise of exercises) {
      const maxWeight = exercise.sets.reduce((max, set) => Math.max(max, Number(set.weight)), 0);
      const totalWeight = exercise.sets.reduce((total, set) => total + Number(set.weight) * Number(set.reps), 0);
      const totalReps = exercise.sets.reduce((total, set) => total + Number(set.reps), 0);
  
      try {
        const doc = await leaderboardRef
          .where('userId', '==', userId)
          .where('exercise', '==', exercise.name)
          .get();
  
        if (!doc.empty) {
          try {
            await doc.docs[0].ref.update({
              maxWeight, // this now holds the maximum weight lifted in any set for the exercise
              reps: firebase.firestore.FieldValue.increment(totalReps),
              totalWeight: firebase.firestore.FieldValue.increment(totalWeight),
            });
            console.log('Updated existing leaderboard entry successfully');
          } catch (error) {
            console.error('Error updating leaderboard entry: ', error);
          }
        } else {
          try {
            await leaderboardRef.add({
              userId,
              userName,
              exercise: exercise.name,
              maxWeight,
              totalReps,
              totalWeight,
            });
            console.log('Added new leaderboard entry successfully');
          } catch (error) {
            console.error('Error adding new leaderboard entry: ', error);
          }
        }
      } catch (error) {
        console.error('Error querying leaderboard: ', error);
      }
    }
  };


const endWorkout = async () => {
  if (exercises.length === 0) {
    Alert.alert("Alert", "You cannot end a workout without any exercises.");
    return;
  }

  if (!workoutName || workoutName.trim() === '') {
    alert('Please enter a workout name before ending the workout.');
    return;
  }

  for (let exercise of exercises) {
    for (let set of exercise.sets) {
      if (set.weight === '' ||  set.reps === '') {
        Alert.alert("Alert", "Cannot end if any fields are empty!");
        return;
      }
      // } else if ( set.reps === '') {
      //   Alert.alert("Alert", "Reps input for one of your exercises is missing!");
      //   return;
      // }
    }
  }

  await storeData('@workout', exercises);
  await storeData('@workoutName', workoutName);
  // await storeData('@duration', duration);
  await updateLeaderboard(user.uid, user.displayName, exercises);
  await saveToFirestore(exercises, workoutName, duration);
  Alert.alert("Success", "Workout saved successfully!", [
    { text: "OK", onPress: () => console.log("OK Pressed") }
  ]);

  setExercises([]);
  setWorkoutName(''); 
  await AsyncStorage.removeItem('@workout');
  await AsyncStorage.removeItem('@workoutName'); // This line is added

  setWorkoutActive(false);
  setWorkoutEnded(true);

  nav.navigate('Home', { userName: user.displayName, workoutEnded: true });
};



const cancelWorkout = async () => {
  setWorkoutActive(false);
  setWorkoutEnded(true);
  setExercises([]);
  setWorkoutName('');
  setDuration(0);
  await AsyncStorage.removeItem('@workout');
  await AsyncStorage.removeItem('@workoutName');
  nav.navigate('Home', { userName: user.displayName });
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
        </View>
        <TouchableOpacity onPress={() => setIsTimerModalVisible(true)}>
          <Ionicons name="timer" size={32} color="white" />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isTimerModalVisible}
          onRequestClose={() => setIsTimerModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.timerContainer}>
                <Text style={styles.timerTitle}>Rest Timer</Text>
                <Text style={styles.timerText}>{restTime}</Text>
                <TouchableOpacity
                  style={styles.timerButton}
                  onPress={handleRestDecrease}
                >
                  <Text style={styles.timerButtonText}>-30s</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.timerButton}
                  onPress={handleRestIncrease}
                >
                  <Text style={styles.timerButtonText}>+30s</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.timerButton}
                  onPress={handleRestStart}
                >
                  <Text style={styles.timerButtonText}>Start</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.timerButton}
                  onPress={handleRestEnd}
                >
                  <Text style={styles.timerButtonText}>End</Text>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity
                style={[styles.timerButton, styles.closeButton]}
                onPress={() => setIsTimerModalVisible(false)}
              >
                <Text style={styles.timerButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
      <FlatList
        data={exercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderExerciseItem}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddExercisesScreen', { exercises: exercises })}>
          <Text style={styles.buttonText}>Add Exercises</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={endWorkout}>
          <Text style={styles.buttonText}>End Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelWorkoutButton} onPress={cancelWorkout}>
          <Text style={styles.cancelWorkoutButtonText}>Cancel Workout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutNameInput: {
    color: 'black',
    fontSize: 16,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    width: '80%'
  },
  setInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#2e2e2e',
    borderRadius: 10,
    marginHorizontal: 20,
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
  addExercisesContainer: {
    flex: 1,
    marginTop: 50,
  },
  endWorkoutContainer: {
    flex: 1,
    marginBottom: 70,
  },
  cancelWorkoutContainer: {
    flex: 1,
    marginTop: 50,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderColor: '#007bff',
    borderWidth: 2,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelWorkoutButton: {
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderColor: '#FF0000',
    borderWidth: 2,
    borderRadius: 10,
  },
  cancelWorkoutButtonText: {
    fontSize: 16,
    color: '#FF0000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timerContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#eee',
    zIndex: 999, // To ensure the timer is visible on top of other elements.
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '70%',
    height: '70%',
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  timerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 20,
    height: '80%',
  },
  timerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timerText: {
    fontSize: 20,
    marginBottom: 20,
  },
  timerButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
  },
  timerButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default QuickStartScreen;