import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Calendar</Text>
      <Calendar
        onDayPress={(day) => {console.log('selected day', day)}}
        markedDates={{
          '2023-06-16': {selected: true, marked: true, selectedColor: 'blue'},
        }}
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
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default CalendarScreen;
