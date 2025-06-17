
import React, { useEffect } from 'react';
import HeroWelcome from './HeroWelcome';
import HeroCarousel from './HeroCarousel';
import HeroFeatures from './HeroFeatures';
import HeroCTA from './HeroCTA';
import { heroSlides } from './data/heroSlides';

const Hero: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1
    });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-slate-50 to-blue-50 py-8 md:py-[24px]">
      <div className="container mx-auto px-4">
        <HeroWelcome />
        
        <HeroCarousel slides={heroSlides} />
        
        <HeroCTA />
        
        <HeroFeatures />
      </div>
    </div>
  );
};

export default Hero;
