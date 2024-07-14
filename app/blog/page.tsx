'use client'
import { useEffect, useState } from 'react';
import { Post } from '../model/Post';
import BlogList from '../ui/BlogList';
import NavBar from '../ui/NavBar';
import getBlogPosts from '../utils/Firestore/BlogPosts/getBlogPosts';


const BlogPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts: Post[] = await getBlogPosts("all") as Post[];
        setPosts(fetchedPosts);
      }
      catch {
        console.log(" Error While Fetching posts");
      }

     
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
