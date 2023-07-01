import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Colors from './colours/colors';
import UserContext from './src/components/UserContext';
import { WorkoutContext } from './src/components/WorkoutContext';
import { auth, db } from './firebase';
import Exercise from './models/Exercise';
import AddExercisesScreen from './src/features/workoutTracker/screens/AddExercisesScreen';
import CalendarScreen from './src/features/calander/screens/CalanderScreen';
import CaloriesScreen from './src/features/calorieTracker/screens/CaloriesScreen';
import EditProfileScreen from './src/features/authentication/screens/EditProfileScreen';
import ExerciseDetailsScreen from './src/features/workoutTracker/screens/ExerciseDetailsScreen';
import ExerciseOverviewScreen from './src/features/workoutTracker/screens/ExerciseOverviewScreen';
import HomeScreen from './src/features/authentication/screens/HomeScreen';
import LeaderboardScreen from './src/features/leaderboard/screens/LeaderboardScreen';
import MaxWeightLeaderboardDetailsScreen from './src/features/leaderboard/screens/MaxWeightLeaderboardScreen';
import TotalWeightLeaderboardDetailsScreen from './src/features/leaderboard/screens/TotalWeightLeaderboardScreen';
import LeaderboardDetailsScreen from './src/features/leaderboard/screens/LeaderboardDetailsScreen';
import LoginScreen from './src/features/authentication/screens/LoginScreen';
import MeasurementScreen from './src/features/measurementsTracker/screens/MeasurementsScreen';
import PastWorkoutsScreen from './src/features/pastWorkouts/screens/PastWorkoutsScreen';
import ProfileScreen from './src/features/authentication/screens/ProfileScreen';
import QuickStartScreen from './src/features/workoutTracker/screens/QuickStartScreen';
import RecommendedRoutineScreen from './src/features/routines/screens/RecommendedRoutineScreen';
import SignUpScreen from './src/features/authentication/screens/SignUpScreen';
import StartScreen from './src/features/authentication/screens/StartScreen';
import StatisticsDetailScreen from './src/features/pastWorkouts/screens/StatisticsDetailScreen';
import StatisticsScreen from './src/features/pastWorkouts/screens/StatisticsScreen';
import UserDetailScreen from './src/features/routines/screens/UserDetailScreen';
import WorkoutDetailScreen from './src/features/pastWorkouts/screens/WorkoutDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            size = focused ? 28 : 24;
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
            size = focused ? 28 : 24;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#c5e2fe',
        tabBarInactiveTintColor: '#c5e2fe',
      })}

    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};



export default function App() {
  const [isWorkoutActive, setWorkoutActive] = useState(false);
  const [workoutEnded, setWorkoutEnded] = useState(false);
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <WorkoutContext.Provider value={{
        isWorkoutActive,
        setWorkoutActive,
        workoutEnded,
        setWorkoutEnded
      }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Start"
              component={StartScreen}
              options={{ headerShown: false }}
              initialParams={{ initial: true }}
            />
            <Stack.Screen
              name="MainTabs"
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
              cardstyle={backgroundColor = Colors.buttonColor}
            />
            <Stack.Screen
              name="Sign Up"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditProfileScreen"
              component={EditProfileScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="QuickStart"
              component={QuickStartScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UserDetail"
              component={UserDetailScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RecommendedRoutine"
              component={RecommendedRoutineScreen}
              options={({ headerShown: false })}
            />
            <Stack.Screen
              name="AddExercisesScreen"
              component={AddExercisesScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ExerciseOverview"
              component={ExerciseOverviewScreen}
              options={({ route, navigation }) => {
                const title = route.params.title;
                return {
                  title: title,
                  headerShown: false,
                };
              }}
            />
            <Stack.Screen
              name="StatisticsScreen"
              component={StatisticsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CalendarScreen"
              component={CalendarScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PastWorkoutsScreen"
              component={PastWorkoutsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MeasurementsScreen"
              component={MeasurementScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CaloriesScreen"
              component={CaloriesScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LeaderboardScreen"
              component={LeaderboardScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LeaderboardDetails"
              component={LeaderboardDetailsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MaxWeightDetails"
              component={MaxWeightLeaderboardDetailsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TotalWeightDetails"
              component={TotalWeightLeaderboardDetailsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ExerciseDetails"
              component={ExerciseDetailsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WorkoutDetail"
              component={WorkoutDetailScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="StatisticsDetail"
              component={StatisticsDetailScreen}
              options={{ headerShown: false }}
            />

          </Stack.Navigator>
          <StatusBar style="light" />
        </NavigationContainer>
      </WorkoutContext.Provider>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  buttons: {
    backgroundColor: Colors.buttonColor,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});