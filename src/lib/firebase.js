// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxjQMXDg7VQlzHSt-IfRGiGb1H7zyjbI0",
  authDomain: "zespolowy-20271.firebaseapp.com",
  projectId: "zespolowy-20271",
  storageBucket: "zespolowy-20271.appspot.com",
  messagingSenderId: "323248195784",
  appId: "1:323248195784:web:c621aaad65c522cbc6bdfd",
  measurementId: "G-9HB3TPNZ8P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

const analytics = getAnalytics(app);