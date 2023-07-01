import React, { useContext } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { WorkoutContext } from '../../../components/WorkoutContext';
import TimerPopup from '../../../components/TimerPopup';

const CalendarScreen = ({navigation}) => {

  const { isWorkoutActive, setWorkoutActive, workoutEnded, setWorkoutEnded } = useContext(WorkoutContext);
  function backButtonHandler() {
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <Button
        title='Back to profile'
        onPress={backButtonHandler}
      />     
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>My Calendar</Text>
        </View>
      </View>
      <Calendar
        onDayPress={(day) => {console.log('selected day', day)}}
        markedDates={{
          '2023-06-16': {selected: true, marked: true, selectedColor: 'blue'},
        }}
      />
      <TimerPopup
        isVisible={isWorkoutActive}
        onPress={() => {
            setWorkoutEnded(false);
            navigation.navigate('QuickStart');
        }}
        timerStart={new Date()}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 20,
  },
  titleContainer: {
    flex: 1, 
    alignItems: 'center', // Centers the title
  },
  title: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CalendarScreen;
