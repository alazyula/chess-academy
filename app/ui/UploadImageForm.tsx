'use client';

import { useState } from 'react';
import { db, storage } from '@/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, deleteDoc, query, orderBy, limit, getDocs, doc } from 'firebase/firestore';

const UploadImageForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !url) {
      alert('Lütfen Dosya ve link girin!');
      return;
    }

    setUploading(true);
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
       
      },
      (error) => {
        console.error(error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        const imageQuery = query(collection(db, 'carouselImages'), orderBy('createdAt', 'asc'));
        const querySnapshot = await getDocs(imageQuery);

        if (querySnapshot.docs.length >= 5) {
          const oldestImageDoc = querySnapshot.docs[0];
          await deleteDoc(doc(db, 'carouselImages', oldestImageDoc.id));
        }

        await addDoc(collection(db, 'carouselImages'), {
          url: downloadURL,
          navigateTo: url,
          createdAt: new Date().toISOString(),
        });

        setFile(null);
        setUrl('');
        setUploading(false);
        alert('Resim Yüklendi');
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium">Görsel Seçin</label>
        <input type="file" onChange={handleFileChange} className="mt-1 block w-full" />
      </div>
      <div>
        <label className="block text-sm font-medium ">URL seçin</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
        disabled={uploading}
      >
        {uploading ? 'Yükleniyor' : 'Yükle'}
      </button>
    </form>
  );
};

export default UploadImageForm;
