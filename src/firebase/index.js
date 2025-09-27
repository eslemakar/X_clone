// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCji0ggpTbMfQ8PItEPoktL19ProjppgLQ",
  authDomain: "twitterclone-4d1f6.firebaseapp.com",
  projectId: "twitterclone-4d1f6",
  storageBucket: "twitterclone-4d1f6.firebasestorage.app",
  messagingSenderId: "33339175306",
  appId: "1:33339175306:web:ebab31fad8644221e15873",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//referance
export const auth = getAuth(app);
//google provider setup
export const provider = new GoogleAuthProvider();

//storage servis referans
export const storage = getStorage(app);

//database referans
export const db = getFirestore(app);
