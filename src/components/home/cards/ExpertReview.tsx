
import React from 'react';
import { cn } from '@/lib/utils';
import { Scale, CheckCircle, Star } from 'lucide-react';

const ExpertReview: React.FC = () => {
  return (
    <div className="expert-review-container">
      <div className="flex justify-center mb-6">
        <div className="relative w-48 h-48">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-white rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80" 
              alt="전문 변호사" 
              className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg"
            />
          </div>
          <div className="absolute top-0 right-0 flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={16} className="text-yellow-400 fill-yellow-400" />
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-bold text-legal-primary mb-2">법률 전문가의 꼼꼼한 검수</h3>
        <p className="text-gray-600 mb-4">15년 경력의 전문 변호사가 귀하의 고소장을 검토합니다</p>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg space-y-2">
        <div className="flex items-center">
          <CheckCircle size={20} className="text-legal-primary mr-2" />
          <p className="text-gray-800">법률 용어 적절성 검토</p>
        </div>
        <div className="flex items-center">
          <CheckCircle size={20} className="text-legal-primary mr-2" />
          <p className="text-gray-800">구성 요건 충족 여부 확인</p>
        </div>
        <div className="flex items-center">
          <CheckCircle size={20} className="text-legal-primary mr-2" />
          <p className="text-gray-800">증거자료 연계성 검증</p>
        </div>
        <div className="flex items-center">
          <CheckCircle size={20} className="text-legal-primary mr-2" />
          <p className="text-gray-800">승소 가능성 제고 보완</p>
        </div>
      </div>
    </div>
  );
};

export default ExpertReview;
