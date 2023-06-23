import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { db, auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton';

const StatisticsScreen = () => {
  const [exercisesCount, setExercisesCount] = useState({});
  const user = auth.currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchExercisesData = async () => {
      const docRef = db.collection('users').doc(user.uid).collection('workouts');
      const snapshot = await docRef.get();
      
      let exercisesCount = {};
      
      snapshot.forEach(doc => {
        const workoutData = doc.data();
        workoutData.exercises.forEach(exercise => {
          if (!exercisesCount[exercise.name]) {
            exercisesCount[exercise.name] = 1;
          } else {
            exercisesCount[exercise.name]++;
          }
        });
      });
      
      setExercisesCount(exercisesCount);
    };

    fetchExercisesData();
  }, []);

  const maxCount = Math.max(...Object.values(exercisesCount));

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BackButton />
      </View>
      <Text style={styles.title}>Main Exercises</Text>
      <FlatList 
        data={Object.entries(exercisesCount)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate('StatisticsDetail', { exerciseName: item[0] })}>
            <View style={styles.listItem}>
              <Text style={styles.exerciseName}>{item[0]}</Text>
              <View style={styles.barContainer}>
                <View style={{...styles.bar, height: `${(item[1]/maxCount)*100}%`}}/>
              </View>
              <Text style={styles.exerciseCount}>{item[1]} times</Text>
            </View>
          </TouchableOpacity>
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
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#2e2e2e',
    borderRadius: 10,
    marginBottom: 10,
  },
  exerciseName: {
    color: '#fff',
    fontSize: 16,
  },
  exerciseCount: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  barContainer: {
    flex: 1,
    height: 50,
    marginHorizontal: 10,
    backgroundColor: '#ccc',
  },
  bar: {
    backgroundColor: '#f00',
    width: '100%',
  },
});

export default StatisticsScreen;
