import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { db } from '../../../../firebase';
import BackButton from '../../../components/BackButton';

const UserProfileScreen = ({ route, navigation }) => {
  const [userData, setUserData] = useState(null);
  const { username } = route.params;

  useEffect(() => {
    db.collection('users')
      .where('username', '==', username)
      .get()
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          setUserData(querySnapshot.docs[0].data());
        } else {
          console.log("No user data found");
        }
      });
  }, []);

  const handleFollow = () => {
    // Follow user logic here
  };

  return userData ? (
    <View style={styles.container}>
      <BackButton />
      <Image
        style={styles.profileImage}
        source={{ uri: userData.profilePicture }}
      />
      <Text style={styles.username}>{userData.username}</Text>
      <Text style={styles.email}>{userData.email}</Text> 
      <View style={styles.followContainer}>
        <Text style={styles.followers}>
          Followers: {userData.followers ? userData.followers.length : 0}
        </Text>
        <Text style={styles.following}>
          Following: {userData.following ? userData.following.length : 0}
        </Text>
      </View>
      <Button title="Follow" onPress={handleFollow} style={styles.followButton} />
    </View>
  ) : (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 40,
  },
  email: {
    fontSize: 16,
    marginTop: 10,
    color: '#888',
  },
  followContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  followers: {
    fontSize: 16,
  },
  following: {
    fontSize: 16,
  },
  followButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: 10,
    borderRadius: 20,
    marginTop: 30,
  },
});

export default UserProfileScreen;
