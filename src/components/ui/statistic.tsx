
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface StatisticProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const Statistic: React.FC<StatisticProps> = ({ 
  value, 
  label, 
  prefix = '', 
  suffix = '', 
  className 
}) => {
  const [counted, setCounted] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startCounting();
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  
  const startCounting = () => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const step = value / (duration / 16); // 16ms is roughly one frame at 60fps
    
    const counter = setInterval(() => {
      start += step;
      if (start >= value) {
        setCounted(value);
        clearInterval(counter);
      } else {
        setCounted(Math.floor(start));
      }
    }, 16);
  };
  
  return (
    <div ref={ref} className={cn("text-center", className)}>
      <div className="text-3xl md:text-4xl font-bold text-legal-primary mb-1 font-montserrat">
        {prefix}{counted.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
};

export { Statistic };
