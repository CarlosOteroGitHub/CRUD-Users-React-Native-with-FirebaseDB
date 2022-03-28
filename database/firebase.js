// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARZXTeuYAj_N9jX-pp_eBI1b70uwY9DVY",
  authDomain: "react-native-project-1b5e0.firebaseapp.com",
  projectId: "react-native-project-1b5e0",
  storageBucket: "react-native-project-1b5e0.appspot.com",
  messagingSenderId: "23254206145",
  appId: "1:23254206145:web:a6735a9b5167822ffcf640"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;