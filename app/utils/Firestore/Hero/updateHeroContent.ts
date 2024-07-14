import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import HeroContent from "@/app/model/HeroContent";

export async function updateHeroContent(content: HeroContent){
    const docRef = doc(db, "content", "heroContent");
    await setDoc(docRef, content);

}