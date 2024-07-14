import firebase from "firebase/compat/app";
export interface Post {
    id: string;
    title: string;
    content: string;
    tags: string[];
    createdAt: firebase.firestore.Timestamp;
    rating: number;
  }
  