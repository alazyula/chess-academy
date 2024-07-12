"use client"
import NavBar from "@/app/ui/NavBar";
import PostComponent from "@/app/ui/PostComponent";
function PostPage () {
  
  
  return (
    <div className="bg-slate-300 dark:bg-slate-700">

    <NavBar />
   <main className="flex min-h-screen flex-col items-center justify-between bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
   <PostComponent/>
</main>

</div>
  );
};

export default PostPage;
