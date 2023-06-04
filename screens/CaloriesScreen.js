import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';

const CaloriesScreen = () => {
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
    <View style={styles.screen}>
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
            <Text>{itemData.item.date}</Text>
            <Text>{itemData.item.value} Calories</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10
  },
  listItem: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default CaloriesScreen;
