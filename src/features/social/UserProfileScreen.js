import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { db, auth } from '../../../firebase';
import BackButton from '../../components/BackButton';
import { arrayUnion, arrayRemove } from '@firebase/firestore';

const UserProfileScreen = ({ route, navigation }) => {
  const [userData, setUserData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [currentUsername, setCurrentUsername] = useState(null);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const { username } = route.params;
  const currentUserId = auth.currentUser.uid;

  useEffect(() => {
    setIsFriend(isFollowing && isFollowed);
  }, [isFollowing, isFollowed]);


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
  
          const followersUnsub = doc.ref.collection('followers')
            .where('username', '==', currentUsername)
            .onSnapshot(followersSnapshot => {
              setIsFollowing(!followersSnapshot.empty);
          });
  
          // Subscribe to real-time updates for followers count
          const followersCountUnsub = doc.ref.collection('followers')
            .onSnapshot((querySnapshot) => {
              setFollowersCount(querySnapshot.size);
          });
  
          // Subscribe to real-time updates for following count
          const followingCountUnsub = doc.ref.collection('following')
            .onSnapshot((querySnapshot) => {
              setFollowingCount(querySnapshot.size);
          });

          const followingUnsub = doc.ref.collection('following')
          .where('username', '==', currentUsername)
          .onSnapshot(followingSnapshot => {
            setIsFollowed(!followingSnapshot.empty);
          });
        
        
  
          // Cleanup the subscription on unmount
          return () => {
            followersUnsub();
            followersCountUnsub();
            followingCountUnsub();
            followingUnsub();
          };
        } else {
          console.log("No user data found");
        }
      });

      // console.log(currentUsername);
      // db.collection('users')
      // .doc(currentUserId)
      // .get()
      // .then((doc) => {
      //   setCurrentUsername(doc.data().username);
      //   handleFollowedByUser(); // Check if user is a friend
      // });
      db.collection('users').doc(currentUserId).get().then((doc) => {
        setCurrentUsername(doc.data().username);
      });
      // console.log(currentUsername);
    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [username, currentUserId, currentUsername]);

  useEffect(() => {
    setIsFriend(isFollowing && isFollowed);
  }, [isFollowing, isFollowed]);

  
  
  const handleFollowBack = () => {
    handleFollow();
    handleFollowedByUser(); // Implement this function based on your Firebase schema
  };

  const handleFollowedByUser = () => {
    const followingRef = db.collection('users').doc(currentUserId).collection('followers');
    
    followingRef.doc(userData.id).set({
      username: userData.username,
      isNew: true
    })
    .then(() => {
      console.log("User successfully followed back!");
      setIsFollowing(true);
      setIsFriend(true);
  
      const currentUserRef = db.collection('users').doc(currentUserId);
      
      currentUserRef.update({
        following: arrayUnion(userData.username)
      })
      .then(() => {
        console.log("Updated current user's following array!");
  
        const followingRef = db.collection('users').doc(currentUserId).collection('following');
        
        followingRef.doc(userData.id).set({
          username: userData.username,
          isNew: true
        })
        .then(() => {
          console.log("Updated current user's following subcollection!");
        })
        .catch((error) => {
          console.error("Error updating current user's following subcollection: ", error);
        });
      })
      .catch((error) => {
        console.error("Error updating current user's following array: ", error);
      });

      // Add new follower notification
      const notificationsRef = db.collection('users').doc(userData.id).collection('notifications');
      notificationsRef.add({
        type: 'newFollower',
        username: currentUsername,
        isNew: true,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    })
    .catch((error) => {
      console.error("Error following back user: ", error);
    });
  };
  
  
  

  const getButtonTitle = () => {
    if (isFollowing) return "Unfollow";
    if (isFollowed) return "Follow back";
    return "Follow";
  };

  const handleFollow = () => {
    const followersRef = db.collection('users').doc(userData.id).collection('followers');
    followersRef.doc(currentUserId).set({
      username: currentUsername,
      isNew: true
    })
    .then(() => {
      console.log("User successfully followed!");
      setIsFollowing(true);
  
      const currentUserRef = db.collection('users').doc(currentUserId);
      currentUserRef.update({
        following: arrayUnion(username)
      })
      .then(() => {
        console.log("Updated current user's following array!");
  
        // Add the user being followed to the 'following' subcollection of the current user
        const followingRef = db.collection('users').doc(currentUserId).collection('following');
        followingRef.doc(userData.id).set({
          username: username,
          isNew: true
        })
        .then(() => {
          console.log("Updated current user's following subcollection!");
        })
        .catch((error) => {
          console.error("Error updating current user's following subcollection: ", error);
        });
  
      })
      .catch((error) => {
        console.error("Error updating current user's following array: ", error);
      });

      const notificationsRef = db.collection('users').doc(userData.id).collection('notifications');
      notificationsRef.add({
        type: 'newFollower',
        username: currentUsername,
        isNew: true,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

    })
    .catch((error) => {
      console.error("Error following user: ", error);
    });
  };
  

  const handleUnfollow = () => {
    const followersRef = db.collection('users').doc(userData.id).collection('followers');
    followersRef.doc(currentUserId).delete()
    .then(() => {
      console.log("User successfully unfollowed!");
      setIsFollowing(false);
      setIsFriend(false);
  
      const currentUserRef = db.collection('users').doc(currentUserId);
      currentUserRef.update({
        following: arrayRemove(username)
      })
      .then(() => {
        console.log("Updated current user's following array!");
  
        // Remove the user from the 'following' subcollection of the current user
        const followingRef = db.collection('users').doc(currentUserId).collection('following');
        followingRef.doc(userData.id).delete()
        .then(() => {
          console.log("Updated current user's following subcollection!");
        })
        .catch((error) => {
          console.error("Error updating current user's following subcollection: ", error);
        });
  
      })
      .catch((error) => {
        console.error("Error updating current user's following array: ", error);
      });
    })
    .catch((error) => {
      console.error("Error unfollowing user: ", error);
    });
  };
  
  const handleSendMessage = () => {
    navigation.navigate('Chat', { otherUserId: userData.id });
  };

  return userData ? (
    <View style={styles.container}>
      <BackButton />
      <Image
        style={styles.profileImage}
        source={{ uri: userData.profilePicture }}
      />
      <View style={styles.usernameContainer}>
        <Text style={styles.username}>{userData.username}</Text>
        {isFriend && <Text style={styles.friendLabel}>Friends</Text>}
      </View>
      <Text style={styles.email}>{userData.email}</Text>
      <View style={styles.followContainer}>
        <Text style={styles.followers}>
          Followers: {followersCount}
        </Text>
        <Text style={styles.following}>
          Following: {followingCount}
        </Text>
      </View>
      <Button
        title={getButtonTitle()}
        onPress={isFollowing ? handleUnfollow : (isFollowed ? handleFollowBack : handleFollow)}
        style={styles.followButton}
      />
      {isFriend ? (
        <Button
          title="Send Message"
          onPress={handleSendMessage}
          style={styles.sendMessageButton}
        />
      ) : null}
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
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  friendLabel: {
    marginLeft: 8,
    backgroundColor: '#3498db',
    color: '#fff',
    padding: 4,
    borderRadius: 4,
    fontSize: 14,
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
  sendMessageButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: 10,
    borderRadius: 20,
    marginTop: 30,
  },
});

export default UserProfileScreen;
