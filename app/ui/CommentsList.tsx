// components/CommentsList.tsx
import { useEffect, useState } from 'react';
import { collection, query, orderBy, where, onSnapshot } from 'firebase/firestore';
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
      console.log("Comments fetched:", commentsData);
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [postId]);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-medium">Yorumlar</h2>
      {comments.length === 0 ? (
        <p>Yorum yok T_T {comments.length}  .</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="mt-2 border-b border-gray-200 pb-2">
              <p className="text-sm font-medium text-gray-900">{comment.author}</p>
              <p className="text-sm text-gray-700">{comment.content}</p>
              <p className="text-xs text-gray-500">
                {new Date(comment.createdAt.toDate()).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentsList;
