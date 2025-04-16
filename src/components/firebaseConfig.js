// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpKukO2i48p-dP5A9uOWqzMdUkXTSKX1U",
  authDomain: "reactjs-project-4881e.firebaseapp.com",
  projectId: "reactjs-project-4881e",
  storageBucket: "reactjs-project-4881e.firebasestorage.app",
  messagingSenderId: "121055757185",
  appId: "1:121055757185:web:dd50f886af74e798239e80",
  measurementId: "G-9EDB07TGGP"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);

 const db = getFirestore(app);

export { db };
