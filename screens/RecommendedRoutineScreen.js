import React from 'react';
import { View, Text } from 'react-native';

const RecommendedRoutineScreen = ({ route }) => {
  // Extract the recommendedRoutine data from the route parameters
  const { recommendedRoutine } = route.params;

  return (
    <View>
      <Text style={styles.heading}>Recommended Routine</Text>
      <Text>{recommendedRoutine}</Text>
    </View>
  );
};

const styles = {
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
};

export default RecommendedRoutineScreen;