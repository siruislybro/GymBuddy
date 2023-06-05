import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = ({navigation}) => {
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
