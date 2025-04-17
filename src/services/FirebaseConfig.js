import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpKukO2i48p-dP5A9uOWqzMdUkXTSKX1U",
  authDomain: "reactjs-project-4881e.firebaseapp.com",
  projectId: "reactjs-project-4881e",
  storageBucket: "reactjs-project-4881e.firebasestorage.app",
  messagingSenderId: "121055757185",
  appId: "1:121055757185:web:dd50f886af74e798239e80",
  measurementId: "G-9EDB07TGGP"
};


 const app = initializeApp(firebaseConfig);

 const db = getFirestore(app);

export { db };
