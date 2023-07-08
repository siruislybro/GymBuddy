import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
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
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');

  useEffect(() => {
    setUsername(auth.currentUser.displayName);
    setEmail(auth.currentUser.email);
    setProfilePicture(auth.currentUser.profilePicture);
  }, []);

  const handleSave = async () => {
    const user = auth.currentUser;
    const db = getFirestore();

    if (username) {
      await updateDoc(doc(db, 'users', user.uid), {
        username: username,
        profilePicture: profilePicture,
      });
    
      await user.updateProfile({
        displayName: username,
        photoURL: profilePicture
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
    

    navigation.goBack();
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
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <BackButton />
      </View>
      <Image source={{ uri: profilePicture }} style={styles.profileImage} />
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Change Profile Picture</Text>
      </TouchableOpacity>
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
      <Text style={styles.label}>Age</Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />
      <Text style={styles.label}>Gender</Text>
      <TextInput
        value={gender}
        onChangeText={setGender}
        style={styles.input}
      />
      <Text style={styles.label}>Height (cm)</Text>
      <TextInput
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
        style={styles.input}
      />
      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        style={styles.input}
      />
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
      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010202',
    paddingHorizontal: 16,
  },
  topBar: {
    flex: 1,
    marginTop: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 2,
    borderColor: '#fff',
    marginBottom: 20,
    padding: 10,
    color: '#fff',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#1f8ef1',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#cf2121',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: 'center',
  },
  picker: {
    width: '100%',
    color: '#fff',
    backgroundColor: '#333',
    marginBottom: 20,
  },
});

export default EditProfileScreen;
