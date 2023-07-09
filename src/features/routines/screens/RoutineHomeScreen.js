import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../utils/colors';

const RoutineHomeScreen = () => {
  const navigation = useNavigation();

  const handleRoutineCalibration = () => {
    navigation.navigate('RoutineCalibrationScreen');
  };

  const handleViewSavedWorkouts = () => {
    navigation.navigate('SavedWorkoutsScreen');
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
          onPress={handleViewSavedWorkouts}
          activeOpacity={0.5}
        >
          <Text style={styles.buttonText}>View Saved Workouts</Text>
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

export default RoutineHomeScreen;
