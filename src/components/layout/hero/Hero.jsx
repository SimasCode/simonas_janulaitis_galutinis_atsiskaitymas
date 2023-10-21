import { useState } from 'react';
import './hero.scss';
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from 'react-icons/bs';

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      id: 1,
      link: '../images/hero-images/hero-image1.jpg',
      title: 'hero-image1',
    },
    {
      id: 2,
      link: '../images/hero-images/hero-image2.jpg',
      title: 'hero-image2',
    },
    {
      id: 4,
      link: '../images/hero-images/hero-image4.jpg',
      title: 'hero-image4',
    },
  ];

  function goToPreviuos() {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }

  function goToNext() {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }

  return (
    <div className='hero-container'>
      <img
        className='hero-image'
        src={slides[currentIndex].link}
        alt={slides[currentIndex].title}
      />
      <div className='hero-text-container'>
        <h1 className='hero-title'>Find Your Perfect Shop</h1>
        <p className='hero-subtitle'>
          Browse through our diverse range of meticulously selected sellers.
          {/* Designed to bring out your individuality and cater to your sense of
          style. */}
        </p>
      </div>
      <BsFillArrowLeftCircleFill
        size={20}
        className='hero-left-arrow'
        onClick={goToPreviuos}
      />
      <BsFillArrowRightCircleFill
        size={20}
        className='hero-right-arrow'
        onClick={goToNext}
      />
    </div>
  );
}
