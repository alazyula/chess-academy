import { db } from "@/firebase";
import { Post } from "@/app/model/Post";
import getAllBlogPosts from "./getAllBlogPosts";
import { getBlogPostsByTags } from "./getBlogPostsByTags";
export default async function getBlogPosts(key: String, tag?: String){
    console.log("debug 1")
    let result: Post[] | undefined
    try {
        switch (key) {
            case "all":
               result = await getAllBlogPosts();
               break;
            case "tag":
               result = await getBlogPostsByTags(tag!);
               break;
    
    
    
        }
    } catch {
        console.log("Error at blogpost handler");
    }
    return result;

}