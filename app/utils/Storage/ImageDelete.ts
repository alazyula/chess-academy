import { storage } from "@/firebase";
import { deleteObject, ref } from "firebase/storage";

export async function ImageDelete(imageUrl: string){
    const imageRef = ref(storage, imageUrl);

    // Delete the file
    await deleteObject(imageRef);
}