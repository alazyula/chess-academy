import { Post } from "@/app/model/Post";
import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";


export async function getBlogPostsByTags(tag: String) {
    try {
        console.log(tag)
        const q = query(collection(db, "posts"), where("tags", "array-contains", tag));

        const querySnapshot = await getDocs(q);
          
        
        const postsData: Post[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Post[];
        return postsData;
}    catch {
    console.log("error while fetching posts by tag")
}
}