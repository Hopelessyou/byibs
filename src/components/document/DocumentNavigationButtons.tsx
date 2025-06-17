
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface DocumentNavigationButtonsProps {
  activeStep: string;
  isFirstStep: boolean;
  isLastStep: boolean;
  canProceedFromCurrentStep: boolean;
  onBack: () => void;
  onNext: () => void;
  onComplete: () => void;
  lastSavedAt: Date | null;
}

const DocumentNavigationButtons: React.FC<DocumentNavigationButtonsProps> = ({
  isFirstStep,
  isLastStep,
  canProceedFromCurrentStep,
  onBack,
  onNext,
  onComplete,
  lastSavedAt
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <Button 
          variant="outline" 
          onClick={onBack} 
          disabled={isFirstStep}
          type="button"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> 이전
        </Button>
      </div>
      
      <div className="text-sm text-gray-500">
        {lastSavedAt && (
          <span>최근 저장: {lastSavedAt.toLocaleTimeString()} (3분마다 자동저장)</span>
        )}
      </div>
      
      <div>
        {!isLastStep ? (
          <Button 
            onClick={onNext}
            className="bg-legal-primary hover:bg-legal-secondary"
            disabled={!canProceedFromCurrentStep}
            type="button"
          >
            다음 <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button 
            className="bg-legal-accent hover:bg-legal-primary"
            onClick={onComplete}
            type="button"
          >
            작성 완료
          </Button>
        )}
      </div>
    </div>
  );
};

export default DocumentNavigationButtons;
