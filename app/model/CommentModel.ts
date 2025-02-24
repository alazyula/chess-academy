import firebase from "firebase/compat/app";

export type CommentModel = {
    id: string;
    postId: string;
    author: string;
    content: string;
    createdAt: firebase.firestore.Timestamp;
    rating: number;
  }