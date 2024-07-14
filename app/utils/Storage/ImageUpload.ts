import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function uploadImage(file: File) {
    const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}