// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwxUYv3phGZQKA_fb4MmZakDdObVD3K1Q",
  authDomain: "gymbuddy-69.firebaseapp.com",
  databaseURL: "https://gymbuddy-69-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gymbuddy-69",
  storageBucket: "gymbuddy-69.appspot.com",
  messagingSenderId: "98939206257",
  appId: "1:98939206257:web:fda0588f72f5ca117ff9d0",
  measurementId: "G-N9Q44ZPT52"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = firebase.auth();

export {auth};

