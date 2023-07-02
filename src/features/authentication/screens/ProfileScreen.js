import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db, auth } from '../../../../firebase';

const ProfileScreen = ({ navigation }) => { 
  const user = auth.currentUser;
  const email = user.email
  const username = "sr";

  const [numFollowers, setNumFollowers] = useState(0);
  const [numFollowing, setNumFollowing] = useState(0);

  useEffect(() => {
    const fetchFollowData = async () => {
      const followersSnapshot = await db.collection('users').doc(user.uid).collection('followers').get();
      const followingSnapshot = await db.collection('users').doc(user.uid).collection('following').get();
      
      setNumFollowers(followersSnapshot.size);
      setNumFollowing(followingSnapshot.size);
    }

    fetchFollowData();
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={require('../../../assets/images/GYMAPP.jpg')}
        />
        <Ionicons 
          name="settings-outline"
          size={28} 
          color="white"
          style={styles.settings}
        />
      </View>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.stats}>Followers: {numFollowers}  Following: {numFollowing}</Text>
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
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  avatar: {
    marginTop: 20,
    width: 200,
    height: 200,
    borderRadius: 100,
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
  stats: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
  },
});

export default ProfileScreen;