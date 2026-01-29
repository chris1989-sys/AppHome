import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAezbD0KwDYvMXUuxiofqm3XVVUbSClGrE",
  authDomain: "appnest-7b0f0.firebaseapp.com",
  projectId: "appnest-7b0f0",
  storageBucket: "appnest-7b0f0.firebasestorage.app",
  messagingSenderId: "361010357896",
  appId: "1:361010357896:web:85ed21201759d0958a613d",
  measurementId: "G-1CKP0Z1WEB"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);