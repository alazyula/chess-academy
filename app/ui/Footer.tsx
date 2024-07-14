"use client"
import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';

const Footer = () => {
  const [footerData, setFooterData] = useState({
    address: '',
    telephone: '',
    email: ''
  });

  useEffect(() => {
    const fetchFooterData = async () => {
      const docRef = doc(collection(db, 'footer'), 'footerData');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setFooterData(docSnap.data() as { address: string; telephone: string; email: string });
      } else {
        console.log('No such document!');
      }
    };

    fetchFooterData();
  }, []);

  return (
    <footer className="mt-36 pb-20 ">
      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Address</h3>
            <p>{footerData.address}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Telephone</h3>
            <p>{footerData.telephone}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <p>{footerData.email}</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p>&copy; {new Date().getFullYear()} Chess Academy. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
