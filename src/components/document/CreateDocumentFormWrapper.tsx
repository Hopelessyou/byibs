
import React from 'react';
import { Card } from '@/components/ui/card';
import { Shield, Check, Award } from 'lucide-react';
import { Statistic } from '@/components/ui/statistic';

interface CreateDocumentFormWrapperProps {
  children: React.ReactNode;
}

const CreateDocumentFormWrapper: React.FC<CreateDocumentFormWrapperProps> = ({ children }) => {
  return (
    <div className="mb-10">
      {/* Premium document creation experience */}
      <div className="mb-10 reveal-3d">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-legal-primary reveal">고소장 작성</h1>
            <p className="text-gray-600 mt-2 reveal">
              단계별로 질문에 답하여 전문적인 고소장을 작성하세요
            </p>
          </div>
          
          <div className="flex gap-3">
            <div className="flex items-center trust-badge">
              <Shield className="h-4 w-4" />
              <span>256비트 암호화</span>
            </div>
            <div className="flex items-center trust-badge">
              <Check className="h-4 w-4" />
              <span>법원 인정 서식</span>
            </div>
            <div className="flex items-center trust-badge">
              <Award className="h-4 w-4" />
              <span>최고 품질 보장</span>
            </div>
          </div>
        </div>
        
        {/* Statistics banner */}
        <div className="bg-white rounded-lg shadow-elegant p-5 mb-8 reveal-fade">
          <div className="grid grid-cols-3 gap-2">
            <Statistic value={9542} label="작성된 문서" />
            <Statistic value={97} label="사용자 만족도" suffix="%" />
            <Statistic value={24} label="평균 소요 시간" suffix="분" />
          </div>
        </div>
        
        {/* Main form content */}
        <Card className="shadow-elegant border overflow-hidden reveal">
          <div className="bg-gradient-to-r from-legal-primary to-legal-secondary h-1"></div>
          <div className="p-1">
            {children}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateDocumentFormWrapper;
