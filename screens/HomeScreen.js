import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Colors from '../colours/colors';

const HomeScreen = ({ navigation,route }) => {

    const { userName, email } = route.params;
    

    const handleQuickStartPress = () => {
        const exercises = []
        navigation.navigate('QuickStart', { exercises });
        console.log('Quick Start pressed');
    };

    const handleStartRoutinePress = () => {
        const hasAnsweredQuestions = false; // Replace this with the actual condition
        
        if (hasAnsweredQuestions) {
          navigation.navigate('RecommendedRoutineScreen');
        } else {
          navigation.navigate('UserDetail');
        }
    };

    const handleSetRemindersPress = () => {
        const botUsername = 'YourGymBuddyBot';
        const telegramUrlApp = `tg://resolve?domain=${botUsername}`;
        const telegramUrlWeb = `https://t.me/${botUsername}`;
        
        Linking.canOpenURL(telegramUrlApp).then(supported => {
          if (supported) {
            Linking.openURL(telegramUrlApp);
          } else {
            // If the Telegram app is not installed, open in web browser
            Linking.openURL(telegramUrlWeb);
          }
        });
      };
      
      
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome {userName}!</Text>
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSetRemindersPress}
                    activeOpacity={0.5}
                >
                    <Text style={styles.buttonText}>Set Reminders</Text>
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
        flex: 0.3,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        marginRight: 10,
        backgroundColor: '#0484fb',

    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 15,
    },
});

export default HomeScreen;
