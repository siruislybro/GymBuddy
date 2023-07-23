import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { auth, db } from '../../../../firebase'
import BackButton from '../../../components/BackButton';

const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setLoading] = useState(false); 

    const writeUserData = async (userId, name, email) => {
        const defaultProfilePic = '../../../assets/images/GYMAPP.jpg'; 
        // Set the path to the default profile picture
        try {
            await db.collection('users').doc(userId).set({
                username: name,
                email: email,
                profilePicture: defaultProfilePic,
                following: [],
                followers: [],
            });


            
            console.log('User data written to Firestore');
            } catch (error) {
            console.error('Error writing user data to Firestore: ', error);
            }
    };

    const checkIfUsernameExists = async (username) => {
        const userRef = db.collection("users");
        const query = userRef.where("username", "==", username);
        const querySnapshot = await query.get();
        return !querySnapshot.empty; // Returns true if username already exists
      }

    // const fetchUsers = async () => {
    //     const querySnapshot = await db.collection('users').get();
    //     const usersData = querySnapshot.docs.map((doc) => doc.data().username);
    //     setUsers(usersData);
    //   };
      
    const handleSignUp = () => {
        setLoading(true);
        checkIfUsernameExists(name).then((usernameExists) => {
            if (usernameExists) {
                Alert.alert('Error!', 'Username already in use', [{ text: 'OK' }]);
            } else {
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
        }).finally(() => {
            setLoading(false);
        });
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
            <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={isLoading}>
                {isLoading ? (
                    <ActivityIndicator size="small" color="#FFF" />
                ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
                )}
            </TouchableOpacity>
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
    button: {
        backgroundColor: '#0484fb',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    },
});

export default SignUpScreen;
