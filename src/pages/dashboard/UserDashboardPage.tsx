import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Bell, CreditCard, Settings, User, ShieldCheck, HelpCircle, Gavel } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Statistic } from '@/components/ui/statistic';
import { DocumentStatus } from '@/types/document';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import IncidentStatusPage from './IncidentStatusPage';

const UserDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userId } = useAuth();
  const [tab, setTab] = useState('documents');

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Or loading spinner
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">대시보드</h1>
          <p className="text-gray-600 mt-1">내 계정과 문서를 관리하세요.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">내 프로필</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/placeholder.svg" alt="프로필 이미지" />
                    <AvatarFallback>사용자</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold mb-1">홍길동</h3>
                  <p className="text-sm text-gray-600 mb-4">user@example.com</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    프로필 수정
                  </Button>
                </div>

                <div className="mt-6 space-y-1">
                  <SidebarLink icon={<FileText className="h-4 w-4" />} label="내 문서" onClick={() => setTab('documents')} active={tab === 'documents'} />
                  <SidebarLink icon={<Gavel className="h-4 w-4" />} label="내 사건 현황" onClick={() => setTab('incident-status')} active={tab === 'incident-status'} />
                  <SidebarLink icon={<Bell className="h-4 w-4" />} label="알림" onClick={() => setTab('notifications')} badge="3" active={tab === 'notifications'} />
                  <SidebarLink icon={<CreditCard className="h-4 w-4" />} label="결제 내역" onClick={() => setTab('payments')} active={tab === 'payments'} />
                  <SidebarLink icon={<User className="h-4 w-4" />} label="계정 정보" onClick={() => setTab('account')} active={tab === 'account'} />
                  <SidebarLink icon={<HelpCircle className="h-4 w-4" />} label="고객 지원" onClick={() => setTab('support')} active={tab === 'support'} />
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">내 구독</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-3 rounded-lg bg-legal-primary/10 mb-3">
                  <span className="font-medium text-legal-primary">기본 플랜</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  이번 달 문서 남은 건수: <span className="font-semibold">3</span>/5
                </p>
                <Progress value={60} className="h-2 mb-3" />
                <Button size="sm" className="w-full">플랜 업그레이드</Button>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="mb-6 w-full grid grid-cols-6">
                <TabsTrigger value="documents">내 문서</TabsTrigger>
                <TabsTrigger value="incident-status">내 사건 현황</TabsTrigger>
                <TabsTrigger value="notifications">알림</TabsTrigger>
                <TabsTrigger value="payments">결제 내역</TabsTrigger>
                <TabsTrigger value="account">계정 정보</TabsTrigger>
                <TabsTrigger value="support">고객 지원</TabsTrigger>
              </TabsList>

              {/* Documents Tab */}
              <TabsContent value="documents" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatCard title="작성 문서" value={12} icon={<FileText />} />
                  <StatCard title="검토 중" value={3} icon={<Bell />} />
                  <StatCard title="완료" value={8} icon={<FileText />} />
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">최근 문서</CardTitle>
                    <CardDescription>최근에 작업한 문서 목록입니다.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <DocumentItem 
                        title="교통사고 고소장" 
                        type="traffic"
                        date="2023년 8월 15일" 
                        status="in_review"
                      />
                      <DocumentItem 
                        title="명예훼손 고소장" 
                        type="defamation"
                        date="2023년 8월 10일" 
                        status="approved"
                      />
                      <DocumentItem 
                        title="계약 위반 고소장" 
                        type="contract"
                        date="2023년 7월 25일" 
                        status="needs_revision"
                      />
                      <DocumentItem 
                        title="사기 고소장" 
                        type="fraud"
                        date="2023년 7월 15일" 
                        status="draft"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="outline">모든 문서 보기</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Incident Status Tab */}
              <TabsContent value="incident-status">
                <IncidentStatusPage />
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">알림</CardTitle>
                    <CardDescription>최근 알림과 업데이트 내용입니다.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <NotificationItem 
                        title="문서 검토 완료" 
                        message="'교통사고 고소장' 문서 검토가 완료되었습니다. 확인해주세요." 
                        time="1시간 전"
                        isNew={true}
                      />
                      <NotificationItem 
                        title="문서 피드백" 
                        message="'명예훼손 고소장'에 대한 수정 요청이 있습니다." 
                        time="3시간 전"
                        isNew={true}
                      />
                      <NotificationItem 
                        title="시스템 업데이트" 
                        message="새로운 문서 템플릿이 추가되었습니다. 지금 확인해보세요." 
                        time="1일 전"
                        isNew={false}
                      />
                      <NotificationItem 
                        title="구독 결제 알림" 
                        message="다음 주기 결제가 3일 후 예정되어 있습니다." 
                        time="2일 전"
                        isNew={false}
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="outline">모든 알림 보기</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Payments Tab */}
              <TabsContent value="payments">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">결제 내역</CardTitle>
                    <CardDescription>최근 결제 내역을 확인하세요.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="text-gray-600 border-b">
                          <th className="py-2 px-3 text-left">결제일</th>
                          <th className="py-2 px-3 text-left">상품명</th>
                          <th className="py-2 px-3 text-left">금액</th>
                          <th className="py-2 px-3 text-left">상태</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-3">2024-06-01</td>
                          <td className="py-2 px-3">기본 플랜</td>
                          <td className="py-2 px-3">9,900원</td>
                          <td className="py-2 px-3 text-green-600 font-semibold">결제완료</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-3">2024-05-01</td>
                          <td className="py-2 px-3">기본 플랜</td>
                          <td className="py-2 px-3">9,900원</td>
                          <td className="py-2 px-3 text-green-600 font-semibold">결제완료</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3">2024-04-01</td>
                          <td className="py-2 px-3">기본 플랜</td>
                          <td className="py-2 px-3">9,900원</td>
                          <td className="py-2 px-3 text-red-500 font-semibold">실패</td>
                        </tr>
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Account Tab */}
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">계정 설정</CardTitle>
                    <CardDescription>개인 정보 및 보안 설정을 관리하세요.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">기본 정보</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-600">이름</label>
                          <p className="font-medium">홍길동</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">이메일</label>
                          <p className="font-medium">user@example.com</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">가입일</label>
                          <p className="font-medium">2023년 7월 15일</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-600">휴대폰 번호</label>
                          <p className="font-medium">010-1234-5678</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-3">
                        정보 수정
                      </Button>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">보안</h3>
                      <Button variant="outline" size="sm" className="mr-2">
                        비밀번호 변경
                      </Button>
                      <Button variant="outline" size="sm">
                        2단계 인증 설정
                      </Button>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">알림 설정</h3>
                      <div className="space-y-2">
                        <NotificationSetting label="문서 상태 변경 알림" enabled={true} />
                        <NotificationSetting label="이메일 알림" enabled={true} />
                        <NotificationSetting label="마케팅 정보" enabled={false} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Support Tab */}
              <TabsContent value="support">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">고객 지원</CardTitle>
                    <CardDescription>문의사항이 있으시면 아래 양식을 작성해 주세요.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4 max-w-lg">
                      <div>
                        <label className="block text-sm font-medium mb-1">이름</label>
                        <input type="text" className="w-full border rounded px-3 py-2" placeholder="이름 입력" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">이메일</label>
                        <input type="email" className="w-full border rounded px-3 py-2" placeholder="이메일 입력" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">문의 내용</label>
                        <textarea className="w-full border rounded px-3 py-2" rows={4} placeholder="문의 내용을 입력해 주세요." />
                      </div>
                      <Button type="submit" className="w-full">문의 보내기</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </Layout>
  );
};

// Helper components
const SidebarLink = ({ 
  icon, 
  label, 
  onClick,
  active = false, 
  badge 
}: { 
  icon: React.ReactNode; 
  label: string;
  onClick?: () => void;
  active?: boolean; 
  badge?: string;
}) => {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <div 
        className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer
          ${active ? 'bg-legal-primary/10 text-legal-primary' : 'hover:bg-gray-100'}`}
      >
        <div className="flex items-center">
          <span className="mr-3">{icon}</span>
          <span className="text-sm">{label}</span>
        </div>
        {badge && (
          <span className="bg-legal-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }: { title: string; value: number; icon: React.ReactNode; }) => {
  return (
    <Card>
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-legal-primary/10 flex items-center justify-center text-legal-primary">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};

const DocumentItem = ({ 
  title, 
  type, 
  date, 
  status 
}: { 
  title: string; 
  type: string;
  date: string; 
  status: DocumentStatus;
}) => {
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
        return { label: '기타', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const { label, color } = getStatusInfo();

  return (
    <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
      <div className="flex items-center">
        <div className="mr-4 p-2 bg-gray-100 rounded">
          <FileText className="h-5 w-5 text-gray-600" />
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-xs text-gray-500 mt-1">
            <span className="capitalize">{type.replace('_', ' ')}</span> • {date}
          </p>
        </div>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full ${color}`}>
        {label}
      </span>
    </div>
  );
};

const NotificationItem = ({ 
  title, 
  message, 
  time, 
  isNew = false 
}: { 
  title: string; 
  message: string; 
  time: string; 
  isNew?: boolean;
}) => {
  return (
    <div className={`p-3 border rounded-lg ${isNew ? 'border-legal-primary/30 bg-legal-primary/5' : 'border-gray-100'}`}>
      <div className="flex justify-between">
        <h4 className="font-medium flex items-center">
          {title}
          {isNew && <span className="ml-2 w-2 h-2 rounded-full bg-legal-primary"></span>}
        </h4>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{message}</p>
    </div>
  );
};

const NotificationSetting = ({ 
  label, 
  enabled 
}: { 
  label: string; 
  enabled: boolean;
}) => {
  const [isEnabled, setIsEnabled] = useState(enabled);

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          className="sr-only" 
          checked={isEnabled} 
          onChange={() => setIsEnabled(!isEnabled)} 
        />
        <div className={`w-9 h-5 rounded-full transition-colors ${isEnabled ? 'bg-legal-primary' : 'bg-gray-300'}`}>
          <div className={`absolute w-3.5 h-3.5 bg-white rounded-full transition-transform left-[3px] top-[3px] ${isEnabled ? 'translate-x-4' : ''}`}></div>
        </div>
      </label>
    </div>
  );
};

export default UserDashboardPage;
