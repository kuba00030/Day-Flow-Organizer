import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  getAuth,
} from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXpnRyvhtw9yWevGSTyp6bOOc5I4yaY48",
  authDomain: "todoapp-ec78d.firebaseapp.com",
  projectId: "todoapp-ec78d",
  storageBucket: "todoapp-ec78d.appspot.com",
  messagingSenderId: "1088021294233",
  appId: "1:1088021294233:web:4f449645e7ef32afc79c08",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const twitterProvider = new TwitterAuthProvider();
