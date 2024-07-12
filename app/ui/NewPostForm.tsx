'use client'
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase';

const NewPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPost = {
      title,
      content,
      tags,
      createdAt: new Date().toISOString(),
    };
    await addDoc(collection(db, 'posts'), newPost);
    setTitle('');
    setContent('');
    setTags([]);
    setTagInput('');
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  return (
   <div className='flex flex-col text-center justify-center bg-slate-300 dark:bg-slate-700 w-1/2  '>
     <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tags</label>
        <div className="flex items-center">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          <button
            type="button"
            onClick={addTag}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Tag
          </button>
        </div>
        <div className="mt-2 space-x-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
   </div>
  );
};

export default NewPostForm;
