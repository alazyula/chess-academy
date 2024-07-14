"use client"
import  { useState } from 'react';
import { updateHeroContent } from '../utils/Firestore/Hero/updateHeroContent';
import { getHeroContent } from '../utils/Firestore/Hero/getHeroContent';
import { uploadImage } from '../utils/Storage/ImageUpload';
const HeroForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let backgroundImageUrl = '';

    if (file) {
      backgroundImageUrl = await uploadImage(file);
    }

    const content = {
      title,
      description,
      backgroundImageUrl,
    };

    await updateHeroContent(content);
    alert('Hero content updated successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Background Image</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="mt-1 block w-full"
          accept="image/*"
        />
      </div>
      <button
        type="submit"
        className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
      >
        Update
      </button>
    </form>
  );
};

export default HeroForm;
