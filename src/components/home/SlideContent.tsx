
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import HeroBenefits from './HeroBenefits';
import PremiumFeatures from './cards/PremiumFeatures';

interface SlideContentProps {
  title: React.ReactNode;
  description: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  isPremium: boolean;
  accent?: string;
  style?: 'default' | 'premium' | 'process' | 'expert' | 'security' | 'mobile';
  ctaText?: string;
}

const SlideContent: React.FC<SlideContentProps> = ({
  title,
  description,
  label,
  icon,
  color,
  isPremium,
  accent,
  style = 'default',
  ctaText = '고소장 작성하기',
}) => {
  const getButtonColors = () => {
    if (style === 'default') {
      return "bg-legal-primary hover:bg-legal-secondary text-white";
    }
    if (style === 'process') {
      return "bg-navy-600 hover:bg-navy-800 text-white";
    }
    if (style === 'expert') {
      return "bg-legal-primary hover:bg-blue-800 text-white";
    }
    if (style === 'security') {
      return "bg-navy-600 hover:bg-navy-800 text-white";
    }
    if (style === 'mobile') {
      return "bg-legal-accent hover:bg-blue-600 text-white";
    }
    if (isPremium) {
      return accent ? `bg-${accent}-600 hover:bg-${accent}-700 text-white` : "bg-legal-primary hover:bg-legal-secondary text-white";
    }
    return "bg-legal-primary hover:bg-legal-secondary text-white";
  };

  const getOutlineColors = () => {
    if (style === 'process') {
      return "border-navy-600 text-navy-600 hover:bg-navy-50";
    }
    if (style === 'expert') {
      return "border-legal-primary text-legal-primary hover:bg-blue-50";
    }
    if (style === 'security') {
      return "border-navy-600 text-navy-600 hover:bg-navy-50";
    }
    if (style === 'mobile') {
      return "border-legal-accent text-legal-accent hover:bg-blue-50";
    }
    return "border-legal-primary text-legal-primary hover:bg-legal-light";
  };

  return (
    <div className={cn(
      "md:w-1/2 space-y-4 reveal",
      (isPremium || style !== 'default') && "z-10"
    )}>
      <div className={`inline-flex items-center gap-2 ${color} rounded-full px-4 py-1.5 text-sm font-bold mb-2 ${(isPremium || style !== 'default') ? "shadow-lg" : ""}`}>
        {icon}
        <span>{label}</span>
        {isPremium && <Sparkles className="h-4 w-4" />}
      </div>
      
      <h1 className={cn(
        "text-4xl font-bold leading-tight animate-fadeIn font-playfair md:text-4xl",
        (isPremium || style !== 'default') && "drop-shadow-md"
      )}>
        {title}
      </h1>
      
      <p className={cn(
        "text-gray-600 max-w-lg text-base",
        (isPremium || style !== 'default') && "text-gray-800"
      )}>
        {description}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/create-document">
                <Button size="lg" className={cn(
                  "w-full sm:w-auto btn-ripple shadow-elegant", getButtonColors()
                )}>
                  {ctaText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>변호사 검토 및 작성을 통해<br />승소 가능성 극대화</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Link to="/how-it-works">
          <Button size="lg" variant="outline" className={cn(
            "w-full sm:w-auto", getOutlineColors()
          )}>
            이용방법 알아보기
          </Button>
        </Link>
      </div>
      
      {style === 'default' && !isPremium ? <HeroBenefits /> : <PremiumFeatures />}
    </div>
  );
};

export default SlideContent;
