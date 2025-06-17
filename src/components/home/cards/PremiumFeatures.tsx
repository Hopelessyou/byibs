
import React from 'react';
import { Trophy, Star, ShieldCheck } from 'lucide-react';

const PremiumFeatures: React.FC = () => {
  return (
    <div className="flex items-center space-x-4 pt-4">
      <div className="flex items-center space-x-2">
        <div className="rounded-full bg-yellow-100 p-1">
          <Trophy className="h-4 w-4 text-yellow-600" />
        </div>
        <span className="text-sm font-medium">업계 선두</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="rounded-full bg-green-100 p-1">
          <Star className="h-4 w-4 text-green-600" />
        </div>
        <span className="text-sm font-medium">품질 보증</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="rounded-full bg-blue-100 p-1">
          <ShieldCheck className="h-4 w-4 text-blue-600" />
        </div>
        <span className="text-sm font-medium">보안 인증</span>
      </div>
    </div>
  );
};

export default PremiumFeatures;
