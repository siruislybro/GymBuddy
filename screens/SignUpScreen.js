import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase'
import { getFirestore, doc, setDoc } from '@firebase/firestore';

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
        })
        .catch(error => alert(error.message))
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
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={setName}
                value={name}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
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
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 12,
    },
});

export default SignUpScreen;
