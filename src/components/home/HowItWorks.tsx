import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { UserPlus, FileText, Scale, FileCheck, ArrowRight, PhoneCall } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-6 text-[#1D3557] leading-tight font-serif">
            이용 방법
          </h2>
          <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            간편한 절차를 통해 정확하고 전문적인 소장을 작성하실 수 있습니다
          </p>
          <div className="mt-6 w-24 h-1 bg-[#E63946] mx-auto rounded-full"></div>
        </div>
        
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-6 bottom-6 w-1 bg-gradient-to-b from-[#1D3557]/10 via-[#1D3557]/30 to-[#1D3557]/10 -translate-x-1/2 rounded-full -z-10"></div>
          
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`relative flex flex-col md:flex-row ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              } items-center mb-24 last:mb-0`}
            >
              <div className="absolute left-1/2 md:left-auto md:top-1/2 transform -translate-x-1/2 md:-translate-y-1/2 md:translate-x-0 z-10 
                bg-gradient-to-br from-[#1D3557] to-[#274C77] text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shadow-lg">
                {index + 1}
              </div>
              
              <div className="md:w-5/12 text-center md:text-left md:px-8">
                <div className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow ${index % 2 === 0 ? 'md:ml-12' : 'md:mr-12'} border-t-4 ${index === 0 ? 'border-[#E63946]' : index === 1 ? 'border-[#FFC107]' : index === 2 ? 'border-[#2A9D8F]' : 'border-[#457B9D]'}`}>
                  <h3 className="text-2xl font-bold mb-4 text-[#1D3557] font-serif">{step.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{step.description}</p>
                </div>
              </div>
              
              <div className="hidden md:block md:w-5/12">
                <div className={`bg-gradient-to-br ${
                  index === 0 ? 'from-[#E63946]/5 to-[#E63946]/20' : 
                  index === 1 ? 'from-[#FFC107]/5 to-[#FFC107]/20' : 
                  index === 2 ? 'from-[#2A9D8F]/5 to-[#2A9D8F]/20' : 
                  'from-[#457B9D]/5 to-[#457B9D]/20'
                } rounded-2xl p-12 h-64 flex items-center justify-center ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'} shadow-inner`}>
                  <div className={`w-32 h-32 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-[#E63946]/10 text-[#E63946]' : 
                    index === 1 ? 'bg-[#FFC107]/10 text-[#FFC107]' : 
                    index === 2 ? 'bg-[#2A9D8F]/10 text-[#2A9D8F]' : 
                    'bg-[#457B9D]/10 text-[#457B9D]'
                  }`}>
                    <step.icon className="h-16 w-16" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-20">
          <div className="max-w-xl mx-auto bg-[#1D3557]/5 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4 text-[#1D3557]">지금 바로 시작하세요</h3>
            <p className="text-gray-700 mb-6">변호사가 직접 작성한 고소장으로 승소 가능성을 높이세요.</p>
            
            <Link to="/create-document">
              <Button size="lg" className="bg-[#E63946] hover:bg-[#C1121F] text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transform transition-all hover:-translate-y-1">
                소장 작성하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h4 className="text-xl font-bold text-[#1D3557] mb-3">승소 가능성이 궁금하신가요?</h4>
              <p className="text-gray-600 mb-4">변호사와 1:1 상담으로 사건의 승소가능성을 먼저 확인하세요.</p>
              
              <div className="bg-[#457B9D]/10 rounded-xl p-4 flex items-center justify-between hover:bg-[#457B9D]/20 transition-colors cursor-pointer max-w-md mx-auto">
                <div className="flex items-center">
                  <div className="bg-white rounded-full p-3 mr-4 shadow-md">
                    <PhoneCall className="h-6 w-6 text-[#457B9D]" aria-hidden="true" />
                  </div>
                  <div className="text-left">
                    <a href="tel:0606041000" className="flex items-center" aria-label="유료 법률 상담전화 걸기">
                      <span className="text-xl font-bold text-[#1D3557]">060-604-1000</span>
                    </a>
                    <p className="text-[#457B9D] text-sm">유료 법률 상담 서비스</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-[#457B9D]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const steps = [
  {
    title: "회원가입 및 요금제 선택",
    description: "간단한 회원가입 후 필요에 맞는 요금제를 선택하세요. 단건, 패키지, 월정액 중 선택 가능합니다.",
    icon: UserPlus
  },
  {
    title: "사건 정보 입력",
    description: "사건 유형을 선택하고 피해자/피의자 정보, 사건 내용을 입력합니다. 증거 자료도 함께 업로드하세요.",
    icon: FileText
  },
  {
    title: "전문변호사 소장",
    description: "변호사가 직접 사건을 검토 후 전략적 소장을 작성합니다.",
    icon: Scale
  },
  {
    title: "출력 및 제출",
    description: "완성된 고소장을 PDF로 다운로드하거나 인쇄할 수 있습니다. 제출 대행 서비스를 이용하면 더욱 편리합니다.",
    icon: FileCheck
  }
];

export default HowItWorks;
