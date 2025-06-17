
import React from 'react';
import { Button } from '@/components/ui/button';

const AboutCTA: React.FC = () => {
  return (
    <section className="text-center mb-16">
      <h2 className="text-3xl font-bold mb-8">함께 성장하는 고소장닷컴</h2>
      <p className="max-w-2xl mx-auto text-gray-600 mb-8">
        고객의 신뢰와 함께 성장하는 고소장닷컴은 항상 더 나은 서비스를 제공하기 위해 노력하고 있습니다.
        문의사항이나 협업 제안은 언제든지 환영합니다.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button size="lg" className="bg-legal-primary hover:bg-legal-secondary">
          문의하기
        </Button>
        <Button size="lg" variant="outline" className="border-legal-primary text-legal-primary hover:bg-legal-light">
          채용 정보
        </Button>
      </div>
    </section>
  );
};

export default AboutCTA;
