import { initializeApp, getApps, getApp } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js';

/**
 * Firebase Konfiguration für das Projekt.
 */
const firebaseConfig = {
  apiKey: "AIzaSyAezbD0KwDYvMXUuxiofqm3XVVUbSClGrE",
  authDomain: "appnest-7b0f0.firebaseapp.com",
  projectId: "appnest-7b0f0",
  storageBucket: "appnest-7b0f0.firebasestorage.app",
  messagingSenderId: "361010357896",
  appId: "1:361010357896:web:85ed21201759d0958a613d",
  measurementId: "G-1CKP0Z1WEB"
};

/**
 * Initialisierung mit direkten gstatic Imports.
 * Dies ist der sicherste Weg, um ESM in der Browser-Umgebung ohne Bundler zu nutzen.
 */
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

/**
 * Exportiere die Firestore-Instanz.
 */
export const db = getFirestore(app);