import { db } from "../FirebaseConfig.js";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc , query , orderBy } from "firebase/firestore";

const usersCollectionRef = collection(db, "users");

export const addUserToFirebase = async (user) => {
  await addDoc(usersCollectionRef, user);
};

export const getAllUsers = async () => {
  const usersCollectionRef = collection(db, "users");
  const q = query(usersCollectionRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const deleteUserFromFirebase = async (id) => {
  await deleteDoc(doc(db, "users", id));
};

export const updateUserInFirebase = async (id, data) => {
  await updateDoc(doc(db, "users", id), data);
};
