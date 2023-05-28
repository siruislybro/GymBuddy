import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const QuickStartScreen = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.buttonContainer}>
        <Button
          title="Add Exercises"
          onPress={() => navigation.navigate('AddExercisesScreen')}
        />
      </View>

      <View style={styles.backButton}>
        <Button
          title="Back"
          onPress={handleGoBack}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
});

export default QuickStartScreen;
