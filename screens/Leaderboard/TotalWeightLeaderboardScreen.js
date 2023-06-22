import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { db } from '../../firebase';

const TotalWeightLeaderboardDetailsScreen = ({ route, navigation }) => {
  const { exercise } = route.params;
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

    // Sort data by totalWeight in descending order
    exerciseData.sort((a, b) => b.totalWeight - a.totalWeight);

    setData(exerciseData);
    setLoading(false);
  };

  const renderListItem = ({ item, index }) => {
    return (
      <View style={styles.listItem}>
        <Text style={styles.rankText}>{index + 1}</Text>
        <Text style={styles.userNameText}>{item.userName}</Text>
        <Text style={styles.itemText}>{item.totalWeight} kg</Text>
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
      <Text style={styles.title}>Leaderboard for {exercise} by Total Weight</Text>
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
      textAlign: 'center',
      color: '#333',
    },
    listItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      borderRadius: 10,
      backgroundColor: '#fff',
      marginBottom: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    rankText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#777',
    },
    userNameText: {
      fontSize: 18,
      fontWeight: '600',
      flex: 1, // take up remaining space
      color: '#333',
      marginLeft: 20,
    },
    itemText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#333',
    },
    backButton: {
      marginBottom: 20,
      backgroundColor: '#007BFF',
      borderRadius: 5,
      padding: 10,
      alignItems: 'center',
    },
    backButtonText: {
      color: '#FFF',
      fontSize: 18,
    },
  });

export default TotalWeightLeaderboardDetailsScreen;
