import { db } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export async function deleteBlog(id: string){
  
    await deleteDoc(doc(db, 'posts',id));

}