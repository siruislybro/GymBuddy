import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth } from '../../../../firebase';
import { getFirestore, doc, updateDoc } from '@firebase/firestore';
import BackButton from '../../../components/BackButton';

const EditProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    setUsername(auth.currentUser.displayName);
    setEmail(auth.currentUser.email);
    // Default image URL if user doesn't have one
    setProfilePicture(auth.currentUser.photoURL || '../../../assets/images/GYMAPP.jpg');
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
    }
    
    if (email) {
      await user.updateEmail(email);
    }

    if (password) {
      await user.updatePassword(password);
    }
    
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
    <View style={styles.container}>
      <BackButton />
      <Image source={{ uri: profilePicture }} style={styles.profileImage} />
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Change Profile Picture</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Update username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Update email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Update password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010202',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
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
  },
});

export default EditProfileScreen;
