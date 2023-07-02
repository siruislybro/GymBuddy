import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import BackButton from '../components/BackButton';

const UserDetailScreen = ({ navigation, route }) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [openBodyType, setOpenBodyType] = useState(false);
  const [bodyType, setBodyType] = useState(null);
  const [openGoal, setOpenGoal] = useState(false);
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
        <View style={styles.innerContainer}>
        <BackButton />
      <Text style={styles.title}>User Details</Text>           
        </View>
      <TextInput style={styles.input} placeholder="Height" value={height} onChangeText={setHeight} placeholderTextColor="#FFF" />
      <TextInput style={styles.input} placeholder="Weight" value={weight} onChangeText={setWeight} placeholderTextColor="#FFF" />

      <DropDownPicker
        zIndex={openBodyType ? 3000 : 0}
        open={openBodyType}
        value={bodyType}
        items={[
          { label: 'Mesomorph', value: 'Mesomorph' },
          { label: 'Ectomorph', value: 'Ectomorph' },
          { label: 'Endomorph', value: 'Endomorph' },
        ]}
        setOpen={setOpenBodyType}
        setValue={setBodyType}
        placeholder="Select Body Type"
        placeholderStyle={{color: "#FFF"}}
        containerStyle={{ height: 60 }}
        style={{ backgroundColor: '#010202', borderWidth: 1, borderColor: "#FFF" }}
        dropDownStyle={{backgroundColor: "#010202"}}
        labelStyle={{color: "#FFF"}}
      />

      <DropDownPicker
        zIndex={openGoal ? 2000 : 0}
        open={openGoal}
        value={goal}
        items={[
          { label: 'Lose Weight', value: 'loseWeight' },
          { label: 'Build Muscle', value: 'buildMuscle' },
        ]}
        setOpen={setOpenGoal}
        setValue={setGoal}
        placeholder="Select Goal"
        placeholderStyle={{color: "#FFF"}}
        containerStyle={{ height: 60 }}
        style={{ backgroundColor: '#010202', borderWidth: 1, borderColor: "#FFF" }}
        dropDownStyle={{backgroundColor: "#010202"}}
        labelStyle={{color: "#FFF"}}
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
    backgroundColor: '#010202',
  },
  innerContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    marginHorizontal: 60,
    marginBottom: 20,
    color: '#FFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: '#FFF',
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
});

export default UserDetailScreen;
