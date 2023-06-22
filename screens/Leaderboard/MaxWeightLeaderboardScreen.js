import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { db } from '../../firebase';

const MaxWeightLeaderboardDetailsScreen = ({ route, navigation }) => {
    const { exercise } = route.params;
    console.log('Exercise:', exercise); 
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExerciseData();
  }, []);

  const fetchExerciseData = async () => {
    setLoading(true);
    let exerciseData = [];

    const snapshot = await db.collection('leaderboard')
      .where("exercise", "==", exercise)
      .get();
    
    snapshot.forEach((doc) => {
      let data = doc.data();
      exerciseData.push({ 
        id: doc.id, 
        userName: data.userName, 
        maxWeight: data.maxWeight,
        totalReps: data.totalReps,
        totalWeight: data.totalWeight
      });
    });

    // Sort data by maxWeight in descending order
    exerciseData.sort((a, b) => b.maxWeight - a.maxWeight);

    setData(exerciseData);
    setLoading(false);
  };

  const renderListItem = ({ item, index }) => {
    return (
      <View style={styles.listItem}>
        <Text style={styles.rankText}>{index + 1}</Text>
        <Text style={styles.userNameText}>{item.userName}</Text>
        <Text style={styles.itemText}>{item.maxWeight} kg</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Leaderboard for {exercise} by Max Weight</Text>
      <FlatList 
        data={data}
        renderItem={renderListItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f8f8f8',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    listItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      borderRadius: 5,
      backgroundColor: '#fff',
      marginBottom: 10,
    },
    rankText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#888',
    },
    userNameText: {
      fontSize: 16,
      fontWeight: 'bold',
      flex: 1, // take up remaining space
    },
    itemText: {
      fontSize: 16,
    },
    backButton: {
      marginBottom: 20,
    },
    backButtonText: {
      color: '#007BFF',
      fontSize: 18,
    },
  });

export default MaxWeightLeaderboardDetailsScreen;
