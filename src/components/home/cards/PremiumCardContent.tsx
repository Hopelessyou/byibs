
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PremiumCardContentProps {
  cardStyle: string;
  icon?: React.ReactNode;
  investmentAmount?: string;
  specialFeature?: string;
  accent?: string;
}

const PremiumCardContent: React.FC<PremiumCardContentProps> = ({ 
  cardStyle, 
  icon, 
  investmentAmount, 
  specialFeature,
  accent
}) => {
  let backgroundClassName = 'bg-blue-100 text-blue-800';
  if (accent) {
    backgroundClassName = `bg-${accent}-100 text-${accent}-800`;
  }

  return (
    <div className="space-y-4">
      {cardStyle === 'diamond-pattern' && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-yellow-500 opacity-20 rounded-xl mix-blend-overlay"></div>
          <div className="relative z-10 p-6 rounded-xl shadow-md">
            <div className="flex items-center space-x-3">
              <div className={cn("p-2 rounded-full", backgroundClassName)}>
                {icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">AI 법률 시스템</h3>
            </div>
            <p className="text-sm text-gray-800 mt-2 font-medium">
              {specialFeature}으로 더욱 강력하게!
            </p>
            <div className="mt-4">
              <span className="text-xl font-bold text-gray-900">{investmentAmount}</span>
              <span className="text-sm text-gray-700"> 투자</span>
            </div>
          </div>
        </div>
      )}

      {cardStyle === 'golden-frame' && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-yellow-200 opacity-30 rounded-xl mix-blend-overlay"></div>
          <div className="relative z-10 p-6 rounded-xl shadow-md">
            <div className="flex items-center space-x-3">
              <div className={cn("p-2 rounded-full", backgroundClassName)}>
                {icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">빅데이터 분석 시스템</h3>
            </div>
            <p className="text-sm text-gray-800 mt-2 font-medium">
              {specialFeature}으로 승소 보장!
            </p>
            <div className="mt-4">
              <span className="text-xl font-bold text-gray-900">{investmentAmount}</span>
              <span className="text-sm text-gray-700"> 투자</span>
            </div>
          </div>
        </div>
      )}

      {cardStyle === 'digital-pattern' && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-200 to-teal-200 opacity-30 rounded-xl mix-blend-overlay"></div>
          <div className="relative z-10 p-6 rounded-xl shadow-md">
            <div className="flex items-center space-x-3">
              <div className={cn("p-2 rounded-full", backgroundClassName)}>
                {icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">디지털 포렌식 분석</h3>
            </div>
            <p className="text-sm text-gray-800 mt-2 font-medium">
              {specialFeature}으로 온라인 평판 보호!
            </p>
            <div className="mt-4">
              <span className="text-xl font-bold text-gray-900">{investmentAmount}</span>
              <span className="text-sm text-gray-700"> 투자</span>
            </div>
          </div>
        </div>
      )}

      {cardStyle === 'government-seal' && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-bl from-indigo-200 to-blue-200 opacity-30 rounded-xl mix-blend-overlay"></div>
          <div className="relative z-10 p-6 rounded-xl shadow-md">
            <div className="flex items-center space-x-3">
              <div className={cn("p-2 rounded-full", backgroundClassName)}>
                {icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">행정소송 자동화 시스템</h3>
            </div>
            <p className="text-sm text-gray-800 mt-2 font-medium">
              {specialFeature}으로 정부기관 상대 승소!
            </p>
            <div className="mt-4">
              <span className="text-xl font-bold text-gray-900">{investmentAmount}</span>
              <span className="text-sm text-gray-700"> 투자</span>
            </div>
          </div>
        </div>
      )}

      {cardStyle === 'default' && (
        <div className="relative">
          <div className="absolute inset-0 bg-blue-100 opacity-20 rounded-xl mix-blend-overlay"></div>
          <div className="relative z-10 p-6 rounded-xl shadow-md">
            <div className="flex items-center space-x-3">
              <div className={cn("p-2 rounded-full", backgroundClassName)}>
                {icon}
              </div>
              <h3 className="text-lg font-semibold">기본 카드 스타일</h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {specialFeature || '기본 기능'}을 사용해보세요!
            </p>
            <div className="mt-4">
              <span className="text-xl font-bold">{investmentAmount || '0'}</span>
              <span className="text-sm text-gray-500"> 투자</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumCardContent;
