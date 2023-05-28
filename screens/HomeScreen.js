import React, {useLayoutEffect} from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../colours/colors';

const HomeScreen = ({ navigation,route }) => {

    const { firstName, email } = route.params;

    console.log("Email:", email) 

    const handleQuickStartPress = () => {
        // Handle quick start logic
        const exercises = []
        navigation.navigate('QuickStart', { exercises });
        console.log('Quick Start pressed');
    };

    const handleStartRoutinePress = () => {
        // Handle start routine logic
        console.log('Start Routine pressed');
    };

    // const handleEditProfilePress = () => {
    //     navigation.navigate('MainTabs', 
    //     {screen: "Profile" , params: 
    //     { email: email}});
    // };

    // // Set navigation options
    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerRight: () => (
    //             <TouchableOpacity
    //                 style={{ marginRight: 15 }}
    //                 onPress={handleEditProfilePress}
    //             >
    //                 <Ionicons name="person-circle-outline" size={25} color="black" />
    //             </TouchableOpacity>
    //         ),
    //     });
    // }, [navigation]);

    return (
        <View style={styles.container}>
            {/* Your other content here */}
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
        </View >
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
;

export default HomeScreen;

