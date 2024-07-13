import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import axios from 'axios';
import { Timestamp } from 'firebase/firestore';

interface CommentFormProps {
  postId: string;
}

const CommentForm = ({ postId }: CommentFormProps) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !content) return;

    if (!executeRecaptcha) {
        console.error('Execute recaptcha not yet available');
        return;
      }

    try {

        const recaptchaToken = await executeRecaptcha('submit_comment');

        
        const { data } = await axios.post('/api/verify-recaptcha', { token: recaptchaToken });
  
        if (!data.success) {
          alert('reCAPTCHA verification failed');
          return;
        }

        const tempDate = Timestamp.now()
        console.log(tempDate)
      await addDoc(collection(db, 'comments'), {
        postId,
        author,
        content,
        createdAt: tempDate,
      });
      setAuthor('');
      setContent('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
<div className='flex flex-col w-full sm:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto text-center'>
  <form onSubmit={handleSubmit} className="mt-4">
    <div className='text-black dark:text-white'>
      <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-white">
        İsim
      </label>
      <input
        id="author"
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="mt-1 px-2 block w-full lg:w-1/2 mx-auto rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        required
      />
    </div>
    <div className="mt-4">
      <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-white">
        Yorum
      </label>
      <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        className="mt-1 block w-full px-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        required
      />
    </div>
    <button
      type="submit"
      className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      Gönder
    </button>
  </form>
</div>
  );
};

export default CommentForm;
