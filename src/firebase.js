import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDauT9-IIjicemdHU3btIgTmBHhbyn1qyI",
  authDomain: "bookstore-1-a72f8.firebaseapp.com",
  databaseURL: "https://bookstore-1-a72f8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bookstore-1-a72f8",
  storageBucket: "bookstore-1-a72f8.firebasestorage.app",
  messagingSenderId: "150412698172",
  appId: "1:150412698172:web:fa29f47db544142d029939"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
