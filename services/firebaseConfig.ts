// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import Constants from 'expo-constants';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Prefer values from Expo's runtime config (app.json/app.config.js -> expo.extra).
// Provide a cascade of fallbacks so this module works in multiple setups:
// 1. Constants.expoConfig?.extra (Expo managed)
// 2. process.env (metro/bundler or environment-injected values)
// 3. undefined (will make Firebase initialization fail loudly)
const expoExtra = (Constants.expoConfig && (Constants.expoConfig.extra as Record<string, string>)) || (Constants.manifest && (Constants.manifest.extra as Record<string, string>)) || {};

const getEnv = (key: string) => {
  // check expo extra first
  if (expoExtra && expoExtra[key]) return expoExtra[key];
  // Next check process.env
  if (typeof process !== 'undefined' && (process.env as any)[key]) return (process.env as any)[key];
  // Last-resort: undefined
  return undefined;
};

const firebaseConfig = {
  apiKey: getEnv('FIREBASE_API_KEY'),
  authDomain: getEnv('FIREBASE_AUTH_DOMAIN'),
  projectId: getEnv('FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnv('FIREBASE_APP_ID'),
  measurementId: getEnv('FIREBASE_MEASUREMENT_ID')
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);