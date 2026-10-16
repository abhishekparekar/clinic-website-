// Firebase Integration Module
// Multi-Tenant Firestore & Realtime Database configuration (PRD Section 5 & 11)

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { 
  getDatabase, 
  ref, 
  set, 
  update, 
  get, 
  child, 
  onValue 
} from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX19VWQ81SAB5Hy_gkMyV6Dwx9SZgy6iI",
  authDomain: "job-portal-85414.firebaseapp.com",
  databaseURL: "https://job-portal-85414-default-rtdb.firebaseio.com",
  projectId: "job-portal-85414",
  storageBucket: "job-portal-85414.firebasestorage.app",
  messagingSenderId: "699831995778",
  appId: "1:699831995778:web:5d4248c32e53c7ffd4d39b",
  measurementId: "G-HZ5J7FC9ZW"
};

// Initialize Firebase App safely (singleton pattern)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Cloud Firestore
const db = getFirestore(app);

// Initialize Realtime Database (mirrored support)
const rtdb = getDatabase(app);

// Initialize Analytics (guarded for SSR / browser compatibility)
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch((err) => {
    console.debug('Firebase analytics not supported in this environment:', err);
  });
}

export { 
  app, 
  db, 
  rtdb,
  analytics, 
  firebaseConfig,
  // Firestore helpers
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy,
  serverTimestamp,
  // RTDB helpers
  ref, 
  set, 
  update, 
  get, 
  child, 
  onValue 
};
