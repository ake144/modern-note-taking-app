import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebaseConfig";

export type NotePayload = {
  title: string;
  content: string;
  color: string;
  tags: string[];
  isPinned: boolean;
};

export const addNote = async (userId: string, note: NotePayload) => {
  const ref = collection(db, `users/${userId}/notes`);

  await addDoc(ref, {
    title: note.title,
    content: note.content,
    color: note.color,
    tags: note.tags,
    isPinned: note.isPinned,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};






export const getNotes = async (userId:string)=>{
     const ref = collection(db, `users/${userId}/notes`);

     const q = query(ref, orderBy('createdAt', 'desc'), );

     const snapshot = await getDocs(q);

     return snapshot.docs.map(doc=>({id: doc.id, ...doc.data()}));
     
}