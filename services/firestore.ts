import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "./firebaseConfig";

export const addNote= async (userId: string, title: string, content: string) => {
      const ref = collection(db, `users/${userId}/notes`);

      await addDoc(ref, {
        title,
        content,
        createdAt: new Date()
      } )
    // Implementation for adding a note to Firestore
}


export const getNotes = async (userId:string)=>{
     const ref = collection(db, `users/${userId}/notes`);

     const q = query(ref, orderBy('createdAt', 'desc'), );

     const snapshot = await getDocs(q);

     return snapshot.docs.map(doc=>({id: doc.id, ...doc.data()}));
     
}