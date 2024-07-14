import { db } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export async function deleteComment(id: string){
  
    await deleteDoc(doc(db, 'comments',id));

}