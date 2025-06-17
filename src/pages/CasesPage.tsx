import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, CircleDollarSign, MessageSquare, AlertTriangle, UserX, Ban, FileText, FileSpreadsheet, Network, User2, Pencil, Briefcase, Landmark, BookOpen, Accessibility, Gavel, BadgeAlert, Phone, Building, FolderArchive, Hourglass, Shield, Car, Heart, Scale } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const CasesPage = () => {
  const { toast } = useToast();
  
  const handleCallClick = () => {
    toast({
      title: "유료 법률 상담",
      description: "060-604-1000 번호는 분당 3,000원의 유료 법률 상담 서비스입니다.",
      variant: "default",
    });
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="criminal" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="criminal">형사사건</TabsTrigger>
              <TabsTrigger value="civil">민사사건</TabsTrigger>
            </TabsList>
            
            <TabsContent value="criminal" className="mt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {criminalCases.map((caseType, index) => (
                  <CaseTypeCard key={index} caseType={caseType} />
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold text-legal-primary mb-4">대표적인 형사사건 유형</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredCriminalCases.map((caseType, index) => (
                    <CaseCard key={index} caseType={caseType} />
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="civil" className="mt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {civilCases.map((caseType, index) => (
                  <CaseTypeCard key={index} caseType={caseType} />
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold text-legal-primary mb-4">대표적인 민사사건 유형</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredCivilCases.map((caseType, index) => (
                    <CaseCard key={index} caseType={caseType} />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-16 bg-blue-50 border border-blue-200 rounded-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-legal-primary">사건에 맞는 증거자료 준비하기</h2>
          <p className="text-gray-700 mb-6">
            고소장 작성 시 증거자료의 준비는 사건의 성공적인 진행을 위해 매우 중요합니다.
            사건 유형별로 어떤 증거자료를 준비해야 하는지 안내해 드립니다.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <CircleDollarSign className="h-5 w-5 text-legal-accent mr-2 mt-1" />
              <div>
                <span className="font-medium">사기 사건</span> - 거래 내역, 계좌이체 증명서, 계약서, 대화내용(문자메시지, 카카오톡 등)
              </div>
            </div>
            <div className="flex items-start">
              <MessageSquare className="h-5 w-5 text-legal-accent mr-2 mt-1" />
              <div>
                <span className="font-medium">명예훼손 사건</span> - 게시글 캡처, 대화내용, 녹음파일, 목격자 진술서
              </div>
            </div>
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-legal-accent mr-2 mt-1" />
              <div>
                <span className="font-medium">폭행/협박 사건</span> - 진단서, CCTV 영상, 사진, 음성녹음, 목격자 진술서
              </div>
            </div>
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-legal-accent mr-2 mt-1" />
              <div>
                <span className="font-medium">개인정보 침해</span> - 무단 사용 증거, 유출 경로 증명자료, 피해 내역
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Button className="bg-legal-primary hover:bg-legal-secondary">
              증거자료 준비 가이드 보기
            </Button>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">지금 바로 고소장 작성을 시작하세요</h2>
          <p className="text-gray-600 mb-8">
            간편한 절차를 통해 정확하고 효과적인 고소장을 작성할 수 있습니다
          </p>
          
          <Link to="/create-document">
            <Button size="lg" className="bg-legal-accent hover:bg-legal-primary text-white">
              고소장 작성하기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

// Simple case type card component for the grid view
const CaseTypeCard: React.FC<{ caseType: SimpleCaseType }> = ({ caseType }) => {
  return (
    <Link to={`/create-document?type=${caseType.id}`} className="group">
      <div className="flex flex-col items-center cursor-pointer transition-all hover:scale-105">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2 border-2 transition-all duration-300 border-gray-200 bg-gray-50 text-gray-600 group-hover:border-legal-accent group-hover:bg-legal-accent/10 group-hover:text-legal-accent">
          <caseType.icon className="h-6 w-6" />
        </div>
        <span className="text-center text-xs sm:text-sm font-medium text-gray-700 group-hover:text-legal-accent">{caseType.title}</span>
      </div>
    </Link>
  );
};

interface SimpleCaseType {
  id: string;
  title: string;
  icon: React.FC<{ className?: string }>;
}

interface DetailedCaseType {
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  exampleCases: string[];
  relevantLaws: string;
}

const CaseCard: React.FC<{ caseType: DetailedCaseType }> = ({ caseType }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="bg-blue-50 p-3 rounded-full">
            <caseType.icon className="h-6 w-6 text-legal-accent" />
          </div>
        </div>
        <CardTitle className="mt-2">{caseType.title}</CardTitle>
        <CardDescription>{caseType.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <p className="font-medium text-sm">대표적인 사례:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
            {caseType.exampleCases.map((example, index) => (
              <li key={index}>{example}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4 space-y-2">
          <p className="font-medium text-sm">관련 법규:</p>
          <p className="text-sm text-gray-600">{caseType.relevantLaws}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Link to="/create-document" className="w-full">
          <Button className="w-full bg-legal-primary hover:bg-legal-secondary">
            고소장 작성
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

// 형사사건 유형 (12개) - DocumentTypeSelector의 criminalTypes와 일치
const criminalCases: SimpleCaseType[] = [
  {
    id: 'sexual_crime',
    title: '성범죄',
    icon: AlertTriangle
  },
  {
    id: 'voice_phishing',
    title: '보이스피싱',
    icon: Phone
  },
  {
    id: 'traffic',
    title: '교통사고/범죄',
    icon: Car
  },
  {
    id: 'fraud',
    title: '일반사기',
    icon: CircleDollarSign
  },
  {
    id: 'assault',
    title: '폭행/협박',
    icon: BadgeAlert
  },
  {
    id: 'defamation',
    title: '명예훼손/모욕',
    icon: MessageSquare
  },
  {
    id: 'cybercrime',
    title: '사이버 범죄',
    icon: Shield
  },
  {
    id: 'stalking',
    title: '스토킹/괴롭힘',
    icon: User2
  },
  {
    id: 'juvenile',
    title: '청소년 관련',
    icon: BookOpen
  },
  {
    id: 'economic_crime',
    title: '경제범죄',
    icon: Building
  },
  {
    id: 'intellectual_crime',
    title: '지식재산권',
    icon: Pencil
  },
  {
    id: 'other_criminal',
    title: '기타 형사범죄',
    icon: FileText
  }
];

// 민사사건 유형 (12개) - DocumentTypeSelector의 civilTypes와 일치
const civilCases: SimpleCaseType[] = [
  {
    id: 'loan',
    title: '대여금/금전',
    icon: CircleDollarSign
  },
  {
    id: 'contract',
    title: '계약분쟁',
    icon: FileSpreadsheet
  },
  {
    id: 'real_estate',
    title: '부동산',
    icon: Landmark
  },
  {
    id: 'family',
    title: '가족/상속',
    icon: Heart
  },
  {
    id: 'employment',
    title: '노동/인사',
    icon: Briefcase
  },
  {
    id: 'corporate',
    title: '회사/기업',
    icon: Building
  },
  {
    id: 'medical',
    title: '의료분쟁',
    icon: Accessibility
  },
  {
    id: 'administrative',
    title: '행정/세금',
    icon: FolderArchive
  },
  {
    id: 'ip_it',
    title: 'IT/지식재산',
    icon: Network
  },
  {
    id: 'finance',
    title: '금융/보험',
    icon: Hourglass
  },
  {
    id: 'compensation',
    title: '손해배상',
    icon: Scale
  },
  {
    id: 'other_civil',
    title: '기타 민사',
    icon: Gavel
  }
];

// 대표적인 형사 사건 (상세 정보 제공)
const featuredCriminalCases: DetailedCaseType[] = [
  {
    title: "사기",
    description: "고의로 허위의 사실을 알려 타인의 재물이나 재산상 이익을 취득하는 행위",
    icon: CircleDollarSign,
    exampleCases: [
      "물품 대금을 받고 물품을 보내지 않은 경우",
      "허위 정보로 투자금을 유치한 경우",
      "계약금만 받고 잠적한 경우"
    ],
    relevantLaws: "형법 제347조(사기), 제348조(준사기), 특정경제범죄가중처벌법 제3조(사기) 등"
  },
  {
    title: "명예훼손",
    description: "공연히 사실 또는 허위사실을 적시하여 타인의 명예를 훼손하는 행위",
    icon: MessageSquare,
    exampleCases: [
      "허위 사실을 SNS에 게시한 경우",
      "진실이라도 공연히 타인의 명예를 훼손한 경우",
      "비방 목적으로 사실을 적시한 경우"
    ],
    relevantLaws: "형법 제307조(명예훼손), 정보통신망법 제70조(명예훼손) 등"
  },
  {
    title: "폭행/협박",
    description: "타인의 신체에 대한 유형력 행사 또는 해악을 고지하여 공포심을 일으키는 행위",
    icon: AlertTriangle,
    exampleCases: [
      "신체에 직접적인 폭력을 가한 경우",
      "위협적인 언행으로 공포심을 조성한 경우",
      "흉기로 위협한 경우"
    ],
    relevantLaws: "형법 제260조(폭행), 제283조(협박), 제284조(특수협박) 등"
  }
];

// 대표적인 민사 사건 (상세 정보 제공)
const featuredCivilCases: DetailedCaseType[] = [
  {
    title: "대여금 반환 청구",
    description: "금전을 빌려주고 이를 돌려받지 못한 경우의 반환 청구",
    icon: CircleDollarSign,
    exampleCases: [
      "개인 간 금전 대여 후 미상환",
      "사업자금 대여 후 미상환",
      "사채 관련 분쟁"
    ],
    relevantLaws: "민법 제598조(소비대차의 의미), 제603조(반환시기) 등"
  },
  {
    title: "부동산 계약 분쟁",
    description: "부동산 매매, 임대차 등 계약 관련 분쟁",
    icon: Landmark,
    exampleCases: [
      "부동산 매매계약 위반",
      "전세금 반환 문제",
      "임대차 계약 분쟁"
    ],
    relevantLaws: "민법 제536조(동시이행의 항변권), 주택임대차보호법 등"
  },
  {
    title: "손해배상 청구",
    description: "타인의 불법행위로 인한 손해의 배상 청구",
    icon: Scale,
    exampleCases: [
      "교통사고 손해배상",
      "영업방해로 인한 손해배상",
      "의료사고 손해배상"
    ],
    relevantLaws: "민법 제750조(불법행위의 내용), 제751조(재산 이외의 손해의 배상) 등"
  }
];

export default CasesPage;
