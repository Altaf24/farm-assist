// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJc1DKgQ4AdrW5MHBSm5inUxDkTDhO9fQ",
  authDomain: "farmassist-752b3.firebaseapp.com",
  projectId: "farmassist-752b3",
  storageBucket: "farmassist-752b3.firebasestorage.app",
  messagingSenderId: "603396753173",
  appId: "1:603396753173:web:c65bc8f575b33ab2c80b1c",
  measurementId: "G-1223PDVQJ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
