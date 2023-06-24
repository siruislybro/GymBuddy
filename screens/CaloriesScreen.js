import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';

const CaloriesScreen = ({navigation}) => {
  function backButtonHandler() {
    navigation.goBack();
  }
  const [calorieInput, setCalorieInput] = useState('');
  const [caloriesData, setCaloriesData] = useState([]);

  const addCaloriesData = () => {

    setCaloriesData(currentData => [
      ...currentData,
      { id: Math.random().toString(), value: calorieInput, date: new Date().toLocaleDateString() }
    ]);
    setCalorieInput('');
  };

  return (
    <View style={styles.container}>
      <Button
        title='Back to profile'
        onPress={backButtonHandler}
      />           
      <Text style={styles.title}>Calories Input</Text>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Enter Calories"
          style={styles.input}
          onChangeText={setCalorieInput}
          value={calorieInput}
          keyboardType="numeric"
        />
        <Button title="Add" onPress={addCaloriesData} />
      </View>
      <FlatList
        data={caloriesData}
        renderItem={itemData => (
          <View style={styles.listItem}>
            <Text style={styles.itemText}>{itemData.item.date}</Text>
            <Text style={styles.itemText}>{itemData.item.value} Calories</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010202',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFF',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#333',
  },
  input: {
    width: '80%',
    borderColor: '#87CEFA',
    borderWidth: 1,
    padding: 10,
    color: '#FFF',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#333',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  itemText: {
    fontSize: 14,
    color: '#87CEFA',
  },
});

export default CaloriesScreen;
