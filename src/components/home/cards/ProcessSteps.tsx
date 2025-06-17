
import React from 'react';
import { cn } from '@/lib/utils';
import { FileText, CheckCircle, Award, ArrowRight } from 'lucide-react';

interface ProcessStepsProps {
  steps: Array<{
    step: number;
    title: string;
    icon: React.ReactNode;
  }>;
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({ steps }) => {
  // Default steps if none provided
  const defaultSteps = [
    { step: 1, title: "양식 선택", icon: <FileText size={24} /> },
    { step: 2, title: "항목 입력", icon: <CheckCircle size={24} /> },
    { step: 3, title: "변호사 검토 및 작성", icon: <Award size={24} /> },
    { step: 4, title: "제출 안내", icon: <ArrowRight size={24} /> }
  ];

  const stepsToDisplay = steps.length > 0 ? steps : defaultSteps;

  return (
    <div className="process-steps">
      <h3 className="text-xl font-bold text-navy-700 mb-6">간편한 4단계 프로세스</h3>
      
      <div className="relative">
        {/* Process line */}
        <div className="absolute left-6 top-6 h-[calc(100%-24px)] w-0.5 bg-gray-200"></div>
        
        {/* Steps */}
        <div className="space-y-8">
          {stepsToDisplay.map((step, index) => (
            <div key={index} className="flex items-start">
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 bg-navy-600 text-white rounded-full font-bold text-lg shadow-md z-10">
                  {step.step}
                </div>
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-full mr-3">
                    {step.icon}
                  </div>
                  <h4 className="text-lg font-bold text-navy-800">{step.title}</h4>
                </div>
                <p className="text-gray-600 mt-1 text-sm">
                  {step.step === 1 && "필요한 법률 서류 양식을 선택하세요"}
                  {step.step === 2 && "질문에 답하면서 필요한 정보를 입력하세요"}
                  {step.step === 3 && "변호사가 검토하여 전략적으로 서류를 작성합니다"}
                  {step.step === 4 && "제출 방법에 대한 안내와 함께 완성된 서류를 받으세요"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessSteps;
