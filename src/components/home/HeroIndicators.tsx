import React from 'react';
import { cn } from '@/lib/utils';

interface HeroIndicatorsProps {
  slides: Array<{
    id: number;
    accent?: string;
    style?: string;
  }>;
  activeSlide: number;
  onSelectSlide: (index: number) => void;
}

const HeroIndicators: React.FC<HeroIndicatorsProps> = ({ slides, activeSlide, onSelectSlide }) => {
  return (
    <div className="flex justify-center mt-4">
      <div className="flex gap-3 items-center p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-elegant">
        {slides.map((slide, index) => {
          const isActive = activeSlide === index;
          
          // Use the first button design style for all indicators
          const indicatorClasses = cn(
            "transition-all duration-300 cursor-pointer h-3 w-3 rounded-full",
            isActive ? "scale-110 bg-legal-primary" : "opacity-70 hover:opacity-90 bg-gray-300 hover:bg-gray-400"
          );
          
          return (
            <button
              key={index}
              onClick={() => onSelectSlide(index)}
              className={`${indicatorClasses} ${isActive ? "shadow-elegant" : ""}`}
              aria-label={`슬라이드 ${index + 1}로 이동`}
              title={`슬라이드 ${index + 1}`}
            >
              <span className="sr-only">
                {isActive ? "현재 슬라이드" : `슬라이드 ${index + 1}로 이동`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HeroIndicators;
