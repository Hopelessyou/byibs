
import React from 'react';
import { Check, Clock, FileText, RefreshCcw, Scale, Upload, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-16 bg-white" aria-labelledby="features-heading">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 id="features-heading" className="text-3xl font-bold mb-3">소장IBS의 특별한 기능</h2>
          <p className="text-gray-600 text-lg">
            단순한 문서 작성을 넘어 변호사가 전략적으로 작성하여 원스톱 서비스를 제공합니다.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-legal-accent"
              tabIndex={0}
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <feature.icon className="h-6 w-6 text-legal-accent" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-gray-600 mb-3">{feature.description}</p>
              {feature.benefits && (
                <ul className="mt-2 space-y-1">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-500">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" aria-hidden="true" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/create-document">
            <Button size="lg" className="bg-legal-primary hover:bg-legal-secondary text-white">
              지금 바로 소장 작성하기
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    icon: FileText,
    title: "AI 심층 조사",
    description: "사건 유형에 맞는 질문에 답하기만 하면 체계적으로 정리하여 쟁점을 명확히 보여 줍니다.",
    benefits: ["핵심 쟁점 자동 파악", "관련 법령 자동 검색", "사용자 친화적 인터페이스"]
  },
  {
    icon: User,
    title: "변호사 전략적 작성",
    description: "전문변호사의 전략적 작성으로 고소장의 완성도와 법적 효과를 높일 수 있습니다.",
    benefits: ["승소 가능성 증가", "전문적 법률 용어 사용", "맞춤형 전략 제안"]
  },
  {
    icon: Scale,
    title: "법령 및 판례 삽입",
    description: "법령과 판례를 검토하여 삽입함으로 보다 전문적인 고소장을 완성합니다.",
    benefits: ["최신 판례 자동 검색", "관련 법령 자동 연결", "전문성 강화"]
  },
  {
    icon: Upload,
    title: "증거 자료 업로드",
    description: "사진, PDF 등 다양한 형태의 증거 자료를 쉽게 업로드하고 관리할 수 있습니다.",
    benefits: ["다양한 파일 형식 지원", "자동 정리 및 분류", "클라우드 보관"]
  },
  {
    icon: RefreshCcw,
    title: "무제한 수정",
    description: "요금제에 따라 여러 번 수정이 가능하며, 완벽한 고소장을 작성할 수 있습니다.",
    benefits: ["실시간 피드백", "여러 버전 관리", "쉬운 수정 프로세스"]
  },
  {
    icon: Clock,
    title: "신속한 처리",
    description: "소장은 3시간 이내에 변호사가 작성하여 제공됩니다.",
    benefits: ["긴급 건 우선 처리", "단계별 진행 상황 알림", "효율적인 프로세스"]
  }
];

export default Features;
