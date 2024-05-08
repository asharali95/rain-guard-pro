// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyA0C28RQIODOpMzomOtbxoJqznFgfVgmBY",
  // authDomain: "rain-guard-pro.firebaseapp.com",
  // projectId: "rain-guard-pro",
  // storageBucket: "rain-guard-pro.appspot.com",
  // messagingSenderId: "225558070649",
  // appId: "1:225558070649:web:53a66610cd65757906dba8"
  apiKey: "AIzaSyAhOIQqsDjEGhr19tr9bi9u22mm39Lm9-0",
  authDomain: "rain-guard-pro-adcd2.firebaseapp.com",
  projectId: "rain-guard-pro-adcd2",
  storageBucket: "rain-guard-pro-adcd2.appspot.com",
  messagingSenderId: "296514938822",
  appId: "1:296514938822:web:7f118259874438d583f4c7"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
