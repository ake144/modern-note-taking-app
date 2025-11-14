// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import Constants from 'expo-constants';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// AsyncStorage persistence for React Native auth state
// We'll require AsyncStorage and the react-native persistence helper at runtime
// so builds that don't have the native async-storage package won't fail at
// type-check time. If you want static typing, install
// @react-native-async-storage/async-storage and the types for it.
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


console.log('Firebase config:', {
  apiKey: getEnv('FIREBASE_API_KEY'),
  authDomain: getEnv('FIREBASE_AUTH_DOMAIN'),
  projectId: getEnv('FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnv('FIREBASE_APP_ID'),
  measurementId: getEnv('FIREBASE_MEASUREMENT_ID')
});

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

// Initialize Auth with React Native AsyncStorage persistence so auth state
// persists across app restarts. If the native async-storage package is not
// installed, this will fail at runtime — install it with:
// npm install @react-native-async-storage/async-storage
// Try to wire up persistent storage for auth state on React Native. If the
// optional package isn't installed or the helper isn't available, fall back
// to default memory persistence (auth state won't persist between sessions).
let auth: Auth;
try {
  // Dynamically require the native async-storage package and the helper
  // from the firebase auth react-native entry so TypeScript doesn't fail
  // when the optional dependency isn't present during static checks.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // const AsyncStorage = require('@react-native-async-storage/async-storage').default;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // const { getReactNativePersistence } = require('firebase/auth/react-native');

  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  // Optional dependency missing or not supported in this environment.
  // Fall back to plain initializeAuth (memory persistence).
  // eslint-disable-next-line no-console
  console.warn('AsyncStorage persistence for Firebase Auth not available, falling back to memory persistence.');
  auth = initializeAuth(app);
}

export { auth };
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);