
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { InfoIcon } from 'lucide-react';

interface DocumentStepNavigationProps {
  steps: { id: string; label: string }[];
  activeStep: string;
  onStepChange: (step: string) => void;
  canAccessPreview: boolean;
  hasChatMessages: boolean;
}

const DocumentStepNavigation: React.FC<DocumentStepNavigationProps> = ({
  steps,
  activeStep,
  onStepChange,
  canAccessPreview,
  hasChatMessages
}) => {
  return (
    <div className="w-full">
      <h2 className="sr-only">문서 작성 단계</h2>
      <p className="text-sm text-gray-500 mb-2">현재 단계: {steps.find(step => step.id === activeStep)?.label || activeStep}</p>
      
      <Tabs value={activeStep} onValueChange={onStepChange} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          {steps.map((step) => {
            const isDisabled = (step.id === 'preview' && !canAccessPreview) ||
                    (step.id === 'review' && !hasChatMessages);
                    
            return (
              <TooltipProvider key={step.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <TabsTrigger 
                        value={step.id}
                        disabled={isDisabled}
                        className="flex items-center"
                        aria-label={`${step.label} 단계${isDisabled ? ' (아직 접근할 수 없음)' : ''}`}
                      >
                        {step.label === "AI 상담" ? "AI 심층 조사" : step.label}
                        {isDisabled && <InfoIcon className="h-3 w-3 ml-1 text-gray-400" aria-hidden="true" />}
                      </TabsTrigger>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent align="center" className="bg-gray-800 text-white text-xs">
                    {step.id === 'preview' && !canAccessPreview && "모든 필수 정보를 입력한 후에 미리보기를 확인할 수 있습니다"}
                    {step.id === 'review' && !hasChatMessages && "AI 심층 조사를 완료한 후에 접근할 수 있습니다"}
                    {!isDisabled && `${step.label} 단계로 이동`}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </TabsList>
      </Tabs>
      
      <div className="mt-2 text-xs text-gray-500">
        <span className="font-medium">도움말:</span> 각 단계를 순서대로 완료하시면 최적의 문서가 작성됩니다
      </div>
    </div>
  );
};

export default DocumentStepNavigation;
