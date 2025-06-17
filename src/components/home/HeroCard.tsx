
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeroCardProps {
  typingText: string;
}

const HeroCard: React.FC<HeroCardProps> = ({
  typingText
}) => {
  const [typedText, setTypedText] = useState('');
  const isMobile = useIsMobile();

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < typingText.length) {
        setTypedText(current => current + typingText.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setTypedText('');
        }, 5000);
      }
    }, 100);

    return () => {
      clearInterval(typingInterval);
    };
  }, [typedText.length === 0, typingText]);

  return (
    <div className="relative card-3d mt-6 mx-auto md:ml-6 w-full max-w-md">
      {/* Updated border positioning for better mobile display */}
      <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-[calc(100%+1rem)] sm:w-full h-[calc(100%+1rem)] sm:h-full border-2 border-legal-accent rounded-lg"></div>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-premium relative">
        <div className="bg-gray-100 rounded-t-lg p-3 sm:p-4 flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="text-gray-600 text-xs sm:text-sm ml-2">고소장 작성 마법사</div>
        </div>
        <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          <div className="space-y-1 sm:space-y-2">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">사건 유형</label>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              <div className="bg-legal-light border border-gray-300 rounded-full px-2 py-1 text-xs sm:text-sm font-medium text-legal-primary">사기</div>
              <div className="bg-blue-100 border border-blue-300 rounded-full px-2 py-1 text-xs sm:text-sm font-medium text-legal-accent">명예훼손</div>
              <div className="bg-gray-100 border border-gray-300 rounded-full px-2 py-1 text-xs sm:text-sm font-medium text-gray-700">폭행</div>
              <div className="bg-gray-100 border border-gray-300 rounded-full px-2 py-1 text-xs sm:text-sm font-medium text-gray-700">+ 더보기</div>
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">정보 입력</label>
            <Link to="/create-document" className="block h-12 sm:h-16 bg-gray-100 rounded-md border border-gray-300 px-2 sm:px-3 text-xs sm:text-sm text-gray-500 hover:border-legal-accent transition-colors cursor-pointer py-[5px]">
              <div className="flex items-start h-full pt-2">
                <span className="inline-block">{typedText}<span className="animate-pulse">|</span></span>
              </div>
            </Link>
          </div>
          
          <div className="flex justify-between pt-1 sm:pt-2">
            <Button variant="outline" size={isMobile ? "sm" : "default"} className="text-xs sm:text-sm text-gray-600">이전</Button>
            <Link to="/create-document">
              <Button size={isMobile ? "sm" : "default"} className="text-xs sm:text-sm bg-legal-accent hover:bg-legal-primary text-white btn-ripple">
                다음 단계
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
