
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  PieChart, 
  Pie, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, User, Users, CreditCard, FileText } from 'lucide-react';

// 색상 팔레트
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9966FF', '#FF66B2', '#66CCFF'];

// 랜덤 데이터 생성 함수들
const generateUserGrowthData = () => {
  const months = [
    '1월', '2월', '3월', '4월', '5월', '6월', 
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];
  
  let totalSignups = 200; // 초기 값
  
  return months.map(month => {
    const newSignups = Math.floor(Math.random() * 150) + 50;
    totalSignups += newSignups;
    
    return {
      name: month,
      '신규 가입자': newSignups,
      '누적 사용자': totalSignups,
    };
  });
};

const generateActiveUsersData = (period = 30) => {
  const data = [];
  const today = new Date();
  
  for (let i = 0; i < period; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - (period - 1 - i));
    
    data.push({
      name: `${date.getMonth() + 1}/${date.getDate()}`,
      '일간 활성 사용자': Math.floor(Math.random() * 300) + 100,
      '신규 접속': Math.floor(Math.random() * 50) + 10,
    });
  }
  
  return data;
};

const generateRetentionData = () => {
  const weeks = Array.from({ length: 10 }, (_, i) => `Week ${i + 1}`);
  const retentionData = [];
  
  // 1주차는 100%로 고정
  let retention = 100;
  
  for (const week of weeks) {
    // 점차 감소하는 유지율
    if (week !== 'Week 1') {
      retention = Math.max(retention - (Math.random() * 10 + 5), 15);
    }
    
    retentionData.push({
      name: week,
      '유지율': Math.round(retention),
    });
  }
  
  return retentionData;
};

const generateRevenueData = () => {
  const months = [
    '1월', '2월', '3월', '4월', '5월', '6월', 
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];
  
  return months.map(month => {
    const baseRevenue = 1000000 + Math.random() * 5000000;
    const basicPlan = Math.round(baseRevenue * (0.3 + Math.random() * 0.2));
    const premiumPlan = Math.round(baseRevenue * (0.4 + Math.random() * 0.3));
    const enterprisePlan = Math.round(baseRevenue - basicPlan - premiumPlan);
    
    return {
      name: month,
      '기본 플랜': basicPlan,
      '프리미엄 플랜': premiumPlan,
      '기업용 플랜': enterprisePlan,
      '총 매출': basicPlan + premiumPlan + enterprisePlan,
    };
  });
};

const generateDocumentTypeData = () => {
  const documentTypes = [
    { name: '계약서', value: Math.floor(Math.random() * 500) + 300 },
    { name: '고소장', value: Math.floor(Math.random() * 400) + 200 },
    { name: '진술서', value: Math.floor(Math.random() * 300) + 150 },
    { name: '합의서', value: Math.floor(Math.random() * 250) + 100 },
    { name: '내용증명', value: Math.floor(Math.random() * 200) + 80 },
    { name: '기타', value: Math.floor(Math.random() * 150) + 50 },
  ];
  
  return documentTypes;
};

const generateDocumentStatusData = () => {
  return [
    { name: '작성 중', value: Math.floor(Math.random() * 300) + 200 },
    { name: '검토 중', value: Math.floor(Math.random() * 200) + 100 },
    { name: '수정 필요', value: Math.floor(Math.random() * 100) + 50 },
    { name: '완료', value: Math.floor(Math.random() * 500) + 300 },
    { name: '취소', value: Math.floor(Math.random() * 80) + 20 },
  ];
};

const generatePaymentMethodData = () => {
  return [
    { name: '신용카드', value: Math.floor(Math.random() * 500) + 300 },
    { name: '체크카드', value: Math.floor(Math.random() * 300) + 200 },
    { name: '계좌이체', value: Math.floor(Math.random() * 200) + 100 },
    { name: '가상계좌', value: Math.floor(Math.random() * 150) + 80 },
    { name: '모바일결제', value: Math.floor(Math.random() * 100) + 50 },
  ];
};

const generateWebTrafficData = () => {
  return [
    {
      subject: '검색엔진',
      A: Math.floor(Math.random() * 100) + 50,
      fullMark: 150,
    },
    {
      subject: '직접 접속',
      A: Math.floor(Math.random() * 100) + 40,
      fullMark: 150,
    },
    {
      subject: '소셜미디어',
      A: Math.floor(Math.random() * 100) + 30,
      fullMark: 150,
    },
    {
      subject: '외부 링크',
      A: Math.floor(Math.random() * 100) + 20,
      fullMark: 150,
    },
    {
      subject: '광고',
      A: Math.floor(Math.random() * 100) + 60,
      fullMark: 150,
    },
  ];
};

const generateGeographicData = () => {
  return [
    { name: '서울', value: Math.floor(Math.random() * 500) + 300 },
    { name: '경기', value: Math.floor(Math.random() * 400) + 200 },
    { name: '부산', value: Math.floor(Math.random() * 200) + 100 },
    { name: '대구', value: Math.floor(Math.random() * 150) + 80 },
    { name: '인천', value: Math.floor(Math.random() * 150) + 70 },
    { name: '기타 지역', value: Math.floor(Math.random() * 300) + 200 },
  ];
};

const AnalyticsPage: React.FC = () => {
  // 각종 데이터
  const [userGrowthData, setUserGrowthData] = useState(generateUserGrowthData());
  const [activeUsersData, setActiveUsersData] = useState(generateActiveUsersData());
  const [retentionData, setRetentionData] = useState(generateRetentionData());
  const [revenueData, setRevenueData] = useState(generateRevenueData());
  const [documentTypeData, setDocumentTypeData] = useState(generateDocumentTypeData());
  const [documentStatusData, setDocumentStatusData] = useState(generateDocumentStatusData());
  const [paymentMethodData, setPaymentMethodData] = useState(generatePaymentMethodData());
  const [webTrafficData, setWebTrafficData] = useState(generateWebTrafficData());
  const [geographicData, setGeographicData] = useState(generateGeographicData());
  
  // 기간 필터
  const [period, setPeriod] = useState('year');
  
  // 데이터 내보내기 함수
  const handleExportData = () => {
    console.log('데이터 내보내기');
  };
  
  return (
    <AdminLayout title="통계/분석">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="기간 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">지난 7일</SelectItem>
              <SelectItem value="month">지난 30일</SelectItem>
              <SelectItem value="quarter">지난 분기</SelectItem>
              <SelectItem value="year">지난 1년</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" onClick={handleExportData}>
          <Download className="h-4 w-4 mr-2" />
          데이터 내보내기
        </Button>
      </div>
      
      <Tabs defaultValue="users">
        <TabsList className="mb-6">
          <TabsTrigger value="users">
            <Users className="h-4 w-4 mr-2" />
            사용자 통계
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="h-4 w-4 mr-2" />
            문서 통계
          </TabsTrigger>
          <TabsTrigger value="revenue">
            <CreditCard className="h-4 w-4 mr-2" />
            매출 통계
          </TabsTrigger>
          <TabsTrigger value="traffic">
            <TrendingUp className="h-4 w-4 mr-2" />
            접속/트래픽
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">총 가입자 수</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{userGrowthData[userGrowthData.length - 1]['누적 사용자'].toLocaleString()}</div>
                <p className="text-xs text-green-600 mt-1">
                  +{userGrowthData[userGrowthData.length - 1]['신규 가입자'].toLocaleString()}명 (지난달 대비)
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">활성 사용자</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{(activeUsersData[activeUsersData.length - 1]['일간 활성 사용자']).toLocaleString()}</div>
                <p className="text-xs text-blue-600 mt-1">
                  전체 가입자의 {Math.round(activeUsersData[activeUsersData.length - 1]['일간 활성 사용자'] / userGrowthData[userGrowthData.length - 1]['누적 사용자'] * 100)}%
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">사용자 유지율</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{retentionData[retentionData.length - 1]['유지율']}%</div>
                <p className="text-xs text-amber-600 mt-1">
                  가입 후 {retentionData.length}주 기준
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>사용자 성장 추이</CardTitle>
                <CardDescription>월간 신규 가입자 및 누적 사용자 수</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={userGrowthData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <RechartsTooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="신규 가입자"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="누적 사용자"
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>활성 사용자 추이</CardTitle>
                <CardDescription>최근 30일간 일별 활성 사용자</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={activeUsersData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <RechartsTooltip />
                    <Area
                      type="monotone"
                      dataKey="일간 활성 사용자"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorActive)"
                    />
                    <Area
                      type="monotone"
                      dataKey="신규 접속"
                      stroke="#82ca9d"
                      fillOpacity={1}
                      fill="url(#colorNew)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>사용자 유지율</CardTitle>
              <CardDescription>가입 후 시간 경과에 따른 사용자 유지율</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={retentionData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="유지율" fill="#8884d8">
                    {retentionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`rgba(136, 132, 216, ${1 - index * 0.1})`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">총 작성 문서</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {documentTypeData.reduce((acc, curr) => acc + curr.value, 0).toLocaleString()}
                </div>
                <p className="text-xs text-green-600 mt-1">
                  +{Math.floor(Math.random() * 100) + 50}건 (지난달 대비)
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">완료된 문서</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {documentStatusData.find(d => d.name === '완료')?.value.toLocaleString()}
                </div>
                <p className="text-xs text-legal-primary mt-1">
                  전체의 {Math.round((documentStatusData.find(d => d.name === '완료')?.value || 0) / documentTypeData.reduce((acc, curr) => acc + curr.value, 0) * 100)}%
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">처리 대기 중</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {documentStatusData.find(d => d.name === '검토 중')?.value.toLocaleString()}
                </div>
                <p className="text-xs text-amber-600 mt-1">
                  전체의 {Math.round((documentStatusData.find(d => d.name === '검토 중')?.value || 0) / documentTypeData.reduce((acc, curr) => acc + curr.value, 0) * 100)}%
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>문서 유형별 분포</CardTitle>
                <CardDescription>작성된 문서 유형의 분포도</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={documentTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {documentTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>문서 상태별 분포</CardTitle>
                <CardDescription>현재 문서들의 처리 상태</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={documentStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {documentStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="revenue">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">총 매출</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {revenueData.reduce((acc, curr) => acc + curr['총 매출'], 0).toLocaleString()}원
                </div>
                <p className="text-xs text-green-600 mt-1">
                  +{Math.round((revenueData[revenueData.length - 1]['총 매출'] - revenueData[revenueData.length - 2]['총 매출']) / revenueData[revenueData.length - 2]['총 매출'] * 100)}% (전월 대비)
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">월 평균 매출</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {Math.round(revenueData.reduce((acc, curr) => acc + curr['총 매출'], 0) / revenueData.length).toLocaleString()}원
                </div>
                <p className="text-xs text-blue-600 mt-1">
                  최근 {revenueData.length}개월 기준
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">최고 매출 월</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {revenueData.reduce((max, curr) => curr['총 매출'] > max['총 매출'] ? curr : max)['name']}
                </div>
                <p className="text-xs text-legal-primary mt-1">
                  {revenueData.reduce((max, curr) => curr['총 매출'] > max['총 매출'] ? curr : max)['총 매출'].toLocaleString()}원
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>월별 매출 추이</CardTitle>
                <CardDescription>구독 플랜별 월 매출 추이</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={revenueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${(value/1000000).toFixed(1)}M`} />
                    <RechartsTooltip formatter={(value) => [`${value.toLocaleString()}원`, '']} />
                    <Legend />
                    <Bar dataKey="기본 플랜" stackId="a" fill="#8884d8" />
                    <Bar dataKey="프리미엄 플랜" stackId="a" fill="#82ca9d" />
                    <Bar dataKey="기업용 플랜" stackId="a" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>결제 수단별 비율</CardTitle>
                <CardDescription>사용된 결제 수단 분포</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentMethodData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {paymentMethodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>플랜별 수익 기여도</CardTitle>
                <CardDescription>각 구독 플랜의 매출 기여도</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: '기본 플랜', value: revenueData.reduce((acc, curr) => acc + curr['기본 플랜'], 0) },
                        { name: '프리미엄 플랜', value: revenueData.reduce((acc, curr) => acc + curr['프리미엄 플랜'], 0) },
                        { name: '기업용 플랜', value: revenueData.reduce((acc, curr) => acc + curr['기업용 플랜'], 0) },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell fill="#8884d8" />
                      <Cell fill="#82ca9d" />
                      <Cell fill="#ffc658" />
                    </Pie>
                    <RechartsTooltip formatter={(value) => `${value.toLocaleString()}원`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="traffic">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>트래픽 유입 경로</CardTitle>
                <CardDescription>사용자 유입 채널별 분포</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={webTrafficData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar
                      name="트래픽"
                      dataKey="A"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>지역별 사용자 분포</CardTitle>
                <CardDescription>사용자의 지역별 분포도</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={geographicData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {geographicData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>시간대별 접속 현황</CardTitle>
              <CardDescription>하루 중 시간대별 사용자 접속 패턴</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={Array.from({ length: 24 }, (_, i) => ({
                    hour: i < 10 ? `0${i}:00` : `${i}:00`,
                    '사용자 수': Math.floor(Math.random() * 
                      // 새벽 시간대는 낮음, 오후/저녁 시간대는 높게 설정
                      (i >= 0 && i < 6 ? 50 : 
                       i >= 6 && i < 9 ? 150 :
                       i >= 9 && i < 18 ? 300 :
                       i >= 18 && i < 24 ? 400 : 100)
                    ) + 
                    (i >= 0 && i < 6 ? 20 : 
                     i >= 6 && i < 9 ? 80 :
                     i >= 9 && i < 18 ? 120 :
                     i >= 18 && i < 24 ? 180 : 50)
                  }))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="hour"
                    interval={1}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="사용자 수"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AnalyticsPage;
