import React, { useState } from 'react';
import Colors from '../colours/colors';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
        // Perform login logic here
        if (email && password) {
            // Validation passed, perform login actions
            const firstPart = email.split('@')[0];
            console.log('Logged in successfully');
            navigation.navigate('Profile', { firstName: firstPart });
        }
        else {
            // Validation failed, show an error message or perform appropriate actions
            console.log('Please enter valid credentials');
        }

    };

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
