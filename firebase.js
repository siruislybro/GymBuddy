// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwxUYv3phGZQKA_fb4MmZakDdObVD3K1Q",
  authDomain: "gymbuddy-69.firebaseapp.com",
  projectId: "gymbuddy-69",
  storageBucket: "gymbuddy-69.appspot.com",
  messagingSenderId: "98939206257",
  appId: "1:98939206257:web:fda0588f72f5ca117ff9d0",
  measurementId: "G-N9Q44ZPT52"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();  // Initialize Firestore

export { auth, db };  // Export Firestore and Auth instances