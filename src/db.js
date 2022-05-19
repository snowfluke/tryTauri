// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import ENV from "./env.json";

const firebaseConfig = {
  apiKey: ENV.DB_APIKEY,
  authDomain: ENV.DB_AUTHDOMAIN,
  projectId: ENV.DB_PROJECTID,
  storageBucket: ENV.DB_STORAGEBUCKET,
  messagingSenderId: ENV.DB_MESSAGINGSENDERID,
  appId: ENV.DB_APPID,
};

initializeApp(firebaseConfig);
const db = getFirestore();

export { db };
