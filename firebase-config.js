// Firebase Configuration and Initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
