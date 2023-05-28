// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVlzZObiQrpb20kinpZm_q7fE2s6dUCmU",
  authDomain: "gymbuddyyy.firebaseapp.com",
  projectId: "gymbuddyyy",
  storageBucket: "gymbuddyyy.appspot.com",
  messagingSenderId: "153881931144",
  appId: "1:153881931144:web:63d356f2f4768aac911e3d",
  measurementId: "G-STC1F4H9XC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
// const analytics = firebase.analytics();

export { auth };