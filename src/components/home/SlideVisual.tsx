
import React from 'react';
import { cn } from '@/lib/utils';
import { PremiumCard } from '@/components/ui/premium-card';
import HeroCard from './HeroCard';
import PremiumCardContent from './cards/PremiumCardContent';
import { useIsMobile } from '@/hooks/use-mobile';
import { Shield, Smartphone, Scale, ArrowRight } from 'lucide-react';
import ProcessSteps from './cards/ProcessSteps';
import ExpertReview from './cards/ExpertReview';
import SecurityFeature from './cards/SecurityFeature';
import MobileAccess from './cards/MobileAccess';

interface SlideVisualProps {
  typingText: string;
  isPremium: boolean;
  gradient?: string;
  cardStyle?: string;
  icon?: React.ReactNode;
  investmentAmount?: string;
  specialFeature?: string;
  accent?: string;
  style?: 'default' | 'premium' | 'process' | 'expert' | 'security' | 'mobile';
  steps?: Array<{step: number; title: string; icon: React.ReactNode}>;
  slideId?: number;
}

const SlideVisual: React.FC<SlideVisualProps> = ({
  typingText,
  isPremium,
  gradient,
  cardStyle,
  icon,
  investmentAmount,
  specialFeature,
  accent,
  style = 'default',
  steps,
  slideId = 0
}) => {
  const isMobile = useIsMobile();

  if (style === 'default') {
    return (
      <div className="md:w-1/2 w-full mt-6 md:mt-0 reveal px-3 sm:px-0">
        <HeroCard typingText={typingText} />
      </div>
    );
  }

  if (style === 'premium') {
    return (
      <div className={cn(
        "md:w-1/2 w-full mt-6 md:mt-0 reveal px-3 sm:px-0",
        isPremium && gradient
      )}>
        <PremiumCard 
          bordered 
          elevated 
          glossy
          className={cn("mt-6 mx-auto md:ml-6 p-4", gradient)}
        >
          <PremiumCardContent 
            cardStyle={cardStyle || 'default'}
            icon={icon}
            investmentAmount={investmentAmount}
            specialFeature={specialFeature}
            accent={accent}
          />
        </PremiumCard>
      </div>
    );
  }

  if (style === 'process') {
    return (
      <div className="md:w-1/2 w-full mt-6 md:mt-0 reveal px-3 sm:px-0">
        <div className="bg-white p-6 rounded-lg shadow-elegant card-3d">
          <ProcessSteps steps={steps || []} />
        </div>
      </div>
    );
  }

  if (style === 'expert') {
    return (
      <div className="md:w-1/2 w-full mt-6 md:mt-0 reveal px-3 sm:px-0">
        <div className="bg-white p-6 rounded-lg shadow-elegant card-3d">
          <ExpertReview />
        </div>
      </div>
    );
  }

  if (style === 'security') {
    return (
      <div className="md:w-1/2 w-full mt-6 md:mt-0 reveal px-3 sm:px-0">
        <div className="bg-blue-50 p-6 rounded-lg shadow-elegant card-3d">
          <SecurityFeature />
        </div>
      </div>
    );
  }

  if (style === 'mobile') {
    return (
      <div className="md:w-1/2 w-full mt-6 md:mt-0 reveal px-3 sm:px-0">
        <div className="bg-white p-6 rounded-lg shadow-elegant card-3d">
          <MobileAccess />
        </div>
      </div>
    );
  }

  return (
    <div className="md:w-1/2 w-full mt-6 md:mt-0 reveal px-3 sm:px-0">
      <HeroCard typingText={typingText} />
    </div>
  );
};

export default SlideVisual;
