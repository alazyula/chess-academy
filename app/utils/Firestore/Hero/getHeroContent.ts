import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import HeroContent from "@/app/model/HeroContent";

export async function getHeroContent(){
    const docRef = doc(db, "content", "heroContent");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as HeroContent;
    } else {
      return null;
    }
}