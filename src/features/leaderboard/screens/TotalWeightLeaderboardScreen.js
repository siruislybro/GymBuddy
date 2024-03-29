import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { db } from '../../../../firebase';
import BackButton from '../../../components/BackButton';

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
        <Text style={styles.itemText}>{item.totalWeight} kg ({item.maxWeight} kg x {item.totalReps})</Text>
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
        <Text style={styles.backButtonText}>Back</Text>
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#010202',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'black',
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#2e2e2e',
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
        color: '#ccc',
    },
    userNameText: {
        fontSize: 18,
        fontWeight: '600',
        flex: 1,
        color: '#ccc',
        marginLeft: 20,
    },
    itemText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#ccc',
    },
    backButton: {
        marginBottom: 20,
        borderRadius: 5,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#ccc',
        fontSize: 18,
    },
});


export default TotalWeightLeaderboardDetailsScreen;
