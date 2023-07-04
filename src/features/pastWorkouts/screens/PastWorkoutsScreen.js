import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { db, auth } from '../../../../firebase'; // Import Firebase configuration
import BackButton from '../../../components/BackButton';

const PastWorkoutsScreen = ({ navigation }) => {
  const [pastWorkouts, setPastWorkouts] = useState([]);

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
    }
  
    fetchWorkouts();
  }, []);
  

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
      <BackButton />
      </View>
      <Text style={styles.title}>Past Workouts</Text>
      <FlatList 
        data={pastWorkouts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.listItem}
            onPress={() => navigation.navigate('WorkoutDetail', { workout: item })}
          >
            <Text style={styles.item}>{item.workoutName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#010202',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#010202',
    borderRadius: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  datePicker: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  listItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
  },
});

export default PastWorkoutsScreen;
