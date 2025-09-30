// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// إعدادات مشروعك
const firebaseConfig = {
  apiKey: "AIzaSyDxeKXEAlIQP_ZiHyoMtb0JdIVBhimTht0",
  authDomain: "car-scan-366a1.firebaseapp.com",
  projectId: "car-scan-366a1",
  storageBucket: "car-scan-366a1.firebasestorage.app",
  messagingSenderId: "1063250802291",
  appId: "1:1063250802291:web:a2e5a9d9a71d1835049c06",
  measurementId: "G-6R5JZ9RMEJ"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);