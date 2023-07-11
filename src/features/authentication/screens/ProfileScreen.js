import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../../../firebase';
import { auth } from '../../../../firebase';


const ProfileScreen = ({ navigation }) => { 
  const user = auth.currentUser;
  const email = user.email;
  const [numFollowers, setNumFollowers] = useState("loading...");
  const [numFollowing, setNumFollowing] = useState("loading...");
  const [profilePicture, setProfilePicture] = useState('../../../assets/images/GYMAPP.jpg');

  useEffect(() => {
    // Create a real-time listener
    console.log("profilescreen")
    const unsubscribe = db.collection('users').doc(user.uid)
        .onSnapshot(doc => {
            const data = doc.data();
            setNumFollowers(data.followers ? data.followers.length : 0);
            setNumFollowing(data.following ? data.following.length : 0);
            console.log("Profile Screen 0");
            if (data.profilePicture && data.profilePicture !== '') {
              setProfilePicture(data.profilePicture);
              console.log("Profile Screen 1");
            }
        }, error => {
            console.error("Error fetching user data: ", error);
        });

    // Clean up the subscription on unmount
    return () => unsubscribe();
}, []); // Empty array as the second parameter

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Image
        style={styles.avatar}
        source={profilePicture && profilePicture !== '' ? {uri: profilePicture} : require('../../../assets/images/GYMAPP.jpg')}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        {/* <Ionicons 
          name="settings-outline"
          size={28} 
          color="white"
          style={styles.settings}
        /> */}
      </TouchableOpacity>
      </View>
      <Text style={styles.email}>{email}</Text>
      <View style={styles.followContainer}>
        <Text style={styles.followText}>
          Following: {numFollowing}
        </Text>        
        <Text style={styles.followText}>
          Followers: {numFollowers}
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.editProfileButton}
        onPress={() => navigation.navigate('EditProfileScreen')}
      >
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('StatisticsScreen')} style={styles.button}>
            <Image source = {require('../../../assets/images/Statistics.png')} style = {styles.buttonImage} />
            <Text style={styles.buttonText}>Statistics</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CalendarScreen')} style={styles.button}>
            <Image source = {require('../../../assets/images/Calendar.png')} style = {styles.buttonImage} />
            <Text style={styles.buttonText}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('PastWorkoutsScreen')} style={styles.button}>
            <Image source = {require('../../../assets/images/PastWorkouts.png')} style = {styles.buttonImage} />
            <Text style={styles.buttonText}>Past Workouts</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MeasurementsScreen')} style={styles.button}>
            <Image source = {require('../../../assets/images/Measurements.png')} style = {styles.buttonImage} />
            <Text style={styles.buttonText}>Measurements</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CaloriesScreen')} style={styles.button}>
            <Image source = {require('../../../assets/images/Calories.png')} style = {styles.buttonImage} />
            <Text style={styles.buttonText}>Calories</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('LeaderboardScreen')} style={styles.button}>
            <Image source = {require('../../../assets/images/Leaderboard.png')} style = {styles.buttonImage} />
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
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    paddingRight: 10,
  },
  avatar: {
    marginTop: 20,
    width: 150,
    height: 150,
    borderRadius: 75,
    marginHorizontal: 115,
  },
  // settings: {
  //   marginLeft: 10,
  // },
  email: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
  },
  followContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  followText: {
    color: 'white',
    fontSize: 16,
  },
  editProfileButton: {
    backgroundColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  editProfileText: {
    color: 'black',
    fontSize: 14,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: "4%",
    paddingVertical: "4%",
  },
  button: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    width: "30%",
    height: 100, 
    marginBottom: 10,
    marginLeft: '1%',
    marginRight: '1%',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  buttonText: {
    color: 'black',
    fontSize: 10,
    textAlign: 'center',
  },
  buttonImage: {
    width: '100%',
    height: '70%',
    marginBottom: 5, 
    resizeMode : 'contain',
  },
});

export default ProfileScreen;
