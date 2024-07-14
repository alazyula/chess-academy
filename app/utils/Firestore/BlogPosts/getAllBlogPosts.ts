import { db } from "@/firebase";
import { Post } from "@/app/model/Post";
import { collection, getDocs } from "firebase/firestore";

export default async function getAllBlogPosts() {

    try {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const fetchedPosts: Post[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Post));
      return fetchedPosts;
    } 
    catch  {
        console.log("Error During getAllBlogPosts: Failed to fetch data ")
    }
   
    
}