import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../colours/colors';

const ProfileScreen = ({ navigation, route }) => {

    const { firstName, email } = route.params;

    const handleQuickStartPress = () => {
        navigation.navigate('QuickStart');
    };

    const handleStartRoutinePress = () => {
        console.log('Start Routine pressed');
    };

    const handleEditProfilePress = () => {
        navigation.navigate('Actual Profile', {
            email: email
        });
    };

    // Set navigation options
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{ marginRight: 15 }}
                    onPress={handleEditProfilePress}
                >
                    <Ionicons name="person-circle-outline" size={25} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome {firstName}!</Text>
            <View style={styles.buttons}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleQuickStartPress}
                    activeOpacity={0.5}
                >
                    <Text style={styles.buttonText}>Quick Start</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleStartRoutinePress}
                    activeOpacity={0.5}
                >
                    <Text style={styles.buttonText}>Start Routine</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.bgColor,
    },
    welcomeText: {
        color: "white",
        position: 'absolute',
        top: 70,
        left: 20,
        fontSize: 24,
        fontWeight: 'bold',
    },
    buttons: {
        flexDirection: 'row',
        marginTop: 10,
    },
    button: {
        flex: 0.2,
        padding: 10,
        borderWidth: 2,
        borderRadius: 5,
        marginRight: 10,
        backgroundColor: '#0484fb',
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
    },
});

export default ProfileScreen;
