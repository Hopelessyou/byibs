
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Scale, AlertTriangle, MessagesSquare, CircleDollarSign, Car, Heart, FileText, FileSpreadsheet, Network, User2, Shield, Pencil, Briefcase, Landmark, BookOpen, Accessibility, Gavel, BadgeAlert, Phone, Building, FolderArchive, Hourglass } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DocumentType } from '@/types/document';

interface DocumentTypeSelectorProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

const DocumentTypeSelector: React.FC<DocumentTypeSelectorProps> = ({
  selectedType,
  onSelect
}) => {
  const [category, setCategory] = useState<'criminal' | 'civil'>('criminal');
  const [statsVisible, setStatsVisible] = useState(false);
  
  // Show statistics after a short delay for dramatic effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatsVisible(true);
    }, 800);
    
    // Implement scroll reveal functionality
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);
  
  // 12 detailed criminal types (6 categories)
  const criminalTypes = [
    {
      id: 'sexual_crime',
      title: '성범죄',
      description: '성폭력, 성추행, 디지털 성범죄 등',
      casesHandled: 89,
      successRate: '92%',
      icon: AlertTriangle
    },
    {
      id: 'voice_phishing',
      title: '보이스피싱',
      description: '전화사기, 금융사기, 메신저피싱 등',
      casesHandled: 94,
      successRate: '87%',
      icon: Phone
    },
    {
      id: 'traffic',
      title: '교통사고/범죄',
      description: '음주운전, 뺑소니, 과실치사 등',
      casesHandled: 124,
      successRate: '94%',
      icon: Car
    },
    {
      id: 'fraud',
      title: '일반사기',
      description: '계약사기, 투자사기, 물품미배송 등',
      casesHandled: 156,
      successRate: '88%',
      icon: CircleDollarSign
    },
    {
      id: 'assault',
      title: '폭행/협박',
      description: '폭행, 상해, 협박, 강요 등',
      casesHandled: 103,
      successRate: '89%',
      icon: BadgeAlert
    },
    {
      id: 'defamation',
      title: '명예훼손/모욕',
      description: '온라인 명예훼손, 모욕, 허위사실 유포 등',
      casesHandled: 78,
      successRate: '87%',
      icon: MessagesSquare
    },
    {
      id: 'cybercrime',
      title: '사이버 범죄',
      description: '해킹, 개인정보침해, 온라인 사기 등',
      casesHandled: 51,
      successRate: '84%',
      icon: Shield
    },
    {
      id: 'stalking',
      title: '스토킹/괴롭힘',
      description: '스토킹, 지속적 괴롭힘, 불법촬영 등',
      casesHandled: 42,
      successRate: '83%',
      icon: User2
    },
    {
      id: 'juvenile',
      title: '청소년 관련',
      description: '학교폭력, 청소년 범죄, 비행 등',
      casesHandled: 67,
      successRate: '89%',
      icon: BookOpen
    },
    {
      id: 'economic_crime',
      title: '경제범죄',
      description: '횡령, 배임, 조세범죄, 주가조작 등',
      casesHandled: 85,
      successRate: '82%',
      icon: Building
    },
    {
      id: 'intellectual_crime',
      title: '지식재산권',
      description: '저작권침해, 상표침해, 특허침해 등',
      casesHandled: 58,
      successRate: '86%',
      icon: Pencil
    },
    {
      id: 'other_criminal',
      title: '기타 형사범죄',
      description: '마약, 공무집행방해, 기타 형법상 범죄 등',
      casesHandled: 95,
      successRate: '90%',
      icon: FileText
    }
  ];
  
  // 12 detailed civil types (6 categories)
  const civilTypes = [
    {
      id: 'loan',
      title: '대여금/금전',
      description: '대여금, 채무불이행, 금전거래 분쟁 등',
      casesHandled: 142,
      successRate: '86%',
      icon: CircleDollarSign
    },
    {
      id: 'contract',
      title: '계약분쟁',
      description: '계약해지, 계약위반, 보증 관련 분쟁 등',
      casesHandled: 96,
      successRate: '85%',
      icon: FileSpreadsheet
    },
    {
      id: 'real_estate',
      title: '부동산',
      description: '임대차, 매매, 재건축, 경계분쟁 등',
      casesHandled: 114,
      successRate: '88%',
      icon: Landmark
    },
    {
      id: 'family',
      title: '가족/상속',
      description: '이혼, 양육, 상속, 친권, 후견 등',
      casesHandled: 104,
      successRate: '91%',
      icon: Heart
    },
    {
      id: 'employment',
      title: '노동/인사',
      description: '해고, 임금, 근로시간, 산업재해 등',
      casesHandled: 76,
      successRate: '89%',
      icon: Briefcase
    },
    {
      id: 'corporate',
      title: '회사/기업',
      description: '주주간 분쟁, 이사회, 회사설립 등',
      casesHandled: 58,
      successRate: '85%',
      icon: Building
    },
    {
      id: 'medical',
      title: '의료분쟁',
      description: '의료사고, 의료과실, 손해배상 등',
      casesHandled: 47,
      successRate: '82%',
      icon: Accessibility
    },
    {
      id: 'administrative',
      title: '행정/세금',
      description: '행정처분, 세금분쟁, 인허가 등',
      casesHandled: 53,
      successRate: '84%',
      icon: FolderArchive
    },
    {
      id: 'ip_it',
      title: 'IT/지식재산',
      description: '저작권, 특허, 상표, 라이센스 등',
      casesHandled: 63,
      successRate: '87%',
      icon: Network
    },
    {
      id: 'finance',
      title: '금융/보험',
      description: '금융상품분쟁, 보험청구, 투자분쟁 등',
      casesHandled: 72,
      successRate: '83%',
      icon: Hourglass
    },
    {
      id: 'compensation',
      title: '손해배상',
      description: '각종 손해배상 청구, 불법행위 등',
      casesHandled: 118,
      successRate: '88%',
      icon: Scale
    },
    {
      id: 'other_civil',
      title: '기타 민사',
      description: '기타 민사소송, 비송사건 등',
      casesHandled: 83,
      successRate: '86%',
      icon: Gavel
    }
  ];

  const handleCategoryChange = (newCategory: 'criminal' | 'civil') => {
    setCategory(newCategory);
    // Reset selection when changing categories
    if (
      (newCategory === 'criminal' && !criminalTypes.some(type => type.id === selectedType)) ||
      (newCategory === 'civil' && !civilTypes.some(type => type.id === selectedType))
    ) {
      onSelect('');
    }
  };

  const handleSelect = (typeId: string) => {
    onSelect(typeId);
    // Auto-advance to next step after selection
    setTimeout(() => {
      const nextStepButton = document.querySelector('[data-next-step="true"]') as HTMLButtonElement;
      if (nextStepButton) {
        nextStepButton.click();
      }
    }, 300);
  };

  const renderTypeCards = (types: typeof criminalTypes) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
      {types.map(type => (
        <TooltipProvider key={type.id} delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                className={`flex flex-col items-center cursor-pointer transition-all hover-lift card-3d`}
                onClick={() => handleSelect(type.id)}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 border-2 transition-all duration-300 ${
                  selectedType === type.id 
                    ? 'border-legal-accent bg-legal-accent/10 text-legal-accent shadow-md scale-110' 
                    : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}>
                  <type.icon className="h-6 w-6" />
                </div>
                <span className={`text-center text-xs sm:text-sm font-medium ${
                  selectedType === type.id ? 'text-legal-accent' : 'text-gray-700'
                }`}>{type.title}</span>
                {statsVisible && (
                  <div className="mt-1 text-xs text-gray-500 text-center opacity-0 transition-opacity duration-500" style={{opacity: 1}}>
                    <p className="font-medium text-legal-accent text-xs">{type.casesHandled}건 · {type.successRate}</p>
                  </div>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-white p-3 shadow-premium border border-gray-100 max-w-xs">
              <p className="font-medium text-gray-900">{type.title}</p>
              <p className="text-sm text-gray-600 mt-1">{type.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="reveal">
        <h2 className="text-xl font-semibold text-legal-primary font-serif">사건 유형 선택</h2>
        <p className="text-gray-600 mb-6">귀하의 사건에 해당하는 유형을 선택하세요.</p>
      </div>
      
      <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg mb-6 reveal">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <div className="text-center">
              <p className="text-sm font-medium text-legal-primary">
                <span className="font-serif text-base">월 평균 상담 건수</span>
              </p>
              <p className="text-2xl font-bold text-legal-accent">320<span className="text-sm ml-1">건</span></p>
            </div>
          </div>
          <div className="h-10 border-r border-blue-200 hidden md:block"></div>
          <div className="flex items-center space-x-2">
            <div className="text-center">
              <p className="text-sm font-medium text-legal-primary">
                <span className="font-serif text-base">고객 만족도</span>
              </p>
              <p className="text-2xl font-bold text-legal-accent">94<span className="text-sm ml-1">%</span></p>
            </div>
          </div>
          <div className="h-10 border-r border-blue-200 hidden md:block"></div>
          <div className="flex items-center space-x-2">
            <div className="text-center">
              <p className="text-sm font-medium text-legal-primary">
                <span className="font-serif text-base">평균 소송 기간 단축</span>
              </p>
              <p className="text-2xl font-bold text-legal-accent">43<span className="text-sm ml-1">%</span></p>
            </div>
          </div>
        </div>
      </div>
      
      <Tabs value={category} onValueChange={(val: string) => handleCategoryChange(val as 'criminal' | 'civil')} className="reveal">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="criminal" className="btn-ripple">형사</TabsTrigger>
          <TabsTrigger value="civil" className="btn-ripple">민사</TabsTrigger>
        </TabsList>
        
        <TabsContent value="criminal">
          {renderTypeCards(criminalTypes)}
        </TabsContent>
        
        <TabsContent value="civil">
          {renderTypeCards(civilTypes)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentTypeSelector;
