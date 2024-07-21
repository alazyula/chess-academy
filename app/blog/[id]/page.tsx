"use client"
import NavBar from "@/app/ui/Navbar/NavBar";
import PostComponent from "@/app/ui/Blog/PostComponent";
import CommentsList from "@/app/ui/Blog/CommentsList";
import CommentForm from "@/app/ui/Blog/CommentForm";

import useSingleUrlQueryParameter from "@/app/utils/helpers/useSingleUrlQueryParameter";
function PostPage () {
  
  
  const id = useSingleUrlQueryParameter()
  
  return (
    <div className="bg-slate-300 dark:bg-slate-700">

    <NavBar />
   <main className="flex min-h-screen flex-col items-center justify-between text-slate-700 dark:text-slate-200">
   <PostComponent/>
   <CommentForm postId={id as string} />
   <CommentsList postId={id as string} />
      
</main>

</div>
  );
};

export default PostPage;
