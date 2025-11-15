import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const register = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password);
}


export const login = (email: string, password: string) => {
     signInWithEmailAndPassword(auth, email, password);
}


export const logout = () => signOut(auth);

export const subscribeToAuthChanges = (callback: (user: any) => void) => onAuthStateChanged(auth, callback);

export const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);