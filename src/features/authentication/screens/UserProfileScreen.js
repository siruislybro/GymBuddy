import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { db, auth } from '../../../../firebase';
import BackButton from '../../../components/BackButton';
import { arrayUnion, arrayRemove } from '@firebase/firestore';

const UserProfileScreen = ({ route, navigation }) => {
  const [userData, setUserData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentUsername, setCurrentUsername] = useState(null);
  const { username } = route.params;
  const currentUserId = auth.currentUser.uid;

  useEffect(() => {
    const unsubscribe = db.collection('users')
      .where('username', '==', username)
      .onSnapshot(querySnapshot => {
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const data = doc.data();
          setUserData({
            id: doc.id,  
            ...data,
          });
          setIsFollowing(data.followers.includes(currentUsername));
        } else {
          console.log("No user data found");
        }
      });

    db.collection('users').doc(currentUserId).get().then((doc) => {
      setCurrentUsername(doc.data().username);
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [username, currentUserId, currentUsername]); 

  

  const handleFollow = () => {
    const userRef = db.collection('users').doc(userData.id);
    userRef.update({
      followers: arrayUnion(currentUsername)
    })
    .then(() => {
      console.log("User successfully followed!");
      setIsFollowing(true);
  
      // Update the current user's following array
      const currentUserRef = db.collection('users').doc(currentUserId);
      currentUserRef.update({
        following: arrayUnion(username)
      })
      .then(() => {
        console.log("Updated current user's following array!");
      })
      .catch((error) => {
        console.error("Error updating current user's following array: ", error);
      });
    })
    .catch((error) => {
      console.error("Error following user: ", error);
    });
  };
  
  const handleUnfollow = () => {
    const userRef = db.collection('users').doc(userData.id);
    userRef.update({
      followers: arrayRemove(currentUsername)
    })
    .then(() => {
      console.log("User successfully unfollowed!");
      setIsFollowing(false);
  
      // Update the current user's following array
      const currentUserRef = db.collection('users').doc(currentUserId);
      currentUserRef.update({
        following: arrayRemove(username)
      })
      .then(() => {
        console.log("Updated current user's following array!");
      })
      .catch((error) => {
        console.error("Error updating current user's following array: ", error);
      });
    })
    .catch((error) => {
      console.error("Error unfollowing user: ", error);
    });
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
      <Button 
        title={isFollowing ? "Unfollow" : "Follow"} 
        onPress={isFollowing ? handleUnfollow : handleFollow} 
        style={styles.followButton} 
      />
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
