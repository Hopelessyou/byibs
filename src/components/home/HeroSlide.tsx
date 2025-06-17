
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, FileText } from 'lucide-react';
import SlideContent from './SlideContent';
import SlideVisual from './SlideVisual';

export interface SlideProps {
  id: number;
  title: React.ReactNode;
  description: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  isActive?: boolean;
  style?: 'default' | 'premium' | 'process' | 'expert' | 'security' | 'mobile';
  gradient?: string;
  accent?: string;
  cardStyle?: string;
  investmentAmount?: string;
  specialFeature?: string;
  steps?: Array<{step: number; title: string; icon: React.ReactNode}>;
  ctaText?: string;
}

const HeroSlide: React.FC<SlideProps> = ({
  id,
  title,
  description,
  label,
  icon,
  color,
  style = 'default',
  gradient,
  accent,
  cardStyle,
  investmentAmount,
  specialFeature,
  steps,
  ctaText,
  isActive
}) => {
  const typingText = '입력하신 인적사항 및 사건내용을 토대로 변호사가 소장을 작성해드립니다...';
  const isPremium = style === 'premium';
  
  return (
    <div className={cn(
      "flex flex-col md:flex-row items-center", 
      (isPremium || style !== 'default') && "relative overflow-hidden"
    )}>
      {isPremium && (
        <div className="absolute top-0 right-0 bg-gradient-to-bl from-yellow-300 to-transparent text-yellow-800 px-4 py-1 font-bold transform rotate-45 translate-x-8 translate-y-3 shadow-md">
          프리미엄
        </div>
      )}
      
      <SlideContent 
        title={title}
        description={description}
        label={label}
        icon={icon}
        color={color}
        isPremium={isPremium}
        accent={accent}
        style={style}
        ctaText={ctaText}
      />
      
      <SlideVisual 
        typingText={typingText}
        isPremium={isPremium}
        gradient={gradient}
        cardStyle={cardStyle}
        icon={icon}
        investmentAmount={investmentAmount}
        specialFeature={specialFeature}
        accent={accent}
        style={style}
        steps={steps}
        slideId={id}
      />
    </div>
  );
};

export default HeroSlide;
