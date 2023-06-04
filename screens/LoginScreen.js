import React, { useState } from 'react';
import Colors from '../colours/colors';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { auth } from '../firebase'
import { getDatabase, ref, query, orderByChild, equalTo, onValue } from "firebase/database";


const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        auth
        .signInWithEmailAndPassword(trimmedEmail, trimmedPassword)
        .then(userCredentials => {
            const db = getDatabase();
            const usersRef = ref(db, "users");

            // Create a query to search for the user with the matching email
            const q = query(usersRef, orderByChild("email"), equalTo(email));

            // Attach a listener to the query to retrieve the user data
            onValue(q, (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    const userData = childSnapshot.val();
                    const username = userData.username;
                    console.log("Username:", username);
                    navigation.navigate('MainTabs', 
                    {screen: "Home" , params: 
                    { userName: username ,
                    email: trimmedEmail}});
                });
            });
        })
        .catch(error => alert(error.message))
    }


    return (
        <View style={styles.container}>
            <Text style={styles.textInput}> EMAIL: </Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
            />
            <Text style={styles.textInput}> PASSWORD: </Text>
            <TextInput
                style={styles.input}
                secureTextEntry
                onChangeText={setPassword}
                value={password}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: Colors.bgColor,
    },
    textInput: {
        color: "white",
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 12,
        color: "white",
    },
});

export default LoginScreen;
    