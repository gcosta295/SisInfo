// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSw16qzbdZjPI9daQYIljW87d7-BfRobM",
  authDomain: "sisinfo-45bc9.firebaseapp.com",
  projectId: "sisinfo-45bc9",
  storageBucket: "sisinfo-45bc9.firebasestorage.app",
  messagingSenderId: "33590513765",
  appId: "1:33590513765:web:d0c65344acc7d89332768c",
  measurementId: "G-J8Z9ZKE05K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export { db };
const analytics = getAnalytics(app);