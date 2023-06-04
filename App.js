import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './screens/StartScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import QuickStartScreen from './screens/QuickStartScreen';
import AddExercisesScreen from './screens/AddExercisesScreen';
import ExerciseOverviewScreen from './screens/ExerciseOverviewScreen';
import ExerciseDetailsScreen from './screens/ExerciseDetailsScreen';
import { Ionicons } from '@expo/vector-icons';
import Colors from './colours/colors';
import Exercise from './models/Exercise';
import StatisticsScreen from './screens/StatisticsScreen';
import CalendarScreen from './screens/CalanderScreen';
import PastWorkoutsScreen from './screens/PastWorkoutsScreen';
import MeasurementScreen from './screens/MeasurementsScreen';
import CaloriesScreen from './screens/CaloriesScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';

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
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name = "Start" 
        component = {StartScreen} 
        options = {{headerShown: false}} 
        initialParams={{initial : true}} 
        />
        <Stack.Screen 
        name="MainTabs" 
        component={MainTabs} 
        options={{ headerShown: true }} 
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
          cardstyle={backgroundColor = Colors.buttonColor}
        />
        <Stack.Screen name="Sign Up" 
        component={SignUpScreen} 
        options={{ headerShown: true }} 
        />
        <Stack.Screen 
          name="QuickStart"
          component={QuickStartScreen}
          options={{ headerShown: false }}
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
          name="ExerciseDetails"
          component={ExerciseDetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
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
