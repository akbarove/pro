// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD9d25YgLmfK7IH1NYp5PXrNRMtd1Yn-0",
  authDomain: "magazin-project.firebaseapp.com",
  projectId: "magazin-project",
  storageBucket: "magazin-project.appspot.com",
  messagingSenderId: "27970750209",
  appId: "1:27970750209:web:a93a26d738e16354dafd00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);