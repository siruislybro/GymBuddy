import React, { useState } from 'react';
import Colors from '../colours/colors';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { auth } from '../firebase';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";


const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        const isUserAuthenticated = await authenticateUser(trimmedEmail, trimmedPassword);
        
        if (isUserAuthenticated) {
            await fetchUsernameAndNavigate(trimmedEmail);
        }
    };
      
      const authenticateUser = async (email, password) => {
        try {
          await auth.signInWithEmailAndPassword(email, password);
        } catch (error) {
            if (error.code === "auth/wrong-password") {
                alert("Error! Wrong password")
            }             
            else if (error.code === "auth/too-many-requests") {
                alert("Error! Access to this account has been temporarily disabled due to many failed login attempts. Please try again later")
            }
            else {
          alert(error.message);
            }
            return false;
        }
      };
      
      const fetchUsernameAndNavigate = async (email) => {
        const db = getFirestore();
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
      
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          const username = userData.username;
          console.log("Username:", username);
          navigation.navigate('MainTabs', 
            {screen: "Home" , params: 
              { userName: username ,
              email: email}
            }
          );
        });
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
    