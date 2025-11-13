// Firebase Configuration and Initialization
// This file must be loaded AFTER Firebase CDN scripts in HTML

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAI0UCLziSQonLQFB1qG1dhpKnd_QO59mU",
  authDomain: "online-cources-7614b.firebaseapp.com",
  projectId: "online-cources-7614b",
  storageBucket: "online-cources-7614b.firebasestorage.app",
  messagingSenderId: "1027672499611",
  appId: "1:1027672499611:web:5fc1e6ce2cc355fb96ad3e",
  measurementId: "G-TM8CW64CXQ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const auth = firebase.auth();
const db = firebase.firestore();
const analytics = firebase.analytics();
