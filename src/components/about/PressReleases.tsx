
import React from 'react';
import { PressRelease } from './AboutTypes';
import { Newspaper } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const PressReleases: React.FC = () => {
  return (
    <section className="max-w-4xl mx-auto mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-legal-primary">언론 속 고소장닷컴</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          고객 중심의 혁신적인 법률 서비스로 주목받고 있는 고소장닷컴의 언론 보도 내용입니다
        </p>
      </div>
      
      <div className="space-y-8">
        {pressReleases.map((press, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 text-legal-primary">{press.title}</h3>
                  <p className="text-legal-accent text-sm mb-4">{press.source} · {press.date}</p>
                  <p className="text-gray-600">{press.summary}</p>
                </div>
                <div className="bg-legal-light p-3 rounded-full flex-shrink-0">
                  <Newspaper className="h-6 w-6 text-legal-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

const pressReleases: PressRelease[] = [
  {
    title: "IBS법률사무소, 전문 법률 지식을 고객 위주로 재해석한 '고소장닷컴' 출시",
    source: "경제일보",
    date: "2023.05.15",
    summary: "IBS법률사무소가 국내 최초 온라인 고소장 서비스 '고소장닷컴'을 출시했다. 이 서비스는 형사 고소장 작성 시간을 50% 이상 단축시키고 비용을 30% 절감할 수 있는 혁신적인 플랫폼으로 주목받고 있다."
  },
  {
    title: "고소장닷컴, 시드 투자 유치 성공...고객 중심 법률서비스 선도",
    source: "테크뉴스",
    date: "2023.07.20",
    summary: "국내 리걸테크 스타트업 IBS법률사무소의 '고소장닷컴'이 시드 투자 유치에 성공했다. 이 자금을 바탕으로 민사소송 및 계약서 서비스로 영역을 확장할 계획이라고 밝혔다."
  },
  {
    title: "디지털 혁신 100대 기업에 '고소장닷컴' 선정",
    source: "디지털타임스",
    date: "2023.09.10",
    summary: "과학기술정보통신부가 발표한 '2023 디지털 혁신 100대 기업'에 IBS법률사무소의 '고소장닷컴'이 선정됐다. 법률 분야의 디지털 전환을 선도하는 기업으로 인정받아 주목을 받고 있다."
  },
  {
    title: "고소장닷컴, '고객 만족도 법률 서비스 1위' 선정",
    source: "서울경제",
    date: "2023.11.05",
    summary: "고소장닷컴이 한국소비자협회 주관 '2023 고객 만족도 법률 서비스' 부문에서 1위로 선정됐다. 직관적인 인터페이스와 전문 변호사의 검수 서비스가 고객들로부터 높은 평가를 받았다."
  }
];

export default PressReleases;
