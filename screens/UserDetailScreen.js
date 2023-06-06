import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

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
      <Text style={styles.title}>User Details</Text>
      <TextInput style={styles.input} placeholder="Height" value={height} onChangeText={setHeight} />
      <TextInput style={styles.input} placeholder="Weight" value={weight} onChangeText={setWeight} />

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
        containerStyle={{ height: 60 }}
        style={{ backgroundColor: '#fafafa' }}
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
        containerStyle={{ height: 60 }}
        style={{ backgroundColor: '#fafafa' }}
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
