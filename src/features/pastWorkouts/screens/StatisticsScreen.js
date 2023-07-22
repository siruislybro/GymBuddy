import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { db, auth } from '../../../../firebase';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../../components/BackButton';

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
                <View style={{...styles.bar, width: `${(item[1]/maxCount)*100}%`}}/>
              </View>
              <Text style={styles.exerciseCount}>{item[1]} time(s)</Text>
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
    backgroundColor: '#F5F5F5',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 10,
    textAlign: 'center',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
  },
  exerciseName: {
    color: 'black',
    fontSize: 16,
    width: '30%',
  },
  exerciseCount: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  barContainer: {
    flex: 1,
    height: 20,
    marginHorizontal: 10,
    backgroundColor: '#666',
    borderRadius: 10,
  },
  bar: {
    backgroundColor: '#87CEFA',
    height: '100%',
    borderRadius: 10,
  },
});


export default StatisticsScreen;
