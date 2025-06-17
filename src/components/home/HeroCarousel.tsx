import React, { useState, useEffect, useRef } from 'react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import HeroSlide from './HeroSlide';
import HeroIndicators from './HeroIndicators';
import { SlideProps } from './HeroSlide';

interface HeroCarouselProps {
  slides: SlideProps[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const autoSlideIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Reset the auto slide timer when slide changes
  const resetAutoSlideTimer = () => {
    if (autoSlideIntervalRef.current) {
      clearInterval(autoSlideIntervalRef.current);
    }
    autoSlideIntervalRef.current = setInterval(() => {
      setActiveSlide(prev => {
        const nextSlide = (prev + 1) % slides.length;
        api?.scrollTo(nextSlide);
        return nextSlide;
      });
    }, 5000);
  };

  useEffect(() => {
    // Set up auto slide
    resetAutoSlideTimer();

    return () => {
      if (autoSlideIntervalRef.current) {
        clearInterval(autoSlideIntervalRef.current);
      }
    };
  }, [slides.length]);

  // Set up the carousel API connection
  useEffect(() => {
    if (!api) return;
    
    // When the carousel is ready, set up event listeners
    const onSelect = () => {
      const selectedIndex = api.selectedScrollSnap();
      setActiveSlide(selectedIndex);
      resetAutoSlideTimer(); // Reset the timer when slide changes
    };
    
    api.on("select", onSelect);
    
    // Cleanup
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const handleSelectSlide = (index: number) => {
    if (api) {
      api.scrollTo(index);
      setActiveSlide(index);
      resetAutoSlideTimer(); // Reset timer on manual navigation
    }
  };

  return (
    <Carousel 
      className="w-full mx-auto h-[550px]" 
      setApi={setApi}
      opts={{
        loop: true,
        align: "start",
        skipSnaps: false
      }}
    >
      <CarouselContent>
        {slides.map(slide => (
          <CarouselItem key={slide.id} className="w-full h-full">
            <HeroSlide {...slide} isActive={activeSlide === slide.id} />image.png
          </CarouselItem>
        ))}
      </CarouselContent>
      
      <HeroIndicators 
        slides={slides} 
        activeSlide={activeSlide} 
        onSelectSlide={handleSelectSlide} 
      />
    </Carousel>
  );
};

export default HeroCarousel;
