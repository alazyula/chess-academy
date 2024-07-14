"use client"
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { Post } from '@/app/model/Post';
import useSingleUrlQueryParameter from '../utils/helpers/useSingleUrlQueryParameter';

function PostComponent () {
  
  const id = useSingleUrlQueryParameter()
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id || typeof id !== 'string') {
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost(docSnap.data() as Post);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="p-4  mt-12 container flex flex-col space-y-10 text-center justify-center bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p>{post.content}</p>
      <div className="mt-2 space-x-2">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
          >
            {tag}
          </span>
        ))}
      </div>
     
    </div>
  );
};

export default PostComponent;
