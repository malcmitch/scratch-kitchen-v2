import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD27dUdkwmUnTdkrtw-5R2hIpYUIWqOQmw",
  authDomain: "scratch-kitchen-tx.firebaseapp.com",
  projectId: "scratch-kitchen-tx",
  storageBucket: "scratch-kitchen-tx.firebasestorage.app",
  messagingSenderId: "114020985200",
  appId: "1:114020985200:web:f00397e381e79533c9c7b5"
};

// Initialize Firebase gracefully for Next.js SSR
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
