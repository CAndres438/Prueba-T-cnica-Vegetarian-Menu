import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAGPoNV5y58XA1XDGhUfTWl-1i-ERO_HU",
  authDomain: "vegetarian-menu-1.firebaseapp.com",
  projectId: "vegetarian-menu-1",
  storageBucket: "vegetarian-menu-1.appspot.com",
  messagingSenderId: "262409738536",
  appId: "1:262409738536:web:6bef706370e9a850d5581d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const google = new GoogleAuthProvider();
const facebook = new FacebookAuthProvider();
const db = getFirestore();

export { app, google, facebook, db };
