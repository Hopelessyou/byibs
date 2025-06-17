
import React from 'react';
import { ValueProp } from './AboutTypes';
import { Shield, Clock, FileCheck, DollarSign } from 'lucide-react';

const ValueProposition: React.FC = () => {
  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-legal-primary">고객님께 드리는 혜택</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          고소장닷컴을 통해 고객님께서 경험하실 수 있는 가치와 혜택을 소개합니다
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {valueProps.map((prop, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="bg-blue-50 p-3 rounded-full inline-flex mb-4">
              <prop.icon className="h-6 w-6 text-legal-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">{prop.title}</h3>
            <p className="text-gray-600">{prop.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const valueProps: ValueProp[] = [
  {
    title: "전문적인 법률 보호",
    description: "변호사가 검토한 전략적 소장 작성으로 의뢰인의 법적 권리를 효과적으로 보호해 드립니다.",
    icon: Shield
  },
  {
    title: "시간 절약",
    description: "복잡한 법률 문서 작성 시간을 80% 단축하여 소중한 시간을 아껴드립니다.",
    icon: Clock
  },
  {
    title: "높은 완성도",
    description: "필수 항목 체크 시스템으로 보정 명령 가능성을 최소화하고 성공적인 소송 진행을 돕습니다.",
    icon: FileCheck
  },
  {
    title: "비용 절감",
    description: "기존 법률 서비스 대비 최대 30% 비용 절감 효과로 경제적인 법률 서비스를 제공합니다.",
    icon: DollarSign
  }
];

export default ValueProposition;
