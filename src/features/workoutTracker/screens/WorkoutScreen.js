import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Colors from '../../../utils/colors';
import TimerPopup from '../../../components/TimerPopup';
import { WorkoutContext } from '../../../components/WorkoutContext';
import UserContext from '../../../components/UserContext';


const WorkoutScreen = ({ navigation, route }) => {
  const { user } = useContext(UserContext); 
  const { isWorkoutActive, setWorkoutActive, workoutEnded, setWorkoutEnded } = useContext(WorkoutContext);


  useEffect(() => {
    // If workoutEnded is true, remove the popup
    if (route.params?.workoutEnded) {
      setWorkoutActive(false);
    }
  }, [route.params?.workoutEnded]);

  const handleQuickStartPress = () => {
    const exercises = [];
    navigation.navigate('QuickStart', { exercises });
    setWorkoutActive(true);
    console.log('Quick Start pressed');
  };

  const handleStartRoutinePress = () => {
    const hasAnsweredQuestions = false; // Replace this with the actual condition

    if (hasAnsweredQuestions) {
      navigation.navigate('RecommendedRoutineScreen');
    } else {
      navigation.navigate('RoutineCalibration');
    }
  };

  const handleSetRemindersPress = () => {
    const botUsername = 'YourGymBuddyBot';
    const telegramUrlApp = `tg://resolve?domain=${botUsername}`;
    const telegramUrlWeb = `https://t.me/${botUsername}`;

    Linking.canOpenURL(telegramUrlApp).then((supported) => {
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
      <Text style={styles.welcomeText}>Welcome {user?.username}!</Text>
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
          <Text style={styles.buttonText}>Routines</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSetRemindersPress}
          activeOpacity={0.5}
        >
          <Text style={styles.buttonText}>Reminders</Text>
        </TouchableOpacity>
      </View>
      <TimerPopup
        isVisible={isWorkoutActive}
        onPress={() => {
            setWorkoutEnded(false);
            navigation.navigate('QuickStart');
        }}
        timerStart={new Date()}
        />
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
    color: 'white',
    position: 'absolute',
    top: 70,
    left: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    flexDirection: 'column',
    marginTop: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0484fb',
    borderRadius: 10,
    width: 200,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default WorkoutScreen;