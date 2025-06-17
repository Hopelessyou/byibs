
import React from 'react';
import FirmLayout from '@/components/firm/FirmLayout';
import { Clock, Plus, Search, Filter, SlidersHorizontal, Download, Mail, Check, AlertCircle, ArrowUpDown, Eye, FileText } from 'lucide-react';
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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FirmBillingPage: React.FC = () => {
  // Sample data
  const invoices = [
    { 
      id: 'INV-2025-001', 
      client: '김민준', 
      case: '손해배상청구', 
      amount: 3000000, 
      issueDate: '2025-03-15', 
      dueDate: '2025-04-15', 
      status: '미납',
      type: '착수금',
      lawyer: '이변호',
      lastReminder: '2025-04-01'
    },
    { 
      id: 'INV-2025-002', 
      client: '이지훈', 
      case: '특허권 침해', 
      amount: 1500000, 
      issueDate: '2025-03-20', 
      dueDate: '2025-04-10', 
      status: '일부납부',
      type: '착수금',
      lawyer: '박변호',
      lastReminder: '2025-04-01',
      partialAmount: 500000
    },
    { 
      id: 'INV-2025-003', 
      client: '최수민', 
      case: '임대차 분쟁', 
      amount: 2000000, 
      issueDate: '2025-03-25', 
      dueDate: '2025-04-20', 
      status: '미납',
      type: '착수금',
      lawyer: '이변호',
      lastReminder: '2025-04-01'
    },
    { 
      id: 'INV-2025-004', 
      client: '주식회사 건설', 
      case: '하자보수 청구', 
      amount: 5000000, 
      issueDate: '2025-03-10', 
      dueDate: '2025-04-05', 
      status: '완납',
      type: '착수금',
      lawyer: '김변호',
      paymentDate: '2025-03-30'
    },
    { 
      id: 'INV-2025-005', 
      client: '주식회사 테크놀로지', 
      case: '계약 분쟁', 
      amount: 8000000, 
      issueDate: '2025-03-05', 
      dueDate: '2025-04-01', 
      status: '완납',
      type: '착수금',
      lawyer: '이변호',
      paymentDate: '2025-03-28'
    }
  ];
  
  const expenses = [
    { 
      id: 'EXP-2025-001', 
      description: '인지대', 
      case: '김민준 - 손해배상청구', 
      amount: 150000, 
      date: '2025-03-15', 
      category: '소송비용', 
      paymentMethod: '법인카드',
      billable: true,
      status: '미청구'
    },
    { 
      id: 'EXP-2025-002', 
      description: '감정료', 
      case: '이지훈 - 특허권 침해', 
      amount: 500000, 
      date: '2025-03-18', 
      category: '소송비용', 
      paymentMethod: '계좌이체',
      billable: true,
      status: '청구완료'
    },
    { 
      id: 'EXP-2025-003', 
      description: '출장비', 
      case: '최수민 - 임대차 분쟁', 
      amount: 50000, 
      date: '2025-03-20', 
      category: '출장비', 
      paymentMethod: '법인카드',
      billable: true,
      status: '미청구'
    },
    { 
      id: 'EXP-2025-004', 
      description: '사무용품', 
      case: '사무실 공통', 
      amount: 120000, 
      date: '2025-03-22', 
      category: '사무비용', 
      paymentMethod: '법인카드',
      billable: false,
      status: '해당없음'
    },
    { 
      id: 'EXP-2025-005', 
      description: '송달료', 
      case: '김민준 - 손해배상청구', 
      amount: 30000, 
      date: '2025-03-25', 
      category: '소송비용', 
      paymentMethod: '계좌이체',
      billable: true,
      status: '미청구'
    }
  ];
  
  const timeEntries = [
    { 
      id: 'T-2025-001', 
      lawyer: '이변호', 
      case: '김민준 - 손해배상청구', 
      date: '2025-03-15', 
      hours: 3.5, 
      description: '소장 작성', 
      rate: 300000,
      billed: true,
      billable: true,
      invoiceId: 'INV-2025-001'
    },
    { 
      id: 'T-2025-002', 
      lawyer: '박변호', 
      case: '이지훈 - 특허권 침해', 
      date: '2025-03-16', 
      hours: 2.0, 
      description: '판례 조사', 
      rate: 250000,
      billed: true,
      billable: true,
      invoiceId: 'INV-2025-002'
    },
    { 
      id: 'T-2025-003', 
      lawyer: '이변호', 
      case: '최수민 - 임대차 분쟁', 
      date: '2025-03-18', 
      hours: 1.5, 
      description: '계약서 검토', 
      rate: 300000,
      billed: false,
      billable: true
    },
    { 
      id: 'T-2025-004', 
      lawyer: '김변호', 
      case: '주식회사 건설 - 하자보수 청구', 
      date: '2025-03-20', 
      hours: 4.0, 
      description: '준비서면 작성', 
      rate: 280000,
      billed: true,
      billable: true,
      invoiceId: 'INV-2025-004'
    },
    { 
      id: 'T-2025-005', 
      lawyer: '이변호', 
      case: '내부 - 판례 연구', 
      date: '2025-03-22', 
      hours: 2.0, 
      description: '최신 판례 연구', 
      rate: 0,
      billed: false,
      billable: false
    }
  ];

  return (
    <FirmLayout>
      <div className="container px-4 py-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">청구 관리</h1>
            <p className="text-gray-600">청구서 발행 및 미수금을 체계적으로 관리하세요.</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="outline" className="border-legal-primary text-legal-primary hover:bg-legal-primary/10">
              <FileText className="mr-1 h-4 w-4" /> 세금계산서 발행
            </Button>
            <Button className="bg-legal-primary hover:bg-legal-secondary">
              <Plus className="mr-1 h-4 w-4" /> 새 청구서
            </Button>
          </div>
        </div>

        {/* 청구 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">이번 달 매출</p>
                  <p className="text-2xl font-bold">15,000,000원</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <ArrowUpDown className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">미수금 총액</p>
                  <p className="text-2xl font-bold">5,500,000원</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">오늘 입금</p>
                  <p className="text-2xl font-bold">0원</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">이번 달 경비</p>
                  <p className="text-2xl font-bold">850,000원</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 탭 기반 청구 관리 */}
        <Tabs defaultValue="invoices" className="w-full">
          <TabsList>
            <TabsTrigger value="invoices">청구서</TabsTrigger>
            <TabsTrigger value="expenses">경비</TabsTrigger>
            <TabsTrigger value="timesheet">타임시트</TabsTrigger>
            <TabsTrigger value="reports">보고서</TabsTrigger>
          </TabsList>
          
          <TabsContent value="invoices" className="mt-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="청구서 번호, 고객명, 사건명 검색..."
                    className="pl-9"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="청구 상태" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="unpaid">미납</SelectItem>
                      <SelectItem value="partial">일부납부</SelectItem>
                      <SelectItem value="paid">완납</SelectItem>
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
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>청구서 번호</TableHead>
                    <TableHead>고객명</TableHead>
                    <TableHead>사건</TableHead>
                    <TableHead>금액</TableHead>
                    <TableHead>발행일</TableHead>
                    <TableHead>만기일</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell>{invoice.case}</TableCell>
                      <TableCell className="text-right">{invoice.amount.toLocaleString()}원</TableCell>
                      <TableCell>{invoice.issueDate}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell>
                        <Badge className={`
                          ${invoice.status === '미납' ? 'bg-red-100 text-red-700 border-red-200' : ''}
                          ${invoice.status === '일부납부' ? 'bg-amber-100 text-amber-700 border-amber-200' : ''}
                          ${invoice.status === '완납' ? 'bg-green-100 text-green-700 border-green-200' : ''}
                        `}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">메뉴 열기</span>
                              <SlidersHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer">
                              <Eye className="mr-2 h-4 w-4" />
                              <span>청구서 보기</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Download className="mr-2 h-4 w-4" />
                              <span>PDF 다운로드</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Mail className="mr-2 h-4 w-4" />
                              <span>이메일 발송</span>
                            </DropdownMenuItem>
                            {invoice.status !== '완납' && (
                              <DropdownMenuItem className="cursor-pointer">
                                <Check className="mr-2 h-4 w-4" />
                                <span>결제 처리</span>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="expenses" className="mt-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="경비 설명, 사건명 검색..."
                    className="pl-9"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="경비 유형" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="litigation">소송비용</SelectItem>
                      <SelectItem value="travel">출장비</SelectItem>
                      <SelectItem value="office">사무비용</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="청구 가능 여부" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="billable">청구 가능</SelectItem>
                      <SelectItem value="non-billable">청구 불가</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>경비 ID</TableHead>
                    <TableHead>설명</TableHead>
                    <TableHead>사건</TableHead>
                    <TableHead>금액</TableHead>
                    <TableHead>날짜</TableHead>
                    <TableHead>유형</TableHead>
                    <TableHead>청구 가능</TableHead>
                    <TableHead>청구 상태</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.id}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>{expense.case}</TableCell>
                      <TableCell className="text-right">{expense.amount.toLocaleString()}원</TableCell>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={expense.billable 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : 'bg-gray-50 text-gray-700 border-gray-200'}>
                          {expense.billable ? '청구 가능' : '청구 불가'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`
                          ${expense.status === '미청구' ? 'bg-amber-100 text-amber-700 border-amber-200' : ''}
                          ${expense.status === '청구완료' ? 'bg-green-100 text-green-700 border-green-200' : ''}
                          ${expense.status === '해당없음' ? 'bg-gray-100 text-gray-700 border-gray-200' : ''}
                        `}>
                          {expense.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="timesheet" className="mt-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="변호사, 사건, 설명 검색..."
                    className="pl-9"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="담당 변호사" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="lee">이변호</SelectItem>
                      <SelectItem value="kim">김변호</SelectItem>
                      <SelectItem value="park">박변호</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="청구 상태" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="billed">청구됨</SelectItem>
                      <SelectItem value="unbilled">미청구</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>시간 ID</TableHead>
                    <TableHead>변호사</TableHead>
                    <TableHead>사건</TableHead>
                    <TableHead>날짜</TableHead>
                    <TableHead>시간</TableHead>
                    <TableHead>설명</TableHead>
                    <TableHead>시간당 요율</TableHead>
                    <TableHead>총액</TableHead>
                    <TableHead>청구 상태</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.id}</TableCell>
                      <TableCell>{entry.lawyer}</TableCell>
                      <TableCell>{entry.case}</TableCell>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.hours}시간</TableCell>
                      <TableCell>{entry.description}</TableCell>
                      <TableCell className="text-right">{entry.rate === 0 ? '-' : `${entry.rate.toLocaleString()}원`}</TableCell>
                      <TableCell className="text-right">{entry.rate === 0 ? '-' : `${(entry.rate * entry.hours).toLocaleString()}원`}</TableCell>
                      <TableCell>
                        {entry.billable ? (
                          <Badge className={entry.billed 
                            ? 'bg-blue-100 text-blue-700 border-blue-200' 
                            : 'bg-amber-100 text-amber-700 border-amber-200'}>
                            {entry.billed ? '청구됨' : '미청구'}
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-700 border-gray-200">내부 작업</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="reports">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>매출 리포트</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                    <p className="text-gray-500">월별 매출 차트가 이곳에 표시됩니다</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-gray-600">최근 6개월 매출 추이</p>
                  <Button variant="outline" size="sm">
                    <Download className="mr-1 h-4 w-4" />
                    엑셀 다운로드
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>미수금 현황</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                    <p className="text-gray-500">미수금 현황 차트가 이곳에 표시됩니다</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-gray-600">총 5,500,000원의 미수금</p>
                  <Button variant="outline" size="sm">
                    <Download className="mr-1 h-4 w-4" />
                    보고서 다운로드
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </FirmLayout>
  );
};

export default FirmBillingPage;
