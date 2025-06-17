
import React from 'react';
import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/auth/LoginForm';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, ShieldCheck, Bell, CreditCard, Settings, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LoginPage = () => {
  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col lg:flex-row py-12 px-4 gap-8 max-w-7xl mx-auto">
        {/* Left Side - Login Form */}
        <div className="w-full lg:w-2/5 flex flex-col">
          <nav className="mb-6 self-start">
            <Link to="/" className="flex items-center text-gray-500 hover:text-legal-accent transition-colors" aria-label="홈으로 돌아가기">
              <ArrowLeft className="h-4 w-4 mr-1" aria-hidden="true" />
              홈으로 돌아가기
            </Link>
          </nav>
          
          <div className="bg-white rounded-xl shadow-lg p-8 flex-1">
            <header className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800">로그인</h1>
              <p className="text-gray-600 mt-2">계정에 로그인하여 서비스를 이용하세요</p>
            </header>
            
            <LoginForm />
            
            <footer className="mt-8 text-center text-xs text-gray-500">
              <p className="mb-2">
                로그인하시면 <Link to="/terms" className="underline">이용약관</Link> 및 <Link to="/privacy" className="underline">개인정보처리방침</Link>에 동의하는 것으로 간주됩니다.
              </p>
              <p>
                보안 모드로 로그인 됩니다. 이용 중 문제가 있으시면 <Link to="/contact" className="text-legal-accent hover:underline">고객센터</Link>로 문의해주세요.
              </p>
            </footer>
          </div>
        </div>
        
        {/* Right Side - Features */}
        <div className="w-full lg:w-3/5 mt-8 lg:mt-0">
          <div className="bg-white rounded-xl shadow-lg p-8 h-full">
            <h2 className="text-xl font-bold mb-6">로그인 후 이용 가능한 서비스</h2>
            
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="dashboard">대시보드</TabsTrigger>
                <TabsTrigger value="account">계정 관리</TabsTrigger>
                <TabsTrigger value="support">고객 지원</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FeatureCard 
                    icon={<FileText className="h-5 w-5 text-legal-primary" />}
                    title="문서 관리 대시보드"
                    description="작성한 모든 문서를 한눈에 확인하고 관리하세요. 상태별로 정렬하고 검색할 수 있습니다."
                  />
                  <FeatureCard 
                    icon={<Bell className="h-5 w-5 text-legal-primary" />}
                    title="알림 센터"
                    description="문서 상태 변경, 검토 완료, 피드백 등의 알림을 실시간으로 받아보세요."
                  />
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">문서 진행 현황</h3>
                  <p className="text-sm text-gray-600">로그인하면 작성 중인 모든 문서의 진행 상태를 확인하고, 중단한 곳에서 이어서 작업할 수 있습니다.</p>
                  <div className="mt-4 flex items-center gap-3">
                    <StatusBadge status="draft" />
                    <StatusBadge status="pending_review" />
                    <StatusBadge status="in_review" />
                    <StatusBadge status="approved" />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="account" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FeatureCard 
                    icon={<Settings className="h-5 w-5 text-legal-primary" />}
                    title="프로필 및 계정 설정"
                    description="개인정보 관리, 비밀번호 변경, 프로필 사진 설정 등 계정 설정을 관리하세요."
                  />
                  <FeatureCard 
                    icon={<ShieldCheck className="h-5 w-5 text-legal-primary" />}
                    title="보안 설정"
                    description="이중 인증(2FA) 설정, 로그인 기록 확인 등 계정 보안을 강화하세요."
                  />
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">결제 및 구독 관리</h3>
                  <p className="text-sm text-gray-600">현재 구독 상태 확인, 플랜 변경, 결제 내역 관리 등 결제 관련 기능을 이용할 수 있습니다.</p>
                  <div className="mt-2 flex gap-2">
                    <CreditCard className="h-4 w-4 text-legal-primary" />
                    <span className="text-xs text-gray-600">안전한 결제 시스템으로 개인정보를 보호합니다.</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="support" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FeatureCard 
                    icon={<HelpCircle className="h-5 w-5 text-legal-primary" />}
                    title="1:1 고객 상담"
                    description="문의사항이나 문제가 있을 때 1:1 상담을 통해 빠르게 해결하세요."
                  />
                  <FeatureCard 
                    icon={<FileText className="h-5 w-5 text-legal-primary" />}
                    title="FAQ 및 도움말"
                    description="자주 묻는 질문과 서비스 이용 가이드를 통해 쉽게 해결책을 찾을 수 있습니다."
                  />
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">소식 구독</h3>
                  <p className="text-sm text-gray-600">법률 정보와 서비스 업데이트 소식을 정기적으로 받아보세요.</p>
                  <div className="mt-4 flex justify-center">
                    <Link to="/register" className="text-legal-accent hover:underline text-sm font-medium">회원가입하고 모든 기능 이용하기</Link>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Helper component for feature cards
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <Card className="border border-gray-100 hover:border-legal-primary/20 transition-colors">
      <CardContent className="p-4 flex items-start gap-3">
        <div className="mt-0.5">{icon}</div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper component for status badges
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusInfo = () => {
    switch (status) {
      case 'draft':
        return { label: '작성 중', color: 'bg-blue-100 text-blue-800' };
      case 'pending_review':
        return { label: '검토 대기', color: 'bg-yellow-100 text-yellow-800' };
      case 'in_review':
        return { label: '검토 중', color: 'bg-purple-100 text-purple-800' };
      case 'needs_revision':
        return { label: '수정 필요', color: 'bg-orange-100 text-orange-800' };
      case 'approved':
        return { label: '승인 완료', color: 'bg-green-100 text-green-800' };
      case 'rejected':
        return { label: '반려', color: 'bg-red-100 text-red-800' };
      default:
        return { label: status, color: 'bg-gray-100 text-gray-800' };
    }
  };
  
  const { label, color } = getStatusInfo();
  
  return (
    <span className={`text-xs px-2 py-1 rounded-full ${color}`}>
      {label}
    </span>
  );
};

export default LoginPage;
