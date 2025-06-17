
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend
} from "recharts";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  UserCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Download,
  ArrowUpDown,
  Pencil,
  Eye,
  MessageSquare,
  X,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// 더미 티켓 데이터 생성 함수
const generateTickets = (count: number) => {
  const subjects = [
    '계정 관련 문의',
    '결제 오류',
    '문서 작성 방법',
    '기능 제안',
    '기타 문의'
  ];
  const statuses = ['대기 중', '처리 중', '완료', '보류'];
  const priorities = ['높음', '보통', '낮음'];
  const users = ['김철수', '이영희', '박지민', '최수연'];

  return Array.from({ length: count }).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30)); // 지난 30일 내 날짜

    return {
      id: `ticket-${100 + index}`,
      subject: subjects[Math.floor(Math.random() * subjects.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      user: users[Math.floor(Math.random() * users.length)],
      date: date.toISOString().split('T')[0],
      messages: Math.floor(Math.random() * 10),
    };
  });
};

const SupportManagementPage: React.FC = () => {
  const [tickets] = useState(generateTickets(25));
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc'); // 'asc' or 'desc'
  const [sortBy, setSortBy] = useState<'date' | 'priority'>('date'); // 'date' or 'priority'

  // 검색 및 필터링된 티켓 목록
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter ? ticket.status === statusFilter : true;
    const matchesPriority = priorityFilter ? ticket.priority === priorityFilter : true;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // 정렬된 티켓 목록
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortBy === 'priority') {
      const priorityValues = { '높음': 3, '보통': 2, '낮음': 1 };
      const priorityA = priorityValues[a.priority] || 0;
      const priorityB = priorityValues[b.priority] || 0;
      return sortOrder === 'asc' ? priorityA - priorityB : priorityB - priorityA;
    }
    return 0;
  });

  // 티켓 상태 업데이트 (더미)
  const handleUpdateStatus = (ticketId: string, newStatus: string) => {
    console.log(`티켓 ${ticketId} 상태를 ${newStatus}로 업데이트`);
  };

  // CSV 내보내기 기능 (더미)
  const handleExportCSV = () => {
    console.log('티켓 목록을 CSV로 내보내기');
  };

  return (
    <AdminLayout title="CS/문의 관리">
      <Tabs defaultValue="tickets">
        <TabsList className="mb-4">
          <TabsTrigger value="tickets">문의 목록</TabsTrigger>
          <TabsTrigger value="analytics">통계 분석</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets">
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
              <CardTitle>문의 목록</CardTitle>
              <CardDescription>고객 문의를 확인하고 관리합니다.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* 검색 및 필터링 */}
              <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="문의 제목으로 검색"
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="상태" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">모든 상태</SelectItem>
                      <SelectItem value="대기 중">대기 중</SelectItem>
                      <SelectItem value="처리 중">처리 중</SelectItem>
                      <SelectItem value="완료">완료</SelectItem>
                      <SelectItem value="보류">보류</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="우선순위" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">모든 우선순위</SelectItem>
                      <SelectItem value="높음">높음</SelectItem>
                      <SelectItem value="보통">보통</SelectItem>
                      <SelectItem value="낮음">낮음</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" onClick={handleExportCSV}>
                    <Download className="h-4 w-4 mr-2" />
                    CSV 내보내기
                  </Button>
                </div>
              </div>

              {/* 티켓 테이블 */}
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>제목</TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSortBy('date');
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          }}
                        >
                          날짜 <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSortBy('priority');
                            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                          }}
                        >
                          우선순위 <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>상태</TableHead>
                      <TableHead>사용자</TableHead>
                      <TableHead className="text-center">메시지</TableHead>
                      <TableHead>액션</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.subject}</TableCell>
                        <TableCell>{ticket.date}</TableCell>
                        <TableCell>{ticket.priority}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              ticket.status === '완료' ? 'success' :
                                ticket.status === '처리 중' ? 'outline' :
                                  ticket.status === '보류' ? 'warn' : 'secondary'
                            }
                          >
                            {ticket.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{ticket.user}</TableCell>
                        <TableCell className="text-center">{ticket.messages}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">메뉴 열기</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>티켓 관리</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleUpdateStatus(ticket.id, '대기 중')}>
                                대기 중으로 변경
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(ticket.id, '처리 중')}>
                                처리 중으로 변경
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(ticket.id, '완료')}>
                                완료로 변경
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(ticket.id, '보류')}>
                                보류로 변경
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                상세보기
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>문의 통계</CardTitle>
              <CardDescription>문의 현황을 시각적으로 보여줍니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <p>여기에 통계 그래프 또는 차트 추가</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default SupportManagementPage;
