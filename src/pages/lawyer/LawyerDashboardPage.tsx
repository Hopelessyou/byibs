
import React from 'react';
import LawyerLayout from '@/components/lawyer/LawyerLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, AlertCircle, Calendar, Clock, FileText, Search, 
  ChevronRight, Users, MessageSquare, FileCheck, Edit, Eye, 
  MoreHorizontal, Filter, BarChart4
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

const LawyerDashboardPage = () => {
  const caseStatuses = {
    draft: { label: '작성중', color: 'bg-yellow-100 text-yellow-800' },
    review: { label: '검토중', color: 'bg-blue-100 text-blue-800' },
    submitted: { label: '제출완료', color: 'bg-green-100 text-green-800' },
    rejected: { label: '반려', color: 'bg-red-100 text-red-800' },
    approved: { label: '승인', color: 'bg-emerald-100 text-emerald-800' },
  };

  const recentCases = [
    { id: 'C001', title: '김철수 교통사고 손해배상', type: '민사', status: 'review', deadline: '2023-06-10', priority: 'high' },
    { id: 'C002', title: '이영희 부동산 매매계약 분쟁', type: '부동산', status: 'draft', deadline: '2023-06-15', priority: 'medium' },
    { id: 'C003', title: '주식회사 ABC 상표권 침해', type: '지적재산권', status: 'submitted', deadline: '2023-06-05', priority: 'high' },
    { id: 'C004', title: '박민수 이혼 및 양육권', type: '가사', status: 'approved', deadline: '2023-06-20', priority: 'low' },
  ];

  const documentQueue = [
    { id: 'D001', title: '소장 초안', case: '김철수 교통사고', type: '소장', status: 'draft', dueDate: '2023-06-08' },
    { id: 'D002', title: '답변서 검토', case: '주식회사 ABC', type: '답변서', status: 'review', dueDate: '2023-06-05' },
    { id: 'D003', title: '합의서 작성', case: '이영희 부동산', type: '합의서', status: 'draft', dueDate: '2023-06-12' },
  ];

  const recentActivities = [
    { id: 1, action: '소장 검토 완료', user: '박변호사', time: '10분 전', target: '김철수 교통사고', icon: FileCheck },
    { id: 2, action: '새 댓글 추가', user: '이비서', time: '1시간 전', target: '이영희 부동산', icon: MessageSquare },
    { id: 3, action: '문서 편집', user: '김변호사', time: '2시간 전', target: '주식회사 ABC', icon: Edit },
    { id: 4, action: '의뢰인 상담', user: '김변호사', time: '어제', target: '박민수', icon: Users },
  ];

  const events = [
    { id: 'E001', title: '김철수 상담', time: '오늘 14:00', type: '상담' },
    { id: 'E002', title: '법원 출석 (서울중앙지법)', time: '내일 10:00', type: 'court' },
    { id: 'E003', title: '변호사 협회 미팅', time: '6월 8일 16:00', type: 'meeting' },
  ];

  return (
    <LawyerLayout>
      {/* 상단 요약 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2 flex flex-row justify-between items-center">
            <CardTitle className="text-sm font-medium text-gray-500">진행 중인 사건</CardTitle>
            <Activity className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-gray-500">
                <span className="text-green-600 font-medium">+2</span> 이번 주
              </div>
              <Link to="/lawyer/cases">
                <Button variant="link" size="sm" className="text-legal-primary p-0 h-auto">
                  모두 보기 <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row justify-between items-center">
            <CardTitle className="text-sm font-medium text-gray-500">작성 중인 문서</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-gray-500">
                <span className="text-amber-600 font-medium">3</span> 마감 임박
              </div>
              <Link to="/lawyer/documents">
                <Button variant="link" size="sm" className="text-legal-primary p-0 h-auto">
                  모두 보기 <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row justify-between items-center">
            <CardTitle className="text-sm font-medium text-gray-500">금주 일정</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-gray-500">
                <span className="text-blue-600 font-medium">오늘 2건</span>
              </div>
              <Link to="/lawyer/calendar">
                <Button variant="link" size="sm" className="text-legal-primary p-0 h-auto">
                  일정 보기 <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2 flex flex-row justify-between items-center">
            <CardTitle className="text-sm font-medium text-gray-500">새 메시지</CardTitle>
            <MessageSquare className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-xs text-gray-500">
                <span className="text-red-600 font-medium">1</span> 읽지 않음
              </div>
              <Link to="/lawyer/messages">
                <Button variant="link" size="sm" className="text-legal-primary p-0 h-auto">
                  메시지 확인 <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 왼쪽 컬럼: 최근 사건 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 작업 대기 문서 */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-bold flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                  작업 대기 문서
                </CardTitle>
                <div className="flex items-center">
                  <Button variant="ghost" size="icon" className="h-8 w-8 mr-2">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 mr-2">
                    <Search className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>정렬: 최신순</DropdownMenuItem>
                      <DropdownMenuItem>정렬: 마감 임박순</DropdownMenuItem>
                      <DropdownMenuItem>정렬: 중요도순</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardDescription>마감이 임박하거나 검토가 필요한 문서입니다</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>문서</TableHead>
                    <TableHead>유형</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>마감일</TableHead>
                    <TableHead className="text-right">작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documentQueue.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          {doc.title}
                          <span className="text-xs text-gray-500">{doc.case}</span>
                        </div>
                      </TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>
                        <Badge variant={doc.status === 'review' ? 'secondary' : 'outline'}>
                          {doc.status === 'draft' ? '작성중' : '검토중'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1 text-amber-500" />
                          <span className={new Date(doc.dueDate) < new Date() ? 'text-red-500' : ''}>
                            {doc.dueDate}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 text-center">
                <Button variant="outline" size="sm">
                  모든 문서 보기
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* 사건 현황 */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-bold">사건 현황</CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  필터
                </Button>
              </div>
              <CardDescription>현재 진행 중인 사건 목록입니다</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4 w-full justify-start">
                  <TabsTrigger value="all" className="relative">
                    전체
                    <Badge className="ml-2 bg-gray-200 text-gray-700">12</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="active">
                    진행중
                    <Badge className="ml-2 bg-blue-100 text-blue-800">8</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="urgent">
                    긴급
                    <Badge className="ml-2 bg-red-100 text-red-800">3</Badge>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>사건명</TableHead>
                        <TableHead>유형</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>마감일</TableHead>
                        <TableHead className="text-right">작업</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentCases.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              <span>{item.title}</span>
                              <span className="text-xs text-gray-500">{item.id}</span>
                            </div>
                          </TableCell>
                          <TableCell>{item.type}</TableCell>
                          <TableCell>
                            <Badge className={caseStatuses[item.status as keyof typeof caseStatuses].color}>
                              {caseStatuses[item.status as keyof typeof caseStatuses].label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Clock className={`h-3 w-3 mr-1 ${item.priority === 'high' ? 'text-red-500' : 'text-gray-500'}`} />
                              <span>{item.deadline}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              상세보기
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="active">
                  <div className="p-4 text-center text-gray-500">
                    진행중인 사건 필터 결과가 여기에 표시됩니다.
                  </div>
                </TabsContent>
                
                <TabsContent value="urgent">
                  <div className="p-4 text-center text-gray-500">
                    긴급한 사건 필터 결과가 여기에 표시됩니다.
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-4 text-center">
                <Button>새 사건 등록</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 오른쪽 컬럼: 활동 내역과 일정 */}
        <div className="space-y-6">
          {/* 진행률 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold">이번 달 진행률</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">소장 작성</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">상담 완료</span>
                  <span>90%</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">사건 해결</span>
                  <span>60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              
              <div className="pt-2 border-t border-gray-100">
                <Link to="/lawyer/analytics">
                  <Button variant="link" className="text-legal-primary p-0 h-auto">
                    <BarChart4 className="h-4 w-4 mr-1" />
                    분석 리포트 보기
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        
          {/* 최근 활동 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold">최근 활동 내역</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <activity.icon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        <span className="text-legal-primary">{activity.user}</span>님이 {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        <span>{activity.target}</span> · <span>{activity.time}</span>
                      </p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-2">
                  더 보기
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* 오늘 일정 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold">오늘/다가오는 일정</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className={`p-2 rounded-full ${
                      event.type === '상담' ? 'bg-blue-100' :
                      event.type === 'court' ? 'bg-red-100' : 'bg-green-100'
                    }`}>
                      <Calendar className={`h-4 w-4 ${
                        event.type === '상담' ? 'text-blue-600' :
                        event.type === 'court' ? 'text-red-600' : 'text-green-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{event.title}</p>
                      <p className="text-xs text-gray-500">{event.time}</p>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" size="sm" className="w-full mt-2">
                  전체 일정 보기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </LawyerLayout>
  );
};

export default LawyerDashboardPage;
