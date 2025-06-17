
import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface LegalTermTooltipProps {
  term: string;
  explanation: string;
  children: React.ReactNode;
}

const LegalTermTooltip: React.FC<LegalTermTooltipProps> = ({ term, explanation, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger asChild>
          <span className="legal-term inline-flex items-center group">
            {children}
            <HelpCircle className="h-3 w-3 ml-0.5 text-legal-accent inline-block opacity-70 group-hover:opacity-100 transition-opacity" />
          </span>
        </TooltipTrigger>
        <TooltipContent className="bg-white p-3 shadow-premium border border-gray-100 max-w-xs backdrop-blur-sm bg-white/90">
          <p className="font-medium text-gray-900 gold-gradient">{term}</p>
          <p className="text-sm text-gray-600 mt-1">{explanation}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LegalTermTooltip;
