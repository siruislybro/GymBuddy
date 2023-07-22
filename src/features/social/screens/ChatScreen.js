import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { db, auth } from '../../../../firebase';
import firebase from 'firebase/compat';

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { otherUserId: userId } = route.params;

  useEffect(() => {
    const unsubscribe = db.collection('messages')
      .where('senderId', 'in', [auth.currentUser.uid, userId])
      .where('receiverId', 'in', [auth.currentUser.uid, userId])
      .orderBy('timestamp', 'desc')
      .onSnapshot(querySnapshot => {
        const messagesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messagesData);
      });

    return () => unsubscribe();
  }, [userId]);

  const handleSend = () => {
    db.collection('messages').add({
      senderId: auth.currentUser.uid,
      receiverId: userId,
      message: newMessage,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
    // Add new message notification
    const notificationsRef = db.collection('users').doc(userId).collection('notifications');
    notificationsRef.add({
      type: 'newMessage',
      senderId: auth.currentUser.uid,
      message: newMessage,
      isNew: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
      setNewMessage('');
    })
    .catch((error) => {
      console.error("Error sending message: ", error);
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        inverted
        data={messages}
        renderItem={({ item }) => (
          <View style={[
            styles.messageContainer, 
            item.senderId === auth.currentUser.uid ? styles.rightMessage : styles.leftMessage
          ]}>
            <Text>{item.message}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message"
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    maxWidth: '80%',
    borderRadius: 20,
  },
  rightMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0f93fe',
  },
  leftMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e5e5',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
});

export default ChatScreen;
