
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const AboutIntro: React.FC = () => {
  return (
    <section className="max-w-4xl mx-auto mb-16">
      <h1 className="text-4xl font-bold mb-4 text-legal-primary text-center">회사 소개</h1>
      <p className="text-xl text-gray-600 mb-8 text-center">
        고소장닷컴은 누구나 쉽게 고소장을 작성할 수 있도록, <br />
        법률문서를 대중화하는 리걸테크 솔루션을 제공합니다.
      </p>
      
      <div className="mt-12 flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2">
          <div className="bg-legal-light p-8 rounded-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-legal-accent"></div>
            <h2 className="text-2xl font-bold mb-4 text-legal-primary">IBS법률사무소</h2>
            <p className="text-gray-600 mb-6">
              고소장닷컴은 IBS법률사무소에서 운영하는 온라인 고소장 작성 서비스로,
              변호사, 법무사, 개발자로 구성된 전문 팀이 함께합니다.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <Check className="h-5 w-5 text-legal-accent mr-2 flex-shrink-0 mt-0.5" />
                <span>법률문서 기술을 통한 비용 30% 절감</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-legal-accent mr-2 flex-shrink-0 mt-0.5" />
                <span>사용자 중심 인터페이스로 작성 시간 50% 단축</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-legal-accent mr-2 flex-shrink-0 mt-0.5" />
                <span>전문 변호사의 검수로 법적 효과 극대화</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/2">
          <h3 className="text-xl font-bold mb-4 text-legal-primary">비전 및 목표</h3>
          <p className="text-gray-600 mb-6">
            "가장 쉽고 편리한 소장 작성 서비스로 의뢰인의 권익을 보호합니다."
          </p>
          
          <h4 className="font-semibold mb-2">주요 목표:</h4>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-legal-accent rounded-full mr-2"></div>
              <span>전문성과 접근성을 모두 갖춘 법률 서비스 제공</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-legal-accent rounded-full mr-2"></div>
              <span>의뢰인 중심의 간편한 법률 문서 작성 플랫폼 구축</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-legal-accent rounded-full mr-2"></div>
              <span>최신 기술과 법률 전문성의 조화로 효과적인 권익 보호</span>
            </li>
          </ul>
          
          <Link to="/create-document">
            <Button className="bg-legal-primary hover:bg-legal-secondary">
              서비스 시작하기
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;
