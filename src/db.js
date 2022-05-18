// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7nKcr85yKpoEtWKFjdnZP25RsdyorW8Y",
  authDomain: "snowvb-fd520.firebaseapp.com",
  projectId: "snowvb-fd520",
  storageBucket: "snowvb-fd520.appspot.com",
  messagingSenderId: "890029439601",
  appId: "1:890029439601:web:c5a97fef3e3c667d9cf9d0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db };
