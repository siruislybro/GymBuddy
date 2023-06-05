import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Button } from 'react-native';

const data = [ // this would ideally come from your data source
  { id: '1', name: 'User 1', score: 100 },
  { id: '2', name: 'User 2', score: 90 },
  { id: '3', name: 'User 3', score: 80 },
  // ... more data
];

const LeaderboardScreen = ({navigation}) => {
    
  function backButtonHandler() {
    navigation.goBack();
  }
  const [selectedTab, setSelectedTab] = React.useState('Friends');

  const renderListItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{item.score}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button
        title='Back to profile'
        onPress={backButtonHandler}
      />      
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={selectedTab === 'Friends' ? styles.tabSelected : styles.tab} 
          onPress={() => setSelectedTab('Friends')}
        >
          <Text style={styles.tabText}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={selectedTab === 'Global' ? styles.tabSelected : styles.tab} 
          onPress={() => setSelectedTab('Global')}
        >
          <Text style={styles.tabText}>Global</Text>
        </TouchableOpacity>
      </View>

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
    padding: 10,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    padding: 10,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabSelected: {
    flex: 1,
    padding: 10,
    backgroundColor: 'darkgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  itemText: {
    fontSize: 16,
  },
});

export default LeaderboardScreen;
