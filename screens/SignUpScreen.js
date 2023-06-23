import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase'
import { getFirestore, doc, setDoc } from '@firebase/firestore';
import BackButton from '../components/BackButton';

const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSignUp = () => {
        auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log(user.email);
            // After successful signup, write user data to database
            writeUserData(user.uid, name, email);
            Alert.alert("Success!", "Account created successfully", [{ text: "OK", onPress: () => navigation.navigate('Login')}]);
    
            // Update the displayName in Firebase Auth
            user.updateProfile({
              displayName: name
            }).then(() => {
              console.log('Updated display name successfully.');
            }).catch((error) => {
              console.log('Error updating display name:', error);
            });
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Error!', 'E-mail address in use', [{ text: 'OK' }]);
            } else if (error.code === 'auth/invalid-email') {
                Alert.alert('Error!', 'The email address is not valid', [{ text: 'OK' }]);
            } else {
                Alert.alert(error.code);
            }
        })
    }
    

    const writeUserData = async (userId, name, email) => {
        const db = getFirestore();

        try {
            await setDoc(doc(db, "users", userId), {
                username: name,
                email: email,
            });
            console.log('User data written to Firestore');
        } catch (error) {
            console.error('Error writing user data to Firestore: ', error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <BackButton />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="white"
                onChangeText={setName}
                value={name}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="white"
                onChangeText={(text) => setEmail(text.toLowerCase())}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="white"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
            />
            <Button title="Sign Up" onPress={handleSignUp} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#010202'
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#010202',
        borderRadius: 10,
        padding: 10,
        margin: 10,
      },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 12,
        color: 'white',
    },
});

export default SignUpScreen;
