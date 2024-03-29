import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../utils/colors';
import { db, auth } from '../../../../firebase';

const RoutineHomeScreen = () => {
  const currUser = auth.currentUser;
  const navigation = useNavigation();

  const handleRoutineCalibration = () => {
    navigation.navigate('BuildRoutine');
  };

  const handleViewWorkoutPlans = () => {
    // The navigation parameters should be passed as an object
    console.log(currUser);
    navigation.navigate('WorkoutPlans', { user: currUser });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleRoutineCalibration}
          activeOpacity={0.5}
        >
          <Text style={styles.buttonText}>Build Routine</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleViewWorkoutPlans}
          activeOpacity={0.5}
        >
          <Text style={styles.buttonText}>View Workout Plans</Text>
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
    backgroundColor: '#F5F5F5',
  },
  buttons: {
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

export default RoutineHomeScreen;
