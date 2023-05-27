import React, { useState } from 'react';
import Colors from '../colours/colors';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    
    if (trimmedEmail && trimmedPassword) {
      const firstPart = trimmedEmail.split('@')[0];
      if (firstPart) {
        console.log('Logged in successfully');
        navigation.navigate('Profile', { 
          firstName: firstPart,
          email: trimmedEmail,
        });
      } else {
        Alert.alert('Please enter a valid email');
      }
    } else {
      Alert.alert('Please enter valid credentials');
    }
};


  return (
    <View style={styles.container}>
      <Text style={styles.textInput}> EMAIL: </Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          if (!text.includes(' ')) {
            setEmail(text.toLowerCase());
          }
        }}
        value={email}
      />
      <Text style={styles.textInput}> PASSWORD: </Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        onChangeText={(text) => setPassword(text.toLowerCase())}
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
    color: 'white',
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

export default LoginScreen;
