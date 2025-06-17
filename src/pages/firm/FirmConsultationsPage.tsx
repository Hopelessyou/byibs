
import React from 'react';
import FirmLayout from '@/components/firm/FirmLayout';
import { MessageSquare, Plus, Search, Filter, SlidersHorizontal, Calendar, Clock, Phone, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const FirmConsultationsPage: React.FC = () => {
  // Sample data
  const upcomingConsultations = [
    { 
      id: 1, 
      client: '김민준', 
      subject: '계약서 검토 문의', 
      phone: '010-1234-5678', 
      email: 'kim@example.com', 
      date: '2025-04-04', 
      time: '14:00', 
      type: '방문', 
      status: '예약됨',
      lawyer: '이변호',
      prepaid: true,
      note: '부동산 계약서 관련 검토 요청'
    },
    { 
      id: 2, 
      client: '박서연', 
      subject: '형사사건 상담', 
      phone: '010-2345-6789', 
      email: 'park@example.com', 
      date: '2025-04-07', 
      time: '10:30', 
      type: '화상', 
      status: '예약됨',
      lawyer: '김변호',
      prepaid: true,
      note: '사기 혐의 관련 법률 조언 요청'
    },
    { 
      id: 3, 
      client: '최수민', 
      subject: '임대차 문제', 
      phone: '010-3456-7890', 
      email: 'choi@example.com', 
      date: '2025-04-08', 
      time: '16:00', 
      type: '전화', 
      status: '대기중',
      lawyer: '미배정',
      prepaid: false,
      note: '임대인과의 분쟁 상담 요청'
    },
    { 
      id: 4, 
      client: '주식회사 미디어', 
      subject: '저작권 침해 문의', 
      phone: '02-3456-7890', 
      email: 'media@example.com', 
      date: '2025-04-10', 
      time: '11:00', 
      type: '방문', 
      status: '대기중',
      lawyer: '미배정',
      prepaid: true,
      note: '콘텐츠 저작권 침해 관련 법률 자문 요청'
    }
  ];
  
  const pastConsultations = [
    { 
      id: 5, 
      client: '이지훈', 
      subject: '특허권 침해 신고', 
      phone: '010-4567-8901', 
      email: 'lee@example.com', 
      date: '2025-03-30', 
      time: '15:00', 
      type: '방문', 
      status: '완료',
      lawyer: '박변호',
      result: '사건 수임',
      note: '특허권 침해에 대한 법적 대응 논의, 소송 진행하기로 결정'
    },
    { 
      id: 6, 
      client: '주식회사 테크놀로지', 
      subject: '계약 분쟁', 
      phone: '02-1234-5678', 
      email: 'tech@example.com', 
      date: '2025-03-28', 
      time: '14:30', 
      type: '방문', 
      status: '완료',
      lawyer: '이변호',
      result: '사건 수임',
      note: 'B2B 계약 위반에 따른 손해배상 청구 논의, 내용증명 발송 결정'
    },
    { 
      id: 7, 
      client: '강도윤', 
      subject: '교통사고 합의', 
      phone: '010-5678-9012', 
      email: 'kang@example.com', 
      date: '2025-03-25', 
      time: '11:30', 
      type: '전화', 
      status: '완료',
      lawyer: '김변호',
      result: '추가 상담 필요',
      note: '사고 경위 및 부상 정도 확인, 보험사 합의안 검토 필요'
    }
  ];

  // 상담 타입에 따른 아이콘과 색상 반환
  const getConsultationType = (type: string) => {
    const typeMap: { [key: string]: { icon: React.ReactNode, color: string } } = {
      '방문': { icon: <MessageSquare className="h-4 w-4" />, color: 'bg-blue-100 text-blue-700 border-blue-200' },
      '전화': { icon: <Phone className="h-4 w-4" />, color: 'bg-green-100 text-green-700 border-green-200' },
      '화상': { icon: <Video className="h-4 w-4" />, color: 'bg-purple-100 text-purple-700 border-purple-200' }
    };

    return typeMap[type] || { icon: <MessageSquare className="h-4 w-4" />, color: 'bg-gray-100 text-gray-700 border-gray-200' };
  };

  return (
    <FirmLayout>
      <div className="container px-4 py-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">상담 관리</h1>
            <p className="text-gray-600">모든 고객 상담 일정을 효율적으로 관리하세요.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-legal-primary hover:bg-legal-secondary">
              <Plus className="mr-1 h-4 w-4" /> 새 상담 등록
            </Button>
          </div>
        </div>

        {/* 검색 및 필터 영역 */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="고객명, 제목, 내용 검색..."
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="상담 유형" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="visit">방문 상담</SelectItem>
                  <SelectItem value="phone">전화 상담</SelectItem>
                  <SelectItem value="video">화상 상담</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="담당 변호사" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="lee">이변호</SelectItem>
                  <SelectItem value="kim">김변호</SelectItem>
                  <SelectItem value="park">박변호</SelectItem>
                  <SelectItem value="unassigned">미배정</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* 탭 기반 상담 관리 */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">예정된 상담</TabsTrigger>
            <TabsTrigger value="waiting">대기중 상담</TabsTrigger>
            <TabsTrigger value="past">완료된 상담</TabsTrigger>
            <TabsTrigger value="calendar">일정 보기</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>고객명</TableHead>
                    <TableHead>상담 주제</TableHead>
                    <TableHead>날짜 및 시간</TableHead>
                    <TableHead>상담 유형</TableHead>
                    <TableHead>담당 변호사</TableHead>
                    <TableHead>결제</TableHead>
                    <TableHead>상태</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingConsultations
                    .filter(consultation => consultation.status === '예약됨')
                    .map((consultation) => {
                      const { icon, color } = getConsultationType(consultation.type);
                      return (
                        <TableRow key={consultation.id} className="cursor-pointer hover:bg-gray-50">
                          <TableCell>
                            <div className="font-medium">{consultation.client}</div>
                            <div className="text-xs text-gray-500">{consultation.phone}</div>
                          </TableCell>
                          <TableCell>{consultation.subject}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                              <span>{consultation.date}</span>
                              <Clock className="h-3 w-3 ml-2 mr-1 text-gray-500" />
                              <span>{consultation.time}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={color}>
                              {icon} <span className="ml-1">{consultation.type}</span>
                            </Badge>
                          </TableCell>
                          <TableCell>{consultation.lawyer}</TableCell>
                          <TableCell>
                            {consultation.prepaid ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                결제 완료
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                미결제
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                              {consultation.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="waiting">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>고객명</TableHead>
                    <TableHead>상담 주제</TableHead>
                    <TableHead>날짜 및 시간</TableHead>
                    <TableHead>상담 유형</TableHead>
                    <TableHead>담당 변호사</TableHead>
                    <TableHead>결제</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingConsultations
                    .filter(consultation => consultation.status === '대기중')
                    .map((consultation) => {
                      const { icon, color } = getConsultationType(consultation.type);
                      return (
                        <TableRow key={consultation.id} className="cursor-pointer hover:bg-gray-50">
                          <TableCell>
                            <div className="font-medium">{consultation.client}</div>
                            <div className="text-xs text-gray-500">{consultation.phone}</div>
                          </TableCell>
                          <TableCell>{consultation.subject}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                              <span>{consultation.date}</span>
                              <Clock className="h-3 w-3 ml-2 mr-1 text-gray-500" />
                              <span>{consultation.time}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={color}>
                              {icon} <span className="ml-1">{consultation.type}</span>
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Select defaultValue="unassigned">
                              <SelectTrigger className="w-[100px] h-8 text-xs">
                                <SelectValue placeholder="변호사 배정" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="unassigned">미배정</SelectItem>
                                <SelectItem value="lee">이변호</SelectItem>
                                <SelectItem value="kim">김변호</SelectItem>
                                <SelectItem value="park">박변호</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            {consultation.prepaid ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                결제 완료
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                미결제
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                              {consultation.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="outline" size="sm" className="h-7 px-2 text-xs">승인</Button>
                              <Button variant="outline" size="sm" className="h-7 px-2 text-xs text-red-600 hover:text-red-600 hover:bg-red-50">거부</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="past">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>고객명</TableHead>
                    <TableHead>상담 주제</TableHead>
                    <TableHead>날짜 및 시간</TableHead>
                    <TableHead>상담 유형</TableHead>
                    <TableHead>담당 변호사</TableHead>
                    <TableHead>처리 결과</TableHead>
                    <TableHead>추가 메모</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastConsultations.map((consultation) => {
                    const { icon, color } = getConsultationType(consultation.type);
                    return (
                      <TableRow key={consultation.id} className="cursor-pointer hover:bg-gray-50">
                        <TableCell>
                          <div className="font-medium">{consultation.client}</div>
                          <div className="text-xs text-gray-500">{consultation.phone}</div>
                        </TableCell>
                        <TableCell>{consultation.subject}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                            <span>{consultation.date}</span>
                            <Clock className="h-3 w-3 ml-2 mr-1 text-gray-500" />
                            <span>{consultation.time}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={color}>
                            {icon} <span className="ml-1">{consultation.type}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>{consultation.lawyer}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={consultation.result === '사건 수임' 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : 'bg-blue-50 text-blue-700 border-blue-200'}>
                            {consultation.result}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate" title={consultation.note}>
                          {consultation.note}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="calendar">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
                <div key={i} className="w-full">
                  <div className={`p-2 text-center font-medium mb-2 rounded ${i === 0 ? 'bg-red-100 text-red-700' : i === 6 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}>
                    {day}요일
                  </div>
                  <div className="space-y-2">
                    {i === 1 && (
                      <>
                        <Card className="border-blue-200">
                          <CardContent className="p-2">
                            <div className="flex items-center justify-between">
                              <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                                <MessageSquare className="h-3 w-3 mr-1" /> 방문
                              </Badge>
                              <span className="text-xs font-medium">14:00</span>
                            </div>
                            <h4 className="font-medium text-sm mt-1">김민준</h4>
                            <p className="text-xs text-gray-600 truncate">계약서 검토 문의</p>
                          </CardContent>
                        </Card>
                      </>
                    )}
                    {i === 3 && (
                      <>
                        <Card className="border-purple-200">
                          <CardContent className="p-2">
                            <div className="flex items-center justify-between">
                              <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                                <Video className="h-3 w-3 mr-1" /> 화상
                              </Badge>
                              <span className="text-xs font-medium">10:30</span>
                            </div>
                            <h4 className="font-medium text-sm mt-1">박서연</h4>
                            <p className="text-xs text-gray-600 truncate">형사사건 상담</p>
                          </CardContent>
                        </Card>
                      </>
                    )}
                    {i === 4 && (
                      <>
                        <Card className="border-green-200">
                          <CardContent className="p-2">
                            <div className="flex items-center justify-between">
                              <Badge className="bg-green-100 text-green-700 border-green-200">
                                <Phone className="h-3 w-3 mr-1" /> 전화
                              </Badge>
                              <span className="text-xs font-medium">16:00</span>
                            </div>
                            <h4 className="font-medium text-sm mt-1">최수민</h4>
                            <p className="text-xs text-gray-600 truncate">임대차 문제</p>
                          </CardContent>
                        </Card>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* 상담 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">오늘 예정된 상담</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2</div>
              <div className="text-sm text-gray-500">방문 1건, 전화 1건</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">이번 달 상담</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <div className="text-sm text-gray-500">완료 8건, 예정 4건</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">사건 전환율</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">67%</div>
              <div className="text-sm text-gray-500">8건 중 5건 수임</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </FirmLayout>
  );
};

export default FirmConsultationsPage;
