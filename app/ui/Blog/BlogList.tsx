import { useState } from 'react';
import Link from 'next/link';
import { Post } from '@/app/model/Post';
import { useSession } from 'next-auth/react';
import { deleteBlog } from '@/app/utils/Firestore/BlogPosts/deleteBlog';

interface BlogListProps {
  posts: Post[];
}

const BlogList = ({ posts }: BlogListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const { data: session, status } = useSession();
  console.log(session)
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = posts.filter(post => post.title.toLowerCase().includes(query));
    setFilteredPosts(filtered);
  };

  
  const postsToRender = searchQuery ? filteredPosts : posts;

  return (
    <div className="container text-center mx-auto">
      <input
        type="text"
        placeholder="Başlık ile Ara"
        value={searchQuery}
        onChange={handleSearch}
        className=" mx-auto mt-5 text-center px-4 py-2 border border-gray-300 w-1/2 rounded-md shadow-sm mb-4"
      />
      {postsToRender.length === 0 ? (
        <p>Yazı Bulunamadı.</p>
      ) : (
        <div className="space-y-4 mt-12">
          {postsToRender.map(post => (
            <div key={post.id} className="p-4 border rounded shadow">
              <Link href={`/blog/${post.id}`}>
                <h2 className="text-xl font-bold cursor-pointer">{post.title}</h2>
              </Link>
              
              {session ?(
                  <button onClick={()=>{deleteBlog(post.id)}}> Sil</button>

              ): (<>
              </>)}


              <div className="mt-2 space-x-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                  >   
                  <Link href={`/blog/search/${tag}`}>  {tag}</Link>
                   
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
