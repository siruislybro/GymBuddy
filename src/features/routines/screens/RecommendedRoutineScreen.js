import React from 'react';
import { ScrollView, Text, View, TouchableOpacity, Alert } from 'react-native';
import BackButton from '../../../components/BackButton';
import { db, auth } from '../../../../firebase';
import { useNavigation } from '@react-navigation/native';

const RecommendedRoutineScreen = ({ route }) => {
  const navigation = useNavigation();
  const user = auth.currentUser;
  const { recommendedRoutine } = route.params;
  const exercisePattern = /^• (.+): (\d+) sets of (\d+) reps$/; // Assumes exercise lines start with a bullet point (•) and follow the format "Exercise Name: Sets sets of Reps reps"
  console.log(exercisePattern)
  const workoutPlans = [];
  const lines = recommendedRoutine.split('\n');
  let currentPlan = null;
  lines.forEach((line) => {
    line = line.trim();
    
     // Check if the line starts with "Workout Plan" to identify new workout plans
    if (line.startsWith('Workout Plan')) {
    // Create a new workout plan object
    currentPlan = {
      planName: line,
      exercises: [],
    };
    workoutPlans.push(currentPlan);
  }
  
  // Check if the line matches the exercise pattern
  const exerciseMatch = line.match(exercisePattern);
  if (exerciseMatch) {
    // Extract exercise details
    const exerciseName = exerciseMatch[1];
    const sets = parseInt(exerciseMatch[2]);
    const reps = parseInt(exerciseMatch[3]);

    if (currentPlan) {
      // Push the exercise to the current workout plan
      const exercise = { name: exerciseName, sets: [] };

      for (let i = 0; i < sets; i++) {
        exercise.sets.push({ weight: '', reps: reps.toString() });
      }
      currentPlan.exercises.push(exercise);
    }
    }
  });
  console.log(currentPlan)

  const saveWorkoutPlans = () => {
    workoutPlans.forEach((plan, index) => {
      const workoutPlanRef = db
        .collection('users')
        .doc(user.uid)
        .collection('workoutPlans')
        .doc(`Workout Plan ${index + 1}`);
      
      workoutPlanRef
        .set(plan)
        .then(() => {
          console.log(`Workout plan ${index + 1} saved successfully!`);
        })
        .catch((error) => {
          console.error(`Error saving workout plan ${index + 1}:`, error);
        });
    });
    Alert.alert('Success', 'Workout plans saved successfully!', [{
        text: 'OK',
        onPress: () => navigation.navigate('WorkoutPlans', { user: user }),
      },
    ]);
  
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <BackButton />
      </View>
      <Text style={styles.heading}>Recommended Routine</Text>
      <Text style={styles.routine}>{recommendedRoutine}</Text>
      <TouchableOpacity style={styles.button} onPress={saveWorkoutPlans}>
        <Text style={styles.buttonText}>Save Workouts</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: 'black',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  routine: {
    color: 'black'
  },
  button: {
    backgroundColor: '#0484fb',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
};

export default RecommendedRoutineScreen;