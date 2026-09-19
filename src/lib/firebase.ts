import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// REPLACE THIS with your actual Firebase project config from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyD7MUYscTyrslalyKLU89_Misb5zHmZ_iM",
  authDomain: "aura-a8aca.firebaseapp.com",
  projectId: "aura-a8aca",
  storageBucket: "aura-a8aca.firebasestorage.app",
  messagingSenderId: "578793068816",
  appId: "1:578793068816:web:87e3e72c4e06c5d0612d95",
  measurementId: "G-F6ST6MD9TX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


export { db };
