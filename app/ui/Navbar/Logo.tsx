import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';


const Logo = () => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const docRef = doc(getFirestore(), 'settings', 'logo');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const logoPath = docSnap.data().url;
          const logoRef = ref(getStorage(), logoPath);
          const url = await getDownloadURL(logoRef);
          setLogoUrl(url);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching logo:', error);
      }
    };

    fetchLogo();
  }, []);

  if (!logoUrl) {
    return <p>Loading...</p>;
  }

  return <img src={logoUrl} alt="Logo" className="h-8 w-auto" />;
};

export default Logo;
