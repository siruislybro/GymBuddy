import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { db, auth } from '../../../../firebase';
import BackButton from '../../../components/BackButton';

const StatisticsDetailScreen = ({ route }) => {
  const [exercises, setExercises] = useState([]);
  const { exerciseName } = route.params;
  const user = auth.currentUser;

  useEffect(() => {
    const fetchExerciseData = async () => {
      const docRef = db.collection('users').doc(user.uid).collection('workouts');
      const snapshot = await docRef.get();
      let exercises = [];
      snapshot.forEach(doc => {
        const workoutData = doc.data();
        workoutData.exercises.forEach(exercise => {
          if (exercise.name === exerciseName) {
            exercises.push({...exercise, createdAt: workoutData.createdAt}); // Include the creation time
          }
        });
      });

      setExercises(exercises);
    };

    fetchExerciseData();
  }, []);


  return (
    <View style={styles.container}>
        <View style={styles.topBar}>
            <BackButton />
        </View>
      <Text style={styles.title}>{exerciseName}</Text>
      <FlatList
        data={exercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.exerciseContainer}>
            <Text style={styles.header}>Workout {index + 1}</Text>
            <Text style={styles.date}>{item.createdAt}</Text>

            {item.sets.map((set, setIndex) => (
              <View key={setIndex} style={styles.set}>
                <Text style={styles.setText}>Set {setIndex + 1}: {set.reps} reps, {set.weight} kg</Text>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#010202',
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#010202',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
      },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#fff',
    },
    exerciseContainer: {
      backgroundColor: '#2e2e2e',
      borderRadius: 10,
      padding: 20,
      marginBottom: 20,
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#fff',
    },
    date: {
      fontSize: 16,
      marginBottom: 10,
      color: '#ccc',
    },
    set: {
      paddingLeft: 10,
      marginBottom: 5,
    },
    setText: {
      fontSize: 16,
      color: '#fff',
    },
  });

export default StatisticsDetailScreen;
