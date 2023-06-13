const TelegramBot = require('node-telegram-bot-api');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gymbuddy-69-default-rtdb.asia-southeast1.firebasedatabase.app"
  });
  
const db = admin.firestore();

// Initialize Telegram bot
const bot = new TelegramBot('6114234628:AAHu-Us5-oVB1MOW5cvLXz1f3ppKbhrPCVo', {polling: true});

// Listen for any kind of message
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  
  if (msg.text === '/start') {
    // Code to handle start command
    bot.sendMessage(chatId, 'Welcome!');
  } else if (msg.text.startsWith('/getdata')) {
    // Code to get data from Firestore
    const docRef = db.collection('mycollection').doc('mydoc');
    const doc = await docRef.get();
    if (doc.exists) {
      bot.sendMessage(chatId, `Data: ${doc.data()}`);
    } else {
      bot.sendMessage(chatId, 'No such document!');
    }
  } else if (msg.text.startsWith('/updatedata')) {
    // Code to update data in Firestore
    const docRef = db.collection('mycollection').doc('mydoc');
    await docRef.set({myfield: 'new value'});
    bot.sendMessage(chatId, 'Data updated successfully!');
  }
});
