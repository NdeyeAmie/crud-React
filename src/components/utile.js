// utils.js
import { getDocs, collection, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const addCreatedAtToExistingUsers = async () => {
  const usersCollectionRef = collection(db, "users");
  const snapshot = await getDocs(usersCollectionRef);
  snapshot.forEach(async (document) => {
    const data = document.data();
    if (!data.createdAt) {
      await updateDoc(doc(db, "users", document.id), {
        createdAt: document.createTime,
      });
    }
  });
};
