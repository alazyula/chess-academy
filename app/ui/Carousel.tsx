'use client'
import { useState } from 'react';
function Carousel  ()  {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      image: 'https://via.placeholder.com/800x400?text=Slide+1',
      title: 'Slide 1',
      description: 'This is the first slide.'
    },
    {
      image: 'https://via.placeholder.com/800x400?text=Slide+2',
      title: 'Slide 2',
      description: 'This is the second slide.'
    },
    {
      image: 'https://via.placeholder.com/800x400?text=Slide+3',
      title: 'Slide 3',
      description: 'This is the third slide.'
    }
  ];

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative max-w-screen-lg mx-auto">
      <div className="overflow-hidden rounded-lg shadow-lg">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full">
              <img src={slide.image} alt={slide.title} className="w-full" />
              <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 p-4 text-white">
                <h3 className="text-lg font-semibold">{slide.title}</h3>
                <p className="text-sm">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
      >
        &larr;
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
      >
        &rarr;
      </button>

      <div className="flex justify-center mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 mx-1 rounded-full ${
              index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
