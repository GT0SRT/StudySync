// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjKU03VhxfJj45E64fwIoDo1QLD78Umec",
  authDomain: "studysync-authentication.firebaseapp.com",
  projectId: "studysync-authentication",
  storageBucket: "studysync-authentication.firebasestorage.app",
  messagingSenderId: "810776784270",
  appId: "1:810776784270:web:636d474cc415da255108df",
  measurementId: "G-SFE1SX2FT5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;