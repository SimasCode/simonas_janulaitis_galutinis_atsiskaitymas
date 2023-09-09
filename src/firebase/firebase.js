import { initializeApp } from 'firebase/app';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_authDomain,
  projectId: import.meta.env.VITE_FIREBASE_projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_appId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();

export const facebookProvider = new FacebookAuthProvider();
