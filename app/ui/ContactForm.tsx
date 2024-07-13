'use client'
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!executeRecaptcha) {
      console.error('Execute recaptcha not yet available');
      return;
    }

   
    
    try {
      const recaptchaToken = await executeRecaptcha('submit');
      const { data } = await axios.post('/api/verify-recaptcha', { token: recaptchaToken });
  
      if (!data.success) {
        alert('reCAPTCHA verification failed');
        return;
      }


      await axios.post('/api/send-email', { name, email, message });
      alert('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
    }
  };

  return (
   <div className='flex flex-col content-center justify-center '>
     <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
      <div className="mb-4 flex flex-col w-500">
        <label htmlFor="form-name">İsim</label>
        <input id="form-name" autoComplete="name" maxLength={50} name="name" onChange={(e) => setName(e.target.value)} className="text-black" />

        <label htmlFor="form-email">Email</label>
        <input id="form-email" required autoComplete="email" maxLength={80} name="email" type="email" onChange={(e) => setEmail(e.target.value)} className="text-black" />

        <label htmlFor="form-message">Mesaj</label>
        <textarea id="form-message" required name="message" rows={5} onChange={(e) => setMessage(e.target.value)} className="text-black" />
      </div>
      <button className="rounded bg-sky-400" type="submit">Gönder</button>
    </form>
   </div>
  );
}
