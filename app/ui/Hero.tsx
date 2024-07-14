"use client"
import React, { useEffect, useState } from 'react';
import { getHeroContent } from '../utils/Firestore/Hero/getHeroContent';

const Hero = () => {
  const [content, setContent] = useState({
    title: '',
    description: '',
    backgroundImageUrl: ''
  });

  useEffect(() => {
    async function getContent() {
      const heroContent = await getHeroContent();
      if (heroContent) {
        setContent(heroContent);
        console.log(content)
      }
    }

    getContent();
  }, []);

  return (
    <div className="relative mt-12 flex flex-col h-screen bg-cover bg-center rounded" >
      <div className="absolute inset-0 bg-black opacity-25"></div>
      <div className="relative z-10 max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
          {content.title}
        </h1>
        <p className="mt-6 text-xl max-w-3xl mx-auto">
          {content.description}
        </p>
      </div>
    </div>
  );
};

export default Hero;
