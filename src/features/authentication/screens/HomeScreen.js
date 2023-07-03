import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { db } from '../../../../firebase';
import UserContext from '../../../components/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../../colours/colors';

const HomeScreen = ({ navigation, route }) => {
  const { user } = useContext(UserContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await db.collection('users').get();
      const usersData = querySnapshot.docs.map((doc) => doc.data().username);
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(filterUsers(query));
  }, [query]);

  const filterUsers = (query) => {
    if (query === '') {
      return [];
    }

    const lowerCaseQuery = query.toLowerCase();

    return users.filter((user) => user.toLowerCase().includes(lowerCaseQuery));
  };

  const navigateToUserProfile = (username) => {
    navigation.navigate('UserProfile', { username });
    setModalVisible(false);
  };

  const renderUserItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigateToUserProfile(item)}
        style={styles.autocompleteItem}>
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Home</Text>
        <TouchableOpacity
          style={styles.searchIcon}
          onPress={() => setModalVisible(true)}>
          <Icon name="search" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              value={query}
              onChangeText={(text) => setQuery(text)}
              placeholder="Search for a user"
            />
            <FlatList
              data={filteredUsers}
              renderItem={renderUserItem}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  welcomeText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchIcon: {
    padding: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  autocompleteItem: {
    backgroundColor: 'lightgray',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
});

export default HomeScreen;
