import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StartScreen from '../screens/StartScreen';

import { Text } from 'react-native';
const Stack = createStackNavigator();

test('StartScreen renders correctly', () => {
  const { getByText } = render(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={StartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  // Check if the slogan text is displayed
  expect(getByText('TRANSFORMING FITNESS, ONE BUDDY AT A TIME')).toBeDefined();

  // Check if the login and sign up buttons are displayed
  expect(getByText('Login')).toBeDefined();
  expect(getByText('Sign Up')).toBeDefined();
});

test('navigates to login screen when login button is pressed', () => {
  const { getByText } = render(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Login" component={() => <Text>Login Screen</Text>} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  // Simulate a press on the login button
  fireEvent.press(getByText('Login'));

  // Check if the login screen is displayed
  expect(getByText('Login Screen')).toBeDefined();
});

test('navigates to sign up screen when sign up button is pressed', () => {
  const { getByText } = render(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Sign Up" component={() => <Text>Sign Up Screen</Text>} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  // Simulate a press on the sign up button
  fireEvent.press(getByText('Sign Up'));

  // Check if the sign up screen is displayed
  expect(getByText('Sign Up Screen')).toBeDefined();
});
