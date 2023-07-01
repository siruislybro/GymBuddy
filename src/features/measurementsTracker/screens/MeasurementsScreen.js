import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Button } from 'react-native';
import DatePicker from 'react-native-datepicker';

const MeasurementScreen = ({navigation}) => {
  function backButtonHandler() {
    navigation.goBack();
  }
  const [date, setDate] = useState(new Date());
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [measurements, setMeasurements] = useState([]);

  const addMeasurement = () => {
    setMeasurements(prevMeasurements => [
      ...prevMeasurements, 
      { date: date.toString(), height, weight, id: Math.random().toString() }
    ]);
    setDate(new Date());
    setHeight('');
    setWeight('');
  };

  return (
    <View style={styles.container}>
      <Button
        title='Back to profile'
        onPress={backButtonHandler}
      /> 
      <Text style={styles.title}>Measurements</Text>
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
          placeholder="Height"
          value={height}
          onChangeText={setHeight}
        />
        <TextInput 
          style={styles.input}
          placeholder="Weight"
          value={weight}
          onChangeText={setWeight}
        />
        <Button title="Add Measurement" onPress={addMeasurement} />
      </View>
      <FlatList 
        data={measurements}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.date} - Height: {item.height}, Weight: {item.weight}</Text>
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

export default MeasurementScreen;
