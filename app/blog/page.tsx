'use client'
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { Post } from '../model/Post';
import BlogList from '../ui/BlogList';
import NavBar from '../ui/NavBar';


const BlogPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const fetchedPosts: Post[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Post));
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  return (

    <div className="bg-slate-300 dark:bg-slate-700">

    <NavBar />
   <main className="flex min-h-screen flex-col items-center justify-between bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
   <BlogList posts={posts} />
      
</main>

</div>


  );
};

export default BlogPage;
