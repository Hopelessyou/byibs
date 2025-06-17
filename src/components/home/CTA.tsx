import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, PhoneCall, Shield, Check } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <section className="py-12 bg-legal-primary text-white" aria-labelledby="cta-heading">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-4">
            <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-4">
              지금 바로 소장 작성을 시작하세요
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mb-6">
              온라인 서비스로 비용은 50% 줄이고, 작성 시간은 80% 단축하세요.
              변호사 검수 옵션으로 더 정확한 소장을 작성할 수 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Link to="/create-document">
                <Button size="lg" className="bg-white text-legal-primary hover:bg-blue-50 px-8 w-full sm:w-auto" aria-label="소장 작성하기 페이지로 이동">
                  소장 작성하기
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-legal-secondary px-8 w-full sm:w-auto">
                  요금제 알아보기
                </Button>
              </Link>
            </div>
            
            <div className="bg-rose-500 rounded-xl p-4 mt-4 flex items-center shadow-lg hover:bg-rose-600 transition-colors cursor-pointer max-w-md">
              <div className="bg-white rounded-full p-3 mr-4">
                <PhoneCall className="h-6 w-6 text-rose-500" aria-hidden="true" />
              </div>
              <div>
                <p className="font-bold text-white text-lg">승소 가능성 확인이 필요하신가요?</p>
                <a href="tel:0606041000" className="flex items-center" aria-label="유료 법률 상담전화 걸기, 분당 3천원">
                  <span className="text-2xl font-bold text-white">060-604-1000</span>
                </a>
                <p className="text-rose-100 text-sm">유료 법률 상담 서비스 (분당 3,000원)</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-12 md:mt-0">
            <div className="bg-legal-secondary p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-white">빠른 작성 가이드</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-legal-accent text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0" aria-hidden="true">1</span>
                  <div>
                    <p className="font-medium">사건 유형을 선택하세요</p>
                    <p className="text-sm text-blue-100 mt-1">형사, 민사, 행정 등 사건 유형에 맞는 템플릿이 제공됩니다</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-legal-accent text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0" aria-hidden="true">2</span>
                  <div>
                    <p className="font-medium">인적사항과 사건 정보를 입력하세요</p>
                    <p className="text-sm text-blue-100 mt-1">간편한 양식에 맞춰 필요한 정보를 입력하시면 됩니다</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-legal-accent text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0" aria-hidden="true">3</span>
                  <div>
                    <p className="font-medium">AI 심층 조사를 통해 정확한 정보를 입력하세요</p>
                    <p className="text-sm text-blue-100 mt-1">AI가 사건과 관련된 구체적인 질문을 통해 핵심 정보를 수집합니다</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-legal-accent text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0" aria-hidden="true">4</span>
                  <div>
                    <p className="font-medium">변호사 검수 옵션으로 더 정확한 소장을 작성하세요</p>
                    <p className="text-sm text-blue-100 mt-1">전문 변호사의 검토를 통해 승소 가능성을 높일 수 있습니다</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-blue-200">
            궁금한 점이 있으신가요? <Link to="/faq" className="underline hover:text-white">자주 묻는 질문</Link>을 확인하거나 <Link to="/contact" className="underline hover:text-white">고객센터</Link>에 문의하세요.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
