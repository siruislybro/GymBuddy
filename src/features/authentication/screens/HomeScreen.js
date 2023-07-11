import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { db, auth } from '../../../../firebase';
import UserContext from '../../../components/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome';


const HomeScreen = ({ navigation, route }) => {
  // User context
  const { user } = useContext(UserContext);

  // State variables
  const [modalVisible, setModalVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [followedWorkouts, setFollowedWorkouts] = useState([]);
  const [isLoading, setLoading] = useState(true); 

  // Effects
  useEffect(() => { fetchUsers(); }, []);
  useEffect(() => { fetchFollowedUsers(); }, []);  
  useEffect(() => { setFilteredUsers(filterUsers(query)); }, [query]);

  // Format duration of workout
  const formatDuration = (duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;
  
    let formattedDuration = "";
    if (hours > 0) {
      formattedDuration += `${hours} hour${hours > 1 ? "s" : ""} `;
    }
    if (minutes > 0) {
      formattedDuration += `${minutes} minute${minutes > 1 ? "s" : ""} `;
    }
    if (seconds > 0) {
      formattedDuration += `${seconds} second${seconds > 1 ? "s" : ""}`;
    }
  
    return formattedDuration.trim();
  };

  // Fetch all users
  const fetchUsers = async () => {
    console.log("DB Object:", db);
    setLoading(true);
    try {
      console.log('Before querying Firestore');
      const querySnapshot = await db.collection('users').get();
      console.log('After querying Firestore');      
      const usersData = querySnapshot.docs.map((doc) => doc.data().username);
      console.log("No error at usersData");
      setUsers(usersData);
      console.log("Home Screen 1");
    } catch (error) {
      console.error('Error fetching users:', error);
      // Handle the error or display an error message to the user
    } finally {
      setLoading(false);
    }
  };
  

  
// Fetch followed users and their workouts
const fetchFollowedUsers = async () => {
  console.log('Fetching followed users and workouts...');
  const currentUser = auth.currentUser;

  // Retrieve the followed users
  const followedUsersSnapshot = await db
    .collection('users')
    .doc(currentUser.uid)
    .get();

  const followedUsernames = followedUsersSnapshot.data().following || [];
  const usersData = [];

  for (const username of followedUsernames) {
    // Get the user document for this username
    const userQuerySnapshot = await db
      .collection('users')
      .where('username', '==', username)
      .get();
      
    // Check if a user with this username exists
    if (!userQuerySnapshot.empty) {
      const userDoc = userQuerySnapshot.docs[0];
      const userData = userDoc.data();

      // Get this user's workouts
      const workoutsSnapshot = await userDoc.ref
        .collection('workouts')
        .orderBy('createdAt', 'desc')
        .get();

      const workoutsData = workoutsSnapshot.docs.map((workoutDoc) => ({
        id: workoutDoc.id,
        ...workoutDoc.data(),
      }));

      // Add this user and their workouts to the data array
      usersData.push({ ...userData, workouts: workoutsData });
    }
  }

  setFollowedWorkouts(usersData);
};


  // Filter users based on query
  const filterUsers = (query) => {
    if (query === '') return [];
    const lowerCaseQuery = query.toLowerCase();
    return users.filter((user) => user.toLowerCase().includes(lowerCaseQuery));
  };

  // Navigation functions
  const navigateToUserProfile = (username) => {
    if (username === user.username) {
      // If the selected username is the current user's username, navigate to own profile
      navigation.navigate('Profile');
    } else {
      // If the selected username is not the current user's username, navigate to selected user's profile
      navigation.navigate('UserProfile', { username });
    }
    setModalVisible(false);
  };


  const navigateToWorkoutDetail = (workout) => {
    navigation.navigate('WorkoutDetail', { workout })
  }

  // Render functions
  const renderUserItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigateToUserProfile(item)}
      style={styles.autocompleteItem}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const renderFollowedWorkouts = ({ item }) => {
    return item.workouts.map((workout, index) => (
      <TouchableOpacity
        onPress={() => navigateToWorkoutDetail(workout)}
        style={styles.userItem}
        key={`${item.id}_${index}`} // Use combination of user id and index as a unique key
      >
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.workoutName}>{workout.workoutName}</Text>
        <Text style={styles.createdAt}>{workout.createdAt}</Text>
        {workout.exercises && workout.exercises.slice(0, 1).map((exercise, exerciseIndex) => (
          <View key={exerciseIndex}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseDuration}>
              Duration: {formatDuration(workout.duration)}
            </Text>
            {exercise.sets && exercise.sets.map((set, setIndex) => (
              <View key={setIndex} style={styles.setContainer}>
                <Text style={styles.setText}>Set {setIndex + 1}:</Text>
                <Text style={styles.setText}>Reps: {set.reps}</Text>
                <Text style={styles.setText}>Weight: {set.weight}</Text>
              </View>
            ))}
          </View>
        ))}
        {workout.exercises && workout.exercises.length > 1 && (
          <TouchableOpacity 
            onPress={() => navigateToWorkoutDetail(workout)}
            style={styles.seeMoreButton}
          >
            <View style={styles.seeMoreContainer}>
             <Text style={styles.seeMoreText}>See more exercises</Text>
            </View>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    ));
  };
  

  // Component rendering
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
      <>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Home</Text>
        <TouchableOpacity
          style={styles.searchIcon}
          onPress={() => setModalVisible(true)}
        >
          <Icon name="search" size={30} color="white" />
        </TouchableOpacity>
      </View>
      {/* Modal for search */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              value={query}
              onChangeText={(text) => setQuery(text)}
              placeholder="Search for a user"
            />
            <FlatList
              data={filteredUsers}
              renderItem={renderUserItem}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* List of workouts */}
      <FlatList
        data={followedWorkouts}
        renderItem={renderFollowedWorkouts}
        keyExtractor={(item, index) => `${item.id}_${index}`}
      />
      </>
      )}
    </View>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 15,
    marginBottom: 20,
  },
  welcomeText: {
    marginTop: 20,
    color: '#333',
    fontSize: 26,
    fontWeight: '600',
  },
  searchIcon: {
    padding: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#fff'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 15,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
  autocompleteItem: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  userItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#eee',
    borderWidth: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  workoutName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginTop: 10,
  },
  createdAt: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 10,
  },
  exerciseDuration: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  setContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  setText: {
    fontSize: 14,
    color: '#555',
  },
  seeMoreButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  seeMoreText: {
    color: '#333',
    textAlign: 'center',
  },
});


export default HomeScreen;
