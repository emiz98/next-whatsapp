import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "next-whatsapp-454a0.appspot.com",
  messagingSenderId: "485207317478",
  appId: "1:485207317478:web:464b9852e094c2a0755427",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

export { db, app };
