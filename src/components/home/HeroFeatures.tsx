import React from 'react';
import { ShieldCheck, Zap, Server, Lock } from 'lucide-react';

const HeroFeatures: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 reveal">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-elegant hover:shadow-premium hover-lift transition-all"
        >
          <div className="flex items-center mb-2">
            <div className="rounded-full bg-blue-50 p-2.5 mr-2.5">
              <feature.icon className="h-5 w-5 text-legal-primary" />
            </div>
            <h3 className="text-base font-medium">{feature.title}</h3>
          </div>
          <p className="text-sm text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

const features = [
  {
    icon: ShieldCheck,
    title: "검증된 승소율",
    description: "평균 87% 이상의 높은 승소율"
  },
  {
    icon: Zap,
    title: "신속한 처리",
    description: "3시간 이내 빠른 작성"
  },
  {
    icon: Server,
    title: "보안 시스템",
    description: "개인정보 완벽 보호"
  },
  {
    icon: Lock,
    title: "전문 변호사",
    description: "분야별 전문가 검토"
  }
];

export default HeroFeatures;
