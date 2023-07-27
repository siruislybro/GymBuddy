import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import { db, auth } from '../../../../firebase'; // Import Firebase configuration
import BackButton from '../../../components/BackButton';

const PastWorkoutsScreen = ({ navigation }) => {
  const [pastWorkouts, setPastWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const user = auth.currentUser;
      const workoutsRef = db.collection('users').doc(user.uid).collection('workouts');
      const snapshot = await workoutsRef.get();
  
      const workouts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      setPastWorkouts(workouts);
      setLoading(false); // Set loading to false after fetching data
    }
  
    fetchWorkouts();
  }, []);
  

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BackButton />
      </View>
      <Text style={styles.title}>Past Workouts</Text>
      {loading ? <Text>Loading...</Text> : 
      <FlatList 
        data={pastWorkouts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
        <TouchableOpacity 
          style={styles.listItem}
          onPress={() => {
            console.log('Navigating to PastWorkoutsDetailsScreen with workout:', item);
            navigation.navigate('PastWorkoutsDetailsScreen', { workout: item });
          }}
        >
          <Text style={styles.item}>{item.workoutName}</Text>
        </TouchableOpacity>
        )}
      />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#303030',
    marginBottom: 20,
  },
  listItem: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  item: {
    fontSize: 18,
    color: '#303030',
  },
});

export default PastWorkoutsScreen;
