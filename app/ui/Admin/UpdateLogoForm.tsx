"use client"
import { useState } from 'react';
import { getFirestore, doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/firebase';

const UpdateLogoForm = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      const storageRef = ref(storage, `logos/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      const docRef = doc(getFirestore(), 'settings', 'logo');
      const docSnap = await getDoc(docRef);
     
      if (docSnap.exists()) {
        await updateDoc(docRef, { url: `logos/${file.name}` });
      } else {
        await setDoc(docRef, { url: `logos/${file.name}` });
      }

      alert('Logo Yüklendi!');
      setFile(null);
    } catch (error) {
      console.error('Error updating logo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="logo">Yeni Logo Seçiniz:</label>
        <input type="file" id="logo" accept="image/*" onChange={handleFileChange} required />
      </div>
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Yükle
      </button>
    </form>
  );
};

export default UpdateLogoForm;
