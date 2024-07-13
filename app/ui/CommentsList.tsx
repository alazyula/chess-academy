// components/CommentsList.tsx
import { useEffect, useState } from 'react';
import { collection, query, orderBy, where, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import { CommentModel } from '../model/CommentModel';

interface CommentsListProps {
  postId: string;
}

const CommentsList = ({ postId }: CommentsListProps) => {
  const [comments, setComments] = useState<CommentModel[]>([]);

  useEffect(() => {
    if (!postId) return;

    const q = query(
      collection(db, 'comments'),
      where('postId', '==', postId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const commentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
      })) as unknown as CommentModel[];
        commentsData.map((comment)=> {
            comment.createdAt = comment.createdAt as Timestamp
           
        })
      console.log("Comments fetched:", commentsData);
     
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [postId]);

  return (
    <div className="mt-8 p-6  shadow rounded-lg  dark:text-gray-300 w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
    <h2 className="text-xl text-center font-semibold mb-4">Yorumlar</h2>
    {comments.length === 0 ? (
      <p className="text-gray-600 dark:text-gray-400">No comments yet.</p>
    ) : (
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="p-4 bg-gray-50 rounded-lg shadow-sm dark:bg-gray-700">
            <p className="text-lg font-medium text-gray-900 dark:text-white">{comment.author}</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{comment.content}</p>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {(comment.createdAt as Timestamp).toDate().toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    )}
  </div>
  );
};

export default CommentsList;
