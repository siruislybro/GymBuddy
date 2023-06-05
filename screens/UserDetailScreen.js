import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const UserDetailScreen = ({ navigation, route }) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bodyType, setBodyType] = useState(null);
  const [goal, setGoal] = useState(null);

  // Function to handle when the submit button is pressed
  const handleSubmit = async () => {
    // save user's answer to postgresql database
    // chatgpt api to generate recommended routine based on ans

    // navigate to the recommended routine after chatgpt generates
    navigation.navigate('RecommendedRoutineScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Details</Text>
      <TextInput style={styles.input} placeholder="Height" value={height} onChangeText={setHeight} />
      <TextInput style={styles.input} placeholder="Weight" value={weight} onChangeText={setWeight} />
      
      <DropDownPicker
        items={[
          { label: 'Mesomorph', value: 'Mesomorph' },
          { label: 'Ectomorph', value: 'Ectomorph' },
          { label: 'Endomorph', value: 'Endomorph' },
        ]}
        value={bodyType}
        defaultNull
        placeholder="Select Body Type"
        containerStyle={{ height: 40, marginBottom: 20 }}
        style={{ backgroundColor: '#fafafa' }}
        itemStyle={{ justifyContent: 'flex-start' }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={item => setBodyType(item.value)}
      />

      <DropDownPicker
        items={[
          { label: 'Lose Weight', value: 'loseWeight' },
          { label: 'Build Muscle', value: 'buildMuscle' },
        ]}
        value={goal}
        defaultNull
        placeholder="Select Goal"
        containerStyle={{ height: 40, marginBottom: 20 }}
        style={{ backgroundColor: '#fafafa' }}
        itemStyle={{ justifyContent: 'flex-start' }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={item => setGoal(item.value)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0484fb',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default UserDetailScreen;
