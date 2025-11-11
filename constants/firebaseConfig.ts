// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAA59hOX40JhPSyCK0chUeufUGwbgRaQaY",
  authDomain: "note-taking-e52de.firebaseapp.com",
  projectId: "note-taking-e52de",
  storageBucket: "note-taking-e52de.firebasestorage.app",
  messagingSenderId: "942529436971",
  appId: "1:942529436971:web:9da6fc124e1b5182f0b96e",
  measurementId: "G-3B9PC5C59T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);