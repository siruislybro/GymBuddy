import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Button, SafeAreaView } from 'react-native';
import { db } from '../../firebase';

const LeaderboardScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = React.useState('Global');

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    setLoading(true);
    let leaderboardData = [];

    const snapshot = await db.collection('leaderboard').get();
    snapshot.forEach((doc) => {
      let data = doc.data();
      leaderboardData.push({
        id: doc.id,
        userName: data.userName,
        exercise: data.exercise,
        maxWeight: data.maxWeight,
        totalReps: data.totalReps,
        totalWeight: data.totalWeight
      });
    });

    setData(leaderboardData);
    setLoading(false);
  };

  function backButtonHandler() {
    navigation.goBack();
  }

  const handleExerciseSelectMaxWeight = (item) => {
    navigation.navigate('MaxWeightDetails', { exercise: item.exercise });
  };
  

  const handleExerciseSelectTotalWeight = (item) => {
    navigation.navigate('TotalWeightDetails', { exercise: item.exercise });
  };
  

  const handleExerciseSelect = (item) => {
    navigation.navigate('TotalWeightDetails', { item });
  };


  const renderContent = () => {
    switch (selectedTab) {
      case 'Friends':
        return <Text style={styles.noFriendsText}>You don't have any friends yet.</Text>
      case 'Global':
        return (
          <>
            <Text style={styles.sectionHeader}>Max Weight</Text>
            <View>
              {data.map((item) => renderListItemMaxWeight(item))}
            </View>

            <Text style={styles.sectionHeader}>Total Weight Lifted</Text>
            <View>
              {data.map((item) => renderListItemTotalWeight(item))}
            </View>
          </>
        );
    }
  }

  const renderListItemMaxWeight = (item) => (
    <TouchableOpacity key={item.id + 'max'} onPress={() => handleExerciseSelectMaxWeight(item)}>
      <View style={styles.listItem}>
        <Text style={styles.userName}>{item.userName}</Text>
        <Text style={styles.exercise}>{item.exercise}</Text>
        <Text style={styles.itemText}>{item.maxWeight} kg</Text>
      </View>
    </TouchableOpacity>
  );

  const renderListItemTotalWeight = (item) => (
    <TouchableOpacity key={item.id + 'total'} onPress={() => handleExerciseSelectTotalWeight(item)}>
      <View style={styles.listItem}>
        <Text style={styles.userName}>{item.userName}</Text>
        <Text style={styles.exercise}>{item.exercise}</Text>
        <Text style={styles.itemText}>{item.totalWeight} kg</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Button title='Back to profile' onPress={backButtonHandler} />

        <View style={styles.tabs}>
          <TouchableOpacity style={selectedTab === 'Friends' ? styles.tabSelected : styles.tab} onPress={() => setSelectedTab('Friends')}>
            <Text style={styles.tabText}>Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={selectedTab === 'Global' ? styles.tabSelected : styles.tab} onPress={() => setSelectedTab('Global')}>
            <Text style={styles.tabText}>Global</Text>
          </TouchableOpacity>
        </View>

        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  loading: {
    marginTop: 50,
    fontSize: 20,
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3',
  },
  tab: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
  },
  tabSelected: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87CEFA',
    borderColor: '#87CEFA',
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  exercise: {
    fontSize: 14,
    color: '#666666',
  },
  itemText: {
    fontSize: 14,
    color: '#333333',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
    color: '#333333',
  },
});

export default LeaderboardScreen;
