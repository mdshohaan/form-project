// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkH6DpihaZPijVmkzPosH1XaJbTO2znK0",
  authDomain: "simple-firebase-78330.firebaseapp.com",
  projectId: "simple-firebase-78330",
  storageBucket: "simple-firebase-78330.firebasestorage.app",
  messagingSenderId: "63882521425",
  appId: "1:63882521425:web:c49b0ac08e2e87aa850170"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth