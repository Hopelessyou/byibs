import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { 
  CreditCard, 
  Search, 
  Download, 
  Plus, 
  Pencil, 
  Trash, 
  Check, 
  X,
  RefreshCw 
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const generatePaymentHistory = (count: number) => {
  const users = ['김철수', '이영희', '박지민', '최수연', '정민호', '윤서영', '한지훈', '송혜린'];
  const plans = ['기본 플랜', '프리미엄 플랜'];
  const statuses = ['완료', '취소', '환불', '대기 중'];
  const paymentMethods = ['신용카드', '체크카드', '계좌이체', '가상계좌'];
  
  return Array.from({ length: count }).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 60)); // 지난 60일 내 날짜
    
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const amount = status === '취소' || status === '환불' 
      ? -1 * (Math.floor(Math.random() * 50) + 1) * 10000
      : (Math.floor(Math.random() * 50) + 1) * 10000;
    
    return {
      id: `payment-${1000 + index}`,
      user: users[Math.floor(Math.random() * users.length)],
      email: `user${Math.floor(Math.random() * 100)}@example.com`,
      plan: plans[Math.floor(Math.random() * plans.length)],
      amount,
      status,
      date: date.toISOString().split('T')[0],
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
    };
  });
};

const generateSubscriptionPlans = () => {
  return [
    {
      id: 'free',
      name: '무료 플랜',
      price: 0,
      billingCycle: '-',
      features: ['월 3건 문서 작성', '기본 템플릿 접근', '일반 문서 생성'],
      usersCount: 450,
    },
    {
      id: 'basic',
      name: '기본 플랜',
      price: 29000,
      billingCycle: '월간',
      features: ['월 20건 문서 작성', '모든 템플릿 접근', '우선 검토', '이메일 지원'],
      usersCount: 320,
    },
    {
      id: 'premium',
      name: '프리미엄 플랜',
      price: 89000,
      billingCycle: '월간',
      features: ['무제한 문서 작성', '전문가 검토', '우선 지원', 'API 접근', '전용 매니저'],
      usersCount: 130,
    },
    {
      id: 'enterprise',
      name: '기업용 플랜',
      price: null, // 별도 협의
      billingCycle: '연간',
      features: ['맞춤형 문서 템플릿', '전담 법무팀', '기업 통합 로그인', '관리자 대시보드', '사용자별 권한 설정'],
      usersCount: 5,
    }
  ];
};

const generateRevenueData = () => [
  { name: '1월', 월구독: 3500000, 연구독: 12000000 },
  { name: '2월', 월구독: 4200000, 연구독: 10000000 },
  { name: '3월', 월구독: 3800000, 연구독: 15000000 },
  { name: '4월', 월구독: 4500000, 연구독: 18000000 },
  { name: '5월', 월구독: 5100000, 연구독: 20000000 },
  { name: '6월', 월구독: 6200000, 연구독: 22000000 },
];

const generatePlanDistributionData = () => [
  { name: '무료', value: 450 },
  { name: '기본', value: 320 },
  { name: '프리미엄', value: 130 },
  { name: '기업용', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const BillingManagementPage = () => {
  const [payments] = useState(generatePaymentHistory(50));
  const [subscriptionPlans] = useState(generateSubscriptionPlans());
  const [revenueData] = useState(generateRevenueData());
  const [planDistribution] = useState(generatePlanDistributionData());
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  
  const handleExportCSV = () => {
    console.log('결제 기록을 CSV로 내보내기');
  };
  
  const [editingPlan, setEditingPlan] = useState<string | null>(null);
  
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
      payment.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? payment.status === statusFilter : true;
    
    let matchesDate = true;
    if (dateFilter === 'today') {
      const today = new Date().toISOString().split('T')[0];
      matchesDate = payment.date === today;
    } else if (dateFilter === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const paymentDate = new Date(payment.date);
      matchesDate = paymentDate >= weekAgo;
    } else if (dateFilter === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      const paymentDate = new Date(payment.date);
      matchesDate = paymentDate >= monthAgo;
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });
  
  const handleDeletePlan = (planId: string) => {
    console.log(`플랜 ${planId} 삭제 처리`);
  };
  
  const handleSavePlan = (planId: string) => {
    console.log(`플랜 ${planId} 변경사항 저장`);
    setEditingPlan(null);
  };
  
  return (
    <AdminLayout title="결제/구독 관리">
      <Tabs defaultValue="payments">
        <TabsList className="mb-6">
          <TabsTrigger value="payments">결제 내역</TabsTrigger>
          <TabsTrigger value="plans">구독 플랜</TabsTrigger>
          <TabsTrigger value="analytics">매출 분석</TabsTrigger>
        </TabsList>
        
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>결제 내역</CardTitle>
              <CardDescription>
                고객 결제, 환불, 취소 내역을 관리합니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="사용자 이름 또는 이메일로 검색"
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-4">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="상태 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">모든 상태</SelectItem>
                      <SelectItem value="완료">완료</SelectItem>
                      <SelectItem value="취소">취소</SelectItem>
                      <SelectItem value="환불">환불</SelectItem>
                      <SelectItem value="대기 중">대기 중</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="기간 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체 기간</SelectItem>
                      <SelectItem value="today">오늘</SelectItem>
                      <SelectItem value="week">최근 7일</SelectItem>
                      <SelectItem value="month">최근 30일</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" onClick={handleExportCSV}>
                    <Download className="h-4 w-4 mr-2" />
                    CSV 내보내기
                  </Button>
                </div>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>결제 번호</TableHead>
                      <TableHead>사용자</TableHead>
                      <TableHead>플랜</TableHead>
                      <TableHead>금액</TableHead>
                      <TableHead>결제일</TableHead>
                      <TableHead>결제 수단</TableHead>
                      <TableHead>상태</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-mono">{payment.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{payment.user}</div>
                            <div className="text-sm text-gray-500">{payment.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{payment.plan}</TableCell>
                        <TableCell className={payment.amount < 0 ? 'text-red-500' : ''}>
                          {payment.amount.toLocaleString()}원
                        </TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.paymentMethod}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              payment.status === '완료' ? 'success' :
                              payment.status === '취소' ? 'destructive' :
                              payment.status === '환불' ? 'warn' : 'outline'
                            }
                          >
                            {payment.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-center mt-6">
                <Button variant="outline" size="sm" className="mx-1">이전</Button>
                <Button variant="outline" size="sm" className="mx-1 bg-gray-100">1</Button>
                <Button variant="outline" size="sm" className="mx-1">2</Button>
                <Button variant="outline" size="sm" className="mx-1">3</Button>
                <Button variant="outline" size="sm" className="mx-1">다음</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="plans">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>구독 플랜</CardTitle>
                <CardDescription>
                  서비스의 구독 플랜과 가격을 관리합니다.
                </CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                새 플랜 추가
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {subscriptionPlans.map(plan => (
                  <Card key={plan.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                          <div className="flex items-end mb-4">
                            <span className="text-2xl font-bold">
                              {plan.price !== null ? `${plan.price.toLocaleString()}원` : '협의'}
                            </span>
                            {plan.billingCycle !== '-' && (
                              <span className="text-gray-500 ml-2">/ {plan.billingCycle}</span>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            {plan.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center">
                                <Check className="h-4 w-4 text-green-500 mr-2" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center">
                          <div className="text-center mb-2">
                            <div className="text-xl font-semibold">{plan.usersCount}명</div>
                            <div className="text-sm text-gray-500">활성 사용자</div>
                          </div>
                          
                          <div className="flex space-x-2">
                            {editingPlan === plan.id ? (
                              <>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setEditingPlan(null)}
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  취소
                                </Button>
                                <Button 
                                  size="sm"
                                  onClick={() => handleSavePlan(plan.id)}
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  저장
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setEditingPlan(plan.id)}
                                >
                                  <Pencil className="h-4 w-4 mr-1" />
                                  수정
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleDeletePlan(plan.id)}
                                >
                                  <Trash className="h-4 w-4 mr-1" />
                                  삭제
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>매출 추이</CardTitle>
                <CardDescription>월간 매출 추이를 월 구독과 연 구독으로 구분하여 보여줍니다.</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                      tickFormatter={(value) => `${(value/1000000).toFixed(0)}M`}
                    />
                    <RechartsTooltip formatter={(value) => [`${value.toLocaleString()}원`, '']} />
                    <Bar dataKey="월구독" name="월 구독" fill="#8884d8" />
                    <Bar dataKey="연구독" name="연 구독" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>플랜 분포도</CardTitle>
                <CardDescription>현재 활성화된 구독 플랜의 사용자 분포입니다.</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={planDistribution}
                      innerRadius={80}
                      outerRadius={120}
                      dataKey="value"
                      nameKey="name"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {planDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value, name) => [`${value}명`, name]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>결제 상태 요약</CardTitle>
                <CardDescription>최근 결제 처리 상태 통계입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {['완료', '대기 중', '취소', '환불'].map(status => {
                    const count = payments.filter(p => p.status === status).length;
                    const total = status === '완료' 
                      ? payments.filter(p => p.status === status).reduce((acc, p) => acc + p.amount, 0)
                      : null;
                    
                    return (
                      <Card key={status}>
                        <CardContent className="p-4">
                          <div className="flex flex-col">
                            <div className="text-sm text-gray-500 mb-1">{status}</div>
                            <div className="text-2xl font-bold">{count}건</div>
                            {total !== null && (
                              <div className="text-sm text-gray-500 mt-1">
                                총 {total.toLocaleString()}원
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default BillingManagementPage;
