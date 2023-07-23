import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth } from '../../../../firebase';
import { getFirestore, doc, updateDoc, setDoc } from '@firebase/firestore';
import BackButton from '../../../components/BackButton';
import { Picker } from '@react-native-picker/picker';


const EditProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('../../../assets/images/GYMAPP.jpg');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [activityLevel, setActivityLevel] = useState('');
  
  const [ageError, setAgeError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [heightError, setHeightError] = useState('');
  const [weightError, setWeightError] = useState('');

  useEffect(() => {
    setUsername(auth.currentUser.displayName);
    setEmail(auth.currentUser.email);
    // setProfilePicture(auth.currentUser.profilePicture);
  }, []);

  const handleSave = async () => {
    const user = auth.currentUser;
    const db = getFirestore();

    let isValid = true;

    // Validate Age
    if (isNaN(age) || age <= 0) {
      setAgeError('Please enter a valid age');
      isValid = false;
    } else {
      setAgeError('');
    }

    // Validate Gender
    if (gender.toLowerCase() !== 'male' && gender.toLowerCase() !== 'female') {
      setGenderError('Gender must be either "Male" or "Female"');
      isValid = false;
    } else {
      setGenderError('');
    }

    // Validate Height
    if (isNaN(height) || height <= 0) {
      setHeightError('Please enter a valid height');
      isValid = false;
    } else {
      setHeightError('');
    }

    // Validate Weight
    if (isNaN(weight) || weight <= 0) {
      setWeightError('Please enter a valid weight');
      isValid = false;
    } else {
      setWeightError('');
    }

    // If everything is valid, proceed with saving
    if (isValid) {
      if (username) {
        await updateDoc(doc(db, 'users', user.uid), {
          username: username,
          // profilePicture: profilePicture,
        });
      
        await user.updateProfile({
          displayName: username,
          // photoURL: profilePicture
        });
      
        await user.reload();
      }
      
      if (email) {
        await user.updateEmail(email);
      }

      if (password) {
        await user.updatePassword(password);
      }
      
      await setDoc(doc(db, 'users', user.uid, 'userDetails', 'details'), {
        age: age,
        gender: gender,
        height: height,
        weight: weight,
        activityLevel: activityLevel
      });
      Alert.alert("Saved successfully!");
      navigation.goBack();
    }
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Start' }],
      });
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setProfilePicture(result.uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.topBar}>
          <BackButton />
        </View>
        {/* <View style={styles.card}>
          <Image source={{ uri: profilePicture }} style={styles.profileImage} />
          <TouchableOpacity onPress={pickImage} style={styles.button}>
            <Text style={styles.buttonText}>Change Profile Picture</Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.card}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>
              <Text style={styles.label}>Age: </Text>
        <TextInput
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          style={styles.input}
        />
        <Text style={styles.error}>{ageError}</Text>
        <Text style={styles.label}>Gender: </Text>
        <TextInput
          value={gender}
          onChangeText={setGender}
          style={styles.input}
        />
        <Text style={styles.error}>{genderError}</Text>
        <Text style={styles.label}>Height (cm):</Text>
        <TextInput
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          style={styles.input}
        />
        <Text style={styles.error}>{heightError}</Text>
        <Text style={styles.label}>Weight (kg):</Text>
        <TextInput
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          style={styles.input}
        />
        <Text style={styles.error}>{weightError}</Text>
        <Text style={styles.label}>Activity Level</Text>
        <Picker
          selectedValue={activityLevel}
          style={styles.picker}
          onValueChange={(itemValue) => setActivityLevel(itemValue)}
        >
          <Picker.Item label="Select Activity Level" value="" />
          <Picker.Item label="Sedentary: little or no exercise" value="level_1" />
          <Picker.Item label="Exercise 1-3 times/week" value="level_2" />
          <Picker.Item label="Exercise 4-5 times/week" value="level_3" />
          <Picker.Item label="Daily exercise or intense exercise 3-4 times/week" value="level_4" />
          <Picker.Item label="Intense exercise 6-7 times/week" value="5" />
          <Picker.Item label="Very intense exercise daily, or physical job" value="level_6" />
        </Picker>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#3A86FF',
    padding: 15,
    borderRadius: 8,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#ffffff',
    alignSelf: 'center',
  },
  label: {
    color: '#333',
    marginBottom: 8,
    marginLeft: 20,
    fontSize: 20,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    marginLeft: 20,
    fontSize: 20,
  },
  error: {
    color: '#f00',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#333',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    marginBottom: 32,
  },
  saveButton: {
    backgroundColor: '#3A86FF',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  logoutButton: {
    backgroundColor: '#FF006E',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
});


export default EditProfileScreen;
