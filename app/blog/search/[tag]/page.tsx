'use client'
import { useEffect, useState } from 'react';
import { Post } from '@/app/model/Post';
import BlogList from '@/app/ui/Blog/BlogList';
import NavBar from '@/app/ui/Navbar/NavBar';
import { getBlogPostsByTags } from '@/app/utils/Firestore/BlogPosts/getBlogPostsByTags';
import useSingleUrlQueryParameter from '@/app/utils/helpers/useSingleUrlQueryParameter';


const BlogPageTagSearch = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  
  let id = useSingleUrlQueryParameter()
  let tag = decodeURIComponent(id as string);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts: Post[] = await getBlogPostsByTags(tag!) as Post[];
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

export default BlogPageTagSearch;
