// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "scriptedsphere.firebaseapp.com",
  projectId: "scriptedsphere",
  storageBucket: "scriptedsphere.firebasestorage.app",
  messagingSenderId: "315631888258",
  appId: "1:315631888258:web:581e0d230d2981bb4c119b",
  measurementId: "G-Z03F6NJCVL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);