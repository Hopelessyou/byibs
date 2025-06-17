
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">합리적인 요금제</h2>
          <p className="text-gray-600 text-lg">
            필요에 맞는 다양한 요금제를 선택하세요. 모든 요금제는 소장 작성 기능을 포함합니다.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`border rounded-xl overflow-hidden transition-all ${
                plan.popular 
                  ? 'border-legal-accent shadow-lg transform -translate-y-1 md:-translate-y-4 scale-105 md:scale-110' 
                  : 'border-gray-200 hover:shadow-md'
              }`}
            >
              {plan.popular && (
                <div className="bg-legal-accent text-white text-center py-2 text-sm font-medium">
                  가장 인기 있는 요금제
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="text-gray-500 mb-4">{plan.description}</div>
                
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-bold">{plan.price.toLocaleString()}</span>
                  <span className="text-gray-500 ml-1">원</span>
                  {plan.unit && <span className="text-gray-500 ml-1">/{plan.unit}</span>}
                </div>
                
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-legal-success mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link to="/register">
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-legal-accent hover:bg-legal-primary' 
                        : 'bg-legal-primary hover:bg-legal-secondary'
                    } text-white`}
                  >
                    선택하기
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            * 모든 요금은 부가세 별도 금액입니다. 추가 수정은 개당 10만원이 부과됩니다. 자세한 사항은 고객센터에 문의하세요.
          </p>
        </div>
      </div>
    </section>
  );
};

const plans = [
  {
    name: "단건",
    description: "개인 사용자를 위한 기본 플랜",
    price: 500000,
    popular: false,
    features: [
      "소장 작성",
      "변호사 작성 1회",
      "최대 1회 수정 가능",
      "PDF 다운로드/인쇄",
      "14일 문서 보관"
    ]
  },
  {
    name: "패키지",
    description: "복잡한 사건을 위한 프리미엄 플랜",
    price: 700000,
    popular: true,
    features: [
      "소장 작성",
      "전문변호사 작성",
      "최대 2회 수정 가능",
      "제출 대행 서비스 포함",
      "변호사 전화 상담 (15분)",
      "30일 문서 보관"
    ]
  },
  {
    name: "월정액",
    description: "기업 및 단체를 위한 멤버십",
    price: 800000,
    unit: "월",
    popular: false,
    features: [
      "소장 작성",
      "변호사 작성",
      "건당 최대 3회 수정 가능",
      "월 소장 작성 2건",
      "변호사 자문 1시간/월",
      "90일 문서 보관"
    ]
  }
];

export default Pricing;
