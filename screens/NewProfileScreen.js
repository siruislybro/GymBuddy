import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NewProfileScreen = ({ route, navigation }) => {
  const { email } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={require('../images/GYMAPP.jpg')}
        />
        <Ionicons 
          name="settings-outline"
          size={28} 
          color="white"
          style={styles.settings}
        />
      </View>
      <Text style={styles.email}>{email}</Text>
      <TouchableOpacity style={styles.editProfileButton}>
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Statistics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Past Workouts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Measurements</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Calories</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Leaderboard</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  avatar: {
    marginTop: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  settings: {
    position: 'absolute',
    right: 10,
  },
  email: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
  },
  editProfileButton: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  editProfileText: {
    color: 'white',
    fontSize: 14,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    width: '30%',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default NewProfileScreen;
