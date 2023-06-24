import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import BackButton from '../components/BackButton';

const RecommendedRoutineScreen = ({ route }) => {
  // Extract the recommendedRoutine data from the route parameters
  const { recommendedRoutine } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <BackButton />
      </View>
      <Text style={styles.heading}>Recommended Routine</Text>
      <Text style={styles.routine}>{recommendedRoutine}</Text>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#010202',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: 'white',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#010202',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  routine: {
    color: 'white'
  },
};

export default RecommendedRoutineScreen;