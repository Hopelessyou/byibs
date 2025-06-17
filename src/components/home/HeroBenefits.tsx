
import React from 'react';
import { ShieldCheck, GraduationCap, Trophy } from 'lucide-react';

const HeroBenefits: React.FC = () => {
  return (
    <div className="flex items-center space-x-8 pt-4">
      <div className="flex items-center">
        <div className="bg-green-50 rounded-full p-1">
          <ShieldCheck className="text-green-600 h-4 w-4" />
        </div>
        <span className="text-sm text-gray-600 ml-2">보안 인증</span>
      </div>
      <div className="flex items-center">
        <div className="bg-amber-50 rounded-full p-1">
          <GraduationCap className="text-amber-600 h-4 w-4" />
        </div>
        <span className="text-sm text-gray-600 ml-2">변호사 검토</span>
      </div>
      <div className="flex items-center">
        <div className="bg-blue-50 rounded-full p-1">
          <Trophy className="text-blue-600 h-4 w-4" />
        </div>
        <span className="text-sm text-gray-600 ml-2">94% 만족도</span>
      </div>
    </div>
  );
};

export default HeroBenefits;
