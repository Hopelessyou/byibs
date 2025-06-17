
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  FileText, 
  Users, 
  Calendar, 
  MessageSquare, 
  Clock, 
  BarChart4, 
  Shield, 
  ScrollText, 
  BriefcaseIcon
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import FirmLayout from '@/components/firm/FirmLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FirmDashboardPage = () => {
  const navigate = useNavigate();

  const upcomingCases = [
    { id: 1, title: "손해배상청구", client: "김민준", date: "2025-04-05 10:00", type: "민사" },
    { id: 2, title: "계약분쟁", client: "주식회사 테크놀로지", date: "2025-04-06 14:30", type: "상사" },
    { id: 3, title: "지식재산권", client: "이지훈", date: "2025-04-08 11:00", type: "특허" }
  ];

  const pendingConsultations = [
    { id: 1, subject: "계약검토 문의", client: "김민준", status: "대기중", date: "2025-04-04" },
    { id: 2, subject: "형사사건 상담", client: "박서연", status: "예약됨", date: "2025-04-07" }
  ];

  const outstandingInvoices = [
    { id: 1, client: "주식회사 테크놀로지", amount: 3000000, dueDate: "2025-04-15", status: "미납" },
    { id: 2, client: "이지훈", amount: 1500000, dueDate: "2025-04-10", status: "일부납부" },
    { id: 3, client: "최수민", amount: 2000000, dueDate: "2025-04-20", status: "미납" }
  ];

  const recentDocuments = [
    { id: 1, title: "손해배상 소장", case: "김민준 vs 주식회사 건설", date: "2025-04-02", type: "소장" },
    { id: 2, title: "답변서", case: "주식회사 테크놀로지 vs 박서연", date: "2025-04-01", type: "답변서" },
    { id: 3, title: "계약서 검토", case: "최수민", date: "2025-03-31", type: "계약서" }
  ];

  const caseStats = {
    active: 28,
    closed: 43,
    new: 5,
    consultations: 12
  };

  const featuresCards = [
    { title: "사건 관리", icon: BriefcaseIcon, path: "/firm/cases", color: "blue" },
    { title: "문서 관리", icon: FileText, path: "/firm/documents", color: "amber" },
    { title: "고객 관리", icon: Users, path: "/firm/clients", color: "green" },
    { title: "일정 관리", icon: Calendar, path: "/firm/calendar", color: "purple" },
    { title: "상담 관리", icon: MessageSquare, path: "/firm/consultations", color: "pink" },
    { title: "청구 관리", icon: Clock, path: "/firm/billing", color: "orange" },
    { title: "통계", icon: BarChart4, path: "/firm/analytics", color: "cyan" },
    { title: "설정", icon: Shield, path: "/firm/settings", color: "gray" }
  ];

  // Card colors based on the color prop
  const getCardColors = (color: string) => {
    const colors: {[key: string]: {bg: string, hover: string, text: string}} = {
      blue: { bg: "bg-blue-50", hover: "hover:bg-blue-100", text: "text-blue-700" },
      amber: { bg: "bg-amber-50", hover: "hover:bg-amber-100", text: "text-amber-700" },
      green: { bg: "bg-green-50", hover: "hover:bg-green-100", text: "text-green-700" },
      purple: { bg: "bg-purple-50", hover: "hover:bg-purple-100", text: "text-purple-700" },
      pink: { bg: "bg-pink-50", hover: "hover:bg-pink-100", text: "text-pink-700" },
      orange: { bg: "bg-orange-50", hover: "hover:bg-orange-100", text: "text-orange-700" },
      cyan: { bg: "bg-cyan-50", hover: "hover:bg-cyan-100", text: "text-cyan-700" },
      gray: { bg: "bg-gray-50", hover: "hover:bg-gray-100", text: "text-gray-700" }
    };
    return colors[color] || colors.blue;
  };

  return (
    <FirmLayout>
      <div className="container px-4 py-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">로펌 대시보드</h1>
            <p className="text-gray-600">법률 사무소 운영을 위한 통합 관리 시스템입니다.</p>
          </div>
          <div className="mt-4 md:mt-0 space-x-2">
            <Button onClick={() => navigate('/firm/cases/new')} className="bg-legal-primary hover:bg-legal-secondary">
              + 새 사건
            </Button>
            <Button onClick={() => navigate('/firm/consultations/new')} variant="outline" className="border-legal-primary text-legal-primary hover:bg-legal-primary hover:text-white">
              + 새 상담
            </Button>
          </div>
        </div>

        {/* 주요 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-blue-900">진행중 사건</p>
                  <p className="text-3xl font-bold text-blue-700">{caseStats.active}</p>
                </div>
                <BriefcaseIcon className="h-12 w-12 text-blue-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-green-900">완료된 사건</p>
                  <p className="text-3xl font-bold text-green-700">{caseStats.closed}</p>
                </div>
                <FileText className="h-12 w-12 text-green-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-amber-50">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-amber-900">새 사건</p>
                  <p className="text-3xl font-bold text-amber-700">{caseStats.new}</p>
                </div>
                <BriefcaseIcon className="h-12 w-12 text-amber-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-purple-900">예정된 상담</p>
                  <p className="text-3xl font-bold text-purple-700">{caseStats.consultations}</p>
                </div>
                <MessageSquare className="h-12 w-12 text-purple-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 기능 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {featuresCards.map((feature, index) => {
            const colors = getCardColors(feature.color);
            return (
              <Card 
                key={index} 
                className={`cursor-pointer transition-all ${colors.bg} ${colors.hover} border-transparent hover:shadow-md`}
                onClick={() => navigate(feature.path)}
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <feature.icon className={`h-10 w-10 mb-3 ${colors.text}`} />
                  <h3 className={`font-medium ${colors.text}`}>{feature.title}</h3>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 탭 컨텐츠: 일정, 상담, 청구, 문서 */}
        <Tabs defaultValue="calendar" className="w-full mb-8">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="calendar">기일/일정</TabsTrigger>
            <TabsTrigger value="consultations">상담</TabsTrigger>
            <TabsTrigger value="billing">청구/미수금</TabsTrigger>
            <TabsTrigger value="documents">최근 문서</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">다가오는 기일 및 일정</CardTitle>
                <CardDescription>오늘 이후의 예정된 법원 기일과 미팅</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {upcomingCases.map(item => (
                    <div key={item.id} className="flex justify-between py-2 border-b">
                      <div>
                        <p className="font-medium text-gray-800">{item.title}</p>
                        <p className="text-sm text-gray-500">의뢰인: {item.client}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{item.date}</p>
                        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                          {item.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="ml-auto" onClick={() => navigate('/firm/calendar')}>
                  전체 일정 보기
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="consultations">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">대기 중인 상담</CardTitle>
                <CardDescription>상담 신청 및 예약된 일정</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {pendingConsultations.map(item => (
                    <div key={item.id} className="flex justify-between py-2 border-b">
                      <div>
                        <p className="font-medium text-gray-800">{item.subject}</p>
                        <p className="text-sm text-gray-500">의뢰인: {item.client}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{item.date}</p>
                        <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                          item.status === '대기중' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="ml-auto" onClick={() => navigate('/firm/consultations')}>
                  전체 상담 보기
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">미수금 현황</CardTitle>
                <CardDescription>아직 결제되지 않은 청구서</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {outstandingInvoices.map(item => (
                    <div key={item.id} className="flex justify-between py-2 border-b">
                      <div>
                        <p className="font-medium text-gray-800">{item.client}</p>
                        <p className="text-sm text-gray-500">마감일: {item.dueDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{item.amount.toLocaleString()}원</p>
                        <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                          item.status === '미납' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="ml-auto" onClick={() => navigate('/firm/billing')}>
                  전체 청구 보기
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">최근 문서</CardTitle>
                <CardDescription>최근에 등록되거나 수정된 문서</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recentDocuments.map(item => (
                    <div key={item.id} className="flex justify-between py-2 border-b">
                      <div>
                        <p className="font-medium text-gray-800">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.case}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{item.date}</p>
                        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-800">
                          {item.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="ml-auto" onClick={() => navigate('/firm/documents')}>
                  전체 문서 보기
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* AI 기능 안내 */}
        <Card className="bg-gradient-to-r from-legal-accent/10 to-legal-primary/10 border-legal-accent/20 mb-6">
          <CardHeader>
            <CardTitle className="text-legal-primary">AI 법률 비서 기능</CardTitle>
            <CardDescription>인공지능으로 법률 업무 효율을 높이세요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-4">
                <ScrollText className="h-10 w-10 text-legal-accent mb-2" />
                <h3 className="font-medium text-legal-primary mb-1">법률 문서 AI 작성</h3>
                <p className="text-sm text-gray-600">소장, 답변서, 준비서면 등 초안 자동 생성</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <MessageSquare className="h-10 w-10 text-legal-accent mb-2" />
                <h3 className="font-medium text-legal-primary mb-1">상담 음성 자동 기록</h3>
                <p className="text-sm text-gray-600">대화 내용을 텍스트로 자동 변환하여 저장</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <FileText className="h-10 w-10 text-legal-accent mb-2" />
                <h3 className="font-medium text-legal-primary mb-1">문서 OCR 및 검색</h3>
                <p className="text-sm text-gray-600">PDF 스캔본에서 텍스트 추출 및 전체 검색</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full border-legal-accent text-legal-accent hover:bg-legal-accent hover:text-white">
              AI 기능 자세히 알아보기
            </Button>
          </CardFooter>
        </Card>
      </div>
    </FirmLayout>
  );
};

export default FirmDashboardPage;
