import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import BackButton from '../../../components/BackButton';
import { set } from 'date-fns';

const BuildRoutineScreen = ({ navigation, route }) => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [openNumWorkouts, setOpenNumWorkouts] = useState(false);
  const [numWorkouts, setNumWorkouts] = useState(null);
  const [openGoal, setOpenGoal] = useState(false);
  const [goal, setGoal] = useState(null);
  const [isLoading, setLoading] = useState(false); 
  const [additionalNotes, setAdditionalNotes] = useState('');
  // Function to handle when the submit button is pressed
  const handleSubmit = async () => {
    setLoading(true);

    // Construct the payload for the OpenAI API
    const BMI = {weight} / ({height} * {height});
    console.log(BMI);
    const prompt = `My height is ${height} cm, my weight is ${weight}kg and my goal is to ${goal}. Generate ${numWorkouts} weightlifting workout plans for me, each with 5 exercises. Start every workout plan with "Workout Plan X" and list each exercise as "• Exercise Name: Sets sets of Reps reps".
    ${additionalNotes}`;
    console.log(prompt)
    const maxTokens = 500; // Set the desired max number of tokens in the response
    const API_KEY = "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";

    console.log(API_KEY)

    const APIBODY = {
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0,
      max_tokens: maxTokens,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(APIBODY),
      });
  
      const data = await response.json();
      const recommendedRoutine = data.choices[0].text.trim();
  
      console.log(recommendedRoutine);
      navigation.navigate('RecommendedRoutine', { recommendedRoutine });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const goalOptions = [
    { label: 'Lose Weight', value: 'loseWeight' },
    { label: 'Build Muscle', value: 'buildMuscle' },
    { label: 'Lose Weight & Build Muscle', value: 'loseWeight&buildMuscle' },
  ];

  const numWorkoutsOptions = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
  ];

  const handleOpenGoalDropdown = () => {
    setOpenGoal((prevState) => !prevState);
    setOpenNumWorkouts(false); // Close the number of workouts dropdown
  };

  const handleOpenNumWorkoutsDropdown = () => {
    setOpenNumWorkouts((prevState) => !prevState);
    setOpenGoal(false); // Close the goal dropdown
  };

  return (
    <View style={styles.container}>
        <View style={styles.innerContainer}>
        <BackButton />
        <Text style={styles.title}>Routine Calibration</Text>
      </View>
      <Text style={styles.label}>Enter Height: </Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 175cm"
        value={height}
        onChangeText={setHeight}
        placeholderTextColor="#a9a9a9"
        keyboardType='numeric'
      />
      <Text style={styles.label}>Enter Weight: </Text>
      <TextInput
        style={styles.input}
        placeholder="e.g 70kg"
        value={weight}
        onChangeText={setWeight}
        placeholderTextColor="#a9a9a9"
        keyboardType='numeric'
      />
      <View style={styles.dropdownContainer1}>
        <Text style={styles.label}>Enter Goal:</Text>
        <View style={styles.dropdownWrapper}>
          {openNumWorkouts ? null :
            <DropDownPicker
              open={openGoal}
              value={goal}
              items={goalOptions}
              setOpen={handleOpenGoalDropdown}
              setValue={setGoal}
              placeholder="Select Goal"
              placeholderStyle={{ color: '#a9a9a9' }}
              containerStyle={styles.dropdown}
              style={styles.dropdown}
              dropDownStyle={styles.dropdown}
              labelStyle={styles.dropdownLabel}
              listItemContainerStyle={styles.dropdownItemContainer}
            />
          }
        </View>
      </View>
      <View style={styles.dropdownContainer2}>
        <Text style={styles.label}>Enter Workouts per Week:</Text>
        <View style={styles.dropdownWrapper}>
          {openGoal ? null :
            <DropDownPicker
              open={openNumWorkouts}
              value={numWorkouts}
              items={numWorkoutsOptions}
              setOpen={handleOpenNumWorkoutsDropdown}
              setValue={setNumWorkouts}
              placeholder="Select Number of Workouts"
              placeholderStyle={{ color: '#a9a9a9' }}
              containerStyle={styles.dropdown}
              style={styles.dropdown}
              dropDownStyle={styles.dropdown}
              labelStyle={styles.dropdownLabel}
              listItemContainerStyle={styles.dropdownItemContainer}
            />
          }
        </View>
      </View>
      <Text style={styles.text}>Additional Notes (Optional):</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. right knee injury"
        value={additionalNotes}
        onChangeText={setAdditionalNotes}
        placeholderTextColor="#a9a9a9"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
        <Text style={styles.buttonText}>Submit</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
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
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: 'black',
  },
  button: {
    backgroundColor: '#0484fb',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
  },
  dropdownContainer1: {
    width: '100%',
    marginBottom: 10,
    zIndex: 9000,
  },
  dropdownContainer2: {
    width: '100%',
    marginBottom: 10,
    zIndex: 8000,
  },
  label: {
    color: 'black',
    marginBottom: 5,
  },
  dropdownWrapper: {
    position: 'relative',
  },
  dropdown: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderColor: 'black',
  },
  dropdownLabel: {
    color: 'black',
  },
  dropdownItemContainer: {
    zIndex: 9999,
  },
  unit: {
    marginLeft: 5,
    color: '#FFF',
  }
});

export default BuildRoutineScreen;
