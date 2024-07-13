
import { Post } from "../model/Post";
import Link from "next/link";
interface BlogListProps {
  posts: Post[];
}

const BlogList = ({ posts }: BlogListProps) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
    <Link href={`/blog/${post.id}`}>    <div key={post.id} className="p-4 border rounded shadow">
    <h2 className="text-xl font-bold">{post.title}</h2>
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
    
  </div></Link>
      ))}
    </div>
  );
};

export default BlogList;
