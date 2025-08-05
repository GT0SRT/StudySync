import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase AI imports
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";

// Firebase configuration (replace with environment variables for production use)
const firebaseConfig = {
  apiKey: "AIzaSyBjKU03VhxfJj45E64fwIoDo1QLD78Umec",
  authDomain: "studysync-authentication.firebaseapp.com",
  projectId: "studysync-authentication",
  storageBucket: "studysync-authentication.firebasestorage.app",
  messagingSenderId: "810776784270",
  appId: "1:810776784270:web:636d474cc415da255108df",
  measurementId: "G-SFE1SX2FT5"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Initialize Firebase AI
const ai = getAI(app, { backend: new GoogleAIBackend() });

// Create Generative Model instance
const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });

// Export services for use across the app
export { app, auth, db, analytics, ai, model };