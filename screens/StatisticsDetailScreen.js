import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { db, auth } from '../firebase';
import BackButton from '../components/BackButton';
// import { LineChart } from 'react-native-chart-kit';

const StatisticsDetailScreen = ({ route }) => {
  const [exercises, setExercises] = useState([]);
  const { exerciseName } = route.params;
  const user = auth.currentUser;

  const chartData = {
    labels: ["January", "Feb", "March", "April"],
    //exercises.map((exercise, index) => `Workout ${index + 1}`),
    datasets: [
      {
        data: exercises.map(exercise => 
          Math.max(...exercise.sets.map(set => set.weight))
        ),
      },
    ],
  };

  useEffect(() => {
    const fetchExerciseData = async () => {
      const docRef = db.collection('users').doc(user.uid).collection('workouts');
      const snapshot = await docRef.get();
      let exercises = [];

      snapshot.forEach(doc => {
        const workoutData = doc.data();
        workoutData.exercises.forEach(exercise => {
          if (exercise.name === exerciseName) {
            exercises.push(exercise);
          }
        });
      });

      setExercises(exercises);
    };

    fetchExerciseData();
  }, []);

  return (
    <View style={styles.container}>
        <View>
            <BackButton />
        </View>
        {/* <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 20} // from react-native
        height={220}
        yAxisLabel='Day'
        xAxisLabel='kg'
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2, 
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      /> */}
      <Text style={styles.title}>{exerciseName}</Text>
      <FlatList
        data={exercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.exerciseContainer}>
            <Text style={styles.header}>Workout {index + 1}</Text>
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
      padding: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    exerciseContainer: {
      backgroundColor: '#ddd',
      borderRadius: 5,
      padding: 15,
      marginBottom: 10,
    },
    exerciseHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    setContainer: {
      paddingLeft: 10,
      marginBottom: 5,
    },
    setText: {
      fontSize: 16,
    },
  });

export default StatisticsDetailScreen;
