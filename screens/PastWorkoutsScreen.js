import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Button } from 'react-native';
import DatePicker from 'react-native-datepicker';

const PastWorkoutsScreen = ({navigation}) => {
  function backButtonHandler() {
    navigation.goBack();
  }
  const [date, setDate] = useState(new Date());
  const [workoutName, setWorkoutName] = useState('');
  const [duration, setDuration] = useState('');
  const [pastWorkouts, setPastWorkouts] = useState([]);

  const addWorkout = () => {
    setPastWorkouts(prevWorkouts => [
      ...prevWorkouts, 
      { 
        date: date.toString(), 
        workoutName, 
        duration, 
        id: Math.random().toString() 
      }
    ]);
    setDate(new Date());
    setWorkoutName('');
    setDuration('');
  };

  return (
    <View style={styles.container}>
      <Button
        title='Back to profile'
        onPress={backButtonHandler}
      /> 
      <Text style={styles.title}>Past Workouts</Text>
      <View style={styles.inputContainer}>
        <DatePicker
          style={styles.datePicker}
          date={date}
          mode="date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={setDate}
        />
        <TextInput 
          style={styles.input}
          placeholder="Workout Name"
          value={workoutName}
          onChangeText={setWorkoutName}
        />
        <TextInput 
          style={styles.input}
          placeholder="Duration (in minutes)"
          value={duration}
          onChangeText={setDuration}
        />
        <Button title="Add Workout" onPress={addWorkout} />
      </View>
      <FlatList 
        data={pastWorkouts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.date} - {item.workoutName} - {item.duration} minutes</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  datePicker: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  listItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
});

export default PastWorkoutsScreen;
