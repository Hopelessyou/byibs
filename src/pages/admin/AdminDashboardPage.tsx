
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Users, 
  UserPlus,
  CreditCard,
  MessageSquare
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// 랜덤 데이터 생성 함수들
const generateUserData = () => ([
  { name: '1월', 신규가입: Math.floor(Math.random() * 100) + 50, 누적가입: Math.floor(Math.random() * 500) + 200 },
  { name: '2월', 신규가입: Math.floor(Math.random() * 100) + 50, 누적가입: Math.floor(Math.random() * 500) + 250 },
  { name: '3월', 신규가입: Math.floor(Math.random() * 100) + 50, 누적가입: Math.floor(Math.random() * 500) + 300 },
  { name: '4월', 신규가입: Math.floor(Math.random() * 100) + 50, 누적가입: Math.floor(Math.random() * 500) + 350 },
  { name: '5월', 신규가입: Math.floor(Math.random() * 100) + 50, 누적가입: Math.floor(Math.random() * 500) + 400 },
  { name: '6월', 신규가입: Math.floor(Math.random() * 100) + 50, 누적가입: Math.floor(Math.random() * 500) + 450 },
]);

const generateRevenueData = () => ([
  { name: '1월', 수익: Math.floor(Math.random() * 5000000) + 1000000 },
  { name: '2월', 수익: Math.floor(Math.random() * 5000000) + 1000000 },
  { name: '3월', 수익: Math.floor(Math.random() * 5000000) + 1000000 },
  { name: '4월', 수익: Math.floor(Math.random() * 5000000) + 1000000 },
  { name: '5월', 수익: Math.floor(Math.random() * 5000000) + 1000000 },
  { name: '6월', 수익: Math.floor(Math.random() * 5000000) + 1000000 },
]);

const generatePlanData = () => ([
  { name: '무료', value: Math.floor(Math.random() * 100) + 50 },
  { name: '기본', value: Math.floor(Math.random() * 100) + 30 },
  { name: '프리미엄', value: Math.floor(Math.random() * 100) + 20 }
]);

const generateRecentPayments = () => {
  const payments = [];
  const plans = ['기본 플랜', '프리미엄 플랜'];
  const users = ['김철수', '이영희', '박지민', '최수연', '정민호'];
  
  for (let i = 0; i < 5; i++) {
    const today = new Date();
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    payments.push({
      id: `PM-${1000 + i}`,
      user: users[Math.floor(Math.random() * users.length)],
      plan: plans[Math.floor(Math.random() * plans.length)],
      amount: Math.floor(Math.random() * 50000) + 20000,
      date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    });
  }
  
  return payments;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminDashboardPage = () => {
  const { isAdmin, documents, loadDocuments, isLoading } = useAdmin();
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState(generateUserData());
  const [revenueData, setRevenueData] = useState(generateRevenueData());
  const [planData, setPlanData] = useState(generatePlanData());
  const [recentPayments, setRecentPayments] = useState(generateRecentPayments());
  
  useEffect(() => {
    if (isAdmin) {
      loadDocuments();
    } else {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate, loadDocuments]);
  
  // 문서 상태별 카운트
  const pendingReviewCount = documents.filter(doc => 
    doc.status === 'pending_review' || doc.status === 'in_review'
  ).length;
  
  const needsRevisionCount = documents.filter(doc => 
    doc.status === 'needs_revision'
  ).length;
  
  const approvedCount = documents.filter(doc => 
    doc.status === 'approved'
  ).length;
  
  // 오늘의 통계 데이터 (가상 데이터)
  const todayStats = {
    newUsers: Math.floor(Math.random() * 20) + 5,
    activeUsers: Math.floor(Math.random() * 100) + 50,
    revenue: Math.floor(Math.random() * 1000000) + 500000,
    tickets: Math.floor(Math.random() * 10) + 2
  };
  
  // 서비스 현황 요약
  const serviceStatus = {
    totalUsers: 1250, // 가상 데이터
    dailyActive: 450,
    weeklyActive: 780,
    monthlyActive: 950
  };
  
  const handleViewDocuments = () => {
    navigate('/admin/documents');
  };
  
  const handleViewUsers = () => {
    navigate('/admin/users');
  };
  
  const handleViewBilling = () => {
    navigate('/admin/billing');
  };
  
  const handleViewSupport = () => {
    navigate('/admin/support');
  };

  return (
    <AdminLayout title="관리자 대시보드">
      {/* 오늘의 핵심 지표 */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-800 mb-4">오늘의 핵심 지표</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 flex flex-col">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">신규 사용자</p>
                <UserPlus className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold mt-2">{todayStats.newUsers}명</p>
              <p className="text-xs text-green-600 mt-1">+12% 전일 대비</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex flex-col">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">활성 사용자</p>
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold mt-2">{todayStats.activeUsers}명</p>
              <p className="text-xs text-blue-600 mt-1">+5% 전일 대비</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex flex-col">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">일일 수익</p>
                <CreditCard className="h-5 w-5 text-legal-primary" />
              </div>
              <p className="text-2xl font-bold mt-2">{(todayStats.revenue).toLocaleString()}원</p>
              <p className="text-xs text-legal-primary mt-1">+8% 전일 대비</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex flex-col">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">새 문의</p>
                <MessageSquare className="h-5 w-5 text-amber-500" />
              </div>
              <p className="text-2xl font-bold mt-2">{todayStats.tickets}건</p>
              <p className="text-xs text-amber-600 mt-1">-2건 전일 대비</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* 사용자 및 수익 통계 */}
      <div className="mb-8">
        <Tabs defaultValue="users">
          <TabsList className="mb-4">
            <TabsTrigger value="users">사용자 통계</TabsTrigger>
            <TabsTrigger value="revenue">수익 추이</TabsTrigger>
            <TabsTrigger value="plans">구독 플랜</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>월별 사용자 가입 현황</CardTitle>
                <CardDescription>신규 가입자 및 누적 가입자 추이</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={userData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="신규가입" fill="#8884d8" />
                    <Bar dataKey="누적가입" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>월별 수익 추이</CardTitle>
                <CardDescription>구독 및 추가 서비스 포함 총 수익</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                      tickFormatter={(value) => `${(value/1000000).toFixed(1)}M`}
                    />
                    <RechartsTooltip formatter={(value) => [`${value.toLocaleString()}원`, '수익']} />
                    <Line type="monotone" dataKey="수익" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="plans">
            <Card>
              <CardHeader>
                <CardTitle>구독 플랜별 사용자 비율</CardTitle>
                <CardDescription>현재 활성화된 구독 유형별 사용자 분포</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex items-center justify-center h-full">
                  <ResponsiveContainer width="70%" height="100%">
                    <PieChart>
                      <Pie
                        data={planData}
                        innerRadius={80}
                        outerRadius={120}
                        dataKey="value"
                        nameKey="name"
                        label={(entry) => `${entry.name}: ${entry.value}명`}
                      >
                        {planData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip formatter={(value, name) => [`${value}명`, name]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* 문서 현황 및 최근 결제 내역 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 문서 현황 */}
        <Card>
          <CardHeader>
            <CardTitle>문서 현황</CardTitle>
            <CardDescription>현재 진행 중인 문서 상태별 요약</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-500" />
                    <span className="font-medium">검토 대기 중</span>
                  </div>
                  <span>{pendingReviewCount}건</span>
                </div>
                <Progress value={pendingReviewCount * 5} className="h-2 bg-gray-100" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <span className="font-medium">수정 필요</span>
                  </div>
                  <span>{needsRevisionCount}건</span>
                </div>
                <Progress value={needsRevisionCount * 5} className="h-2 bg-gray-100" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="font-medium">검토 완료</span>
                  </div>
                  <span>{approvedCount}건</span>
                </div>
                <Progress value={approvedCount * 5} className="h-2 bg-gray-100" />
              </div>
              
              <div className="mt-4 pt-4 border-t flex justify-center">
                <Button 
                  onClick={handleViewDocuments}
                  variant="outline"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  문서 관리로 이동
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* 최근 결제 내역 */}
        <Card>
          <CardHeader>
            <CardTitle>최근 결제 내역</CardTitle>
            <CardDescription>지난 5일간의 결제 기록</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>사용자</TableHead>
                  <TableHead>플랜</TableHead>
                  <TableHead>금액</TableHead>
                  <TableHead>날짜</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.user}</TableCell>
                    <TableCell>{payment.plan}</TableCell>
                    <TableCell>{payment.amount.toLocaleString()}원</TableCell>
                    <TableCell>{payment.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="mt-4 pt-4 border-t flex justify-center">
              <Button 
                onClick={handleViewBilling}
                variant="outline"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                결제 관리로 이동
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* 빠른 액세스 버튼 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Users className="h-10 w-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-medium mb-2">사용자 관리</h3>
            <p className="text-sm text-gray-600 mb-4">총 {serviceStatus.totalUsers}명의 사용자 관리</p>
            <Button onClick={handleViewUsers} variant="outline" className="border-blue-300">
              사용자 목록 보기
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-legal-primary/5 border-legal-primary/20">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <CreditCard className="h-10 w-10 text-legal-primary mb-4" />
            <h3 className="text-lg font-medium mb-2">결제/구독 관리</h3>
            <p className="text-sm text-gray-600 mb-4">플랜 설정 및 결제 이력 관리</p>
            <Button onClick={handleViewBilling} variant="outline" className="border-legal-primary/30">
              결제 내역 보기
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <MessageSquare className="h-10 w-10 text-amber-600 mb-4" />
            <h3 className="text-lg font-medium mb-2">문의/CS 관리</h3>
            <p className="text-sm text-gray-600 mb-4">미해결 티켓 {Math.floor(Math.random() * 10) + 2}건</p>
            <Button onClick={handleViewSupport} variant="outline" className="border-amber-300">
              문의 내역 보기
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
