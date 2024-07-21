"use client"
import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

interface CarouselImage {
  url: string;
  navigateTo: string;
  id: string;
}

const Carousel = () => {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      const imageQuery = query(collection(db, 'carouselImages'), orderBy('createdAt', 'desc'), limit(5));
      const querySnapshot = await getDocs(imageQuery);
      const imageUrls = querySnapshot.docs.map((doc) => ({
        url: doc.data().url,
        navigateTo: doc.data().navigateTo,
        id: doc.id,
      }));
      setImages(imageUrls.reverse());
    };

    fetchImages();
  }, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (images.length === 0) return <>   </>;

  return (
    <div className="relative w-full max-w-screen-lg mx-auto mt-12">
      <div className="overflow-hidden relative h-64 sm:h-80 lg:h-96">
        <a href={images[currentIndex].navigateTo} target="_blank" rel="noopener noreferrer">
          <img
            src={images[currentIndex].url}
            alt={`Carousel Image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </a>
      </div>
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &#8592;
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &#8594;
      </button>
    </div>
  );
};

export default Carousel;
