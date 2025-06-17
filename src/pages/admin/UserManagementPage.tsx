
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Download, FileDown, Eye, Lock, MoreVertical } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// 더미 사용자 데이터 생성
const generateDummyUsers = (count: number) => {
  const plans = ['무료', '기본', '프리미엄'];
  const statuses = ['활성', '정지', '탈퇴'];
  const names = [
    '김철수', '이영희', '박지민', '최수연', '정민호', '윤서영', '한지훈', '송혜린', 
    '조현우', '강서연', '임준호', '노하은', '류태민', '배지원', '신동훈'
  ];
  
  return Array.from({ length: count }).map((_, index) => {
    const plan = plans[Math.floor(Math.random() * plans.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const name = names[Math.floor(Math.random() * names.length)];
    const signupDate = new Date();
    signupDate.setDate(signupDate.getDate() - Math.floor(Math.random() * 365));
    const lastLogin = new Date();
    lastLogin.setDate(lastLogin.getDate() - Math.floor(Math.random() * 30));
    
    return {
      id: `user${index + 1}`,
      name,
      email: `${name.toLowerCase()}${index + 1}@example.com`,
      signupDate: signupDate.toISOString().split('T')[0],
      plan,
      lastLogin: lastLogin.toISOString().split('T')[0],
      status,
      documentsCount: Math.floor(Math.random() * 20),
      paymentHistory: Math.floor(Math.random() * 10),
    };
  });
};

const UserManagementPage: React.FC = () => {
  const [users] = useState(generateDummyUsers(20));
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // 필터링된 사용자 목록
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlan = planFilter ? user.plan === planFilter : true;
    const matchesStatus = statusFilter ? user.status === statusFilter : true;
    
    return matchesSearch && matchesPlan && matchesStatus;
  });
  
  // 선택한 사용자 정보
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null);
  
  // 사용자 상태 변경 처리
  const handleStatusChange = (userId: string, newStatus: string) => {
    console.log(`사용자 ${userId}의 상태를 ${newStatus}로 변경`);
  };
  
  // CSV 내보내기 기능
  const handleExportCSV = () => {
    console.log('사용자 목록을 CSV로 내보내기');
  };
  
  return (
    <AdminLayout title="사용자 관리">
      <div className="mb-6">
        <Tabs defaultValue="list">
          <TabsList className="mb-4">
            <TabsTrigger value="list">사용자 목록</TabsTrigger>
            {selectedUser && <TabsTrigger value="details">상세 정보</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="list">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>사용자 목록</CardTitle>
                <CardDescription>총 {users.length}명의 사용자가 등록되어 있습니다.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* 검색 및 필터링 */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="이름 또는 이메일로 검색"
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <Select value={planFilter} onValueChange={setPlanFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="플랜 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">모든 플랜</SelectItem>
                        <SelectItem value="무료">무료</SelectItem>
                        <SelectItem value="기본">기본</SelectItem>
                        <SelectItem value="프리미엄">프리미엄</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="상태 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">모든 상태</SelectItem>
                        <SelectItem value="활성">활성</SelectItem>
                        <SelectItem value="정지">정지</SelectItem>
                        <SelectItem value="탈퇴">탈퇴</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button variant="outline" onClick={handleExportCSV}>
                      <FileDown className="h-4 w-4 mr-2" />
                      CSV 내보내기
                    </Button>
                  </div>
                </div>
                
                {/* 사용자 테이블 */}
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>이름</TableHead>
                        <TableHead>이메일</TableHead>
                        <TableHead>가입일</TableHead>
                        <TableHead>구독 플랜</TableHead>
                        <TableHead>최근 로그인</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>액션</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.signupDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.plan === '프리미엄' ? 'default' :
                                user.plan === '기본' ? 'outline' : 'secondary'
                              }
                            >
                              {user.plan}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.lastLogin}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.status === '활성' ? 'success' :
                                user.status === '정지' ? 'destructive' : 'outline'
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => setSelectedUser(user)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                    <span className="sr-only">메뉴 열기</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>사용자 관리</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleStatusChange(user.id, '활성')}>
                                    계정 활성화
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleStatusChange(user.id, '정지')}>
                                    계정 정지하기
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <Lock className="h-4 w-4 mr-2" />
                                    비밀번호 초기화
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details">
            {selectedUser && (
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>사용자 상세 정보</CardTitle>
                    <CardDescription>{selectedUser.name}님의 계정 정보입니다.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">기본 정보</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-500">이름</span>
                            <span className="font-medium">{selectedUser.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">이메일</span>
                            <span className="font-medium">{selectedUser.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">가입일</span>
                            <span className="font-medium">{selectedUser.signupDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">최근 로그인</span>
                            <span className="font-medium">{selectedUser.lastLogin}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">계정 상태</span>
                            <Badge
                              variant={
                                selectedUser.status === '활성' ? 'success' :
                                selectedUser.status === '정지' ? 'destructive' : 'outline'
                              }
                            >
                              {selectedUser.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4">구독 정보</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-500">현재 플랜</span>
                            <Badge
                              variant={
                                selectedUser.plan === '프리미엄' ? 'default' :
                                selectedUser.plan === '기본' ? 'outline' : 'secondary'
                              }
                            >
                              {selectedUser.plan}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">결제 이력</span>
                            <span className="font-medium">{selectedUser.paymentHistory}건</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">다음 결제일</span>
                            <span className="font-medium">
                              {selectedUser.plan === '무료' ? '-' : '2023-12-15'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>문서 이용 현황</CardTitle>
                    <CardDescription>최근 생성한 문서 목록입니다.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>문서 제목</TableHead>
                          <TableHead>유형</TableHead>
                          <TableHead>생성일</TableHead>
                          <TableHead>상태</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Array.from({ length: Math.min(5, selectedUser.documentsCount) }).map((_, idx) => {
                          const documentTypes = ['계약서', '진술서', '고소장', '청원서'];
                          const statuses = ['작성 중', '검토 중', '완료'];
                          const type = documentTypes[Math.floor(Math.random() * documentTypes.length)];
                          const status = statuses[Math.floor(Math.random() * statuses.length)];
                          const date = new Date();
                          date.setDate(date.getDate() - Math.floor(Math.random() * 30));
                          
                          return (
                            <TableRow key={idx}>
                              <TableCell>
                                {type} #{Math.floor(Math.random() * 1000) + 1}
                              </TableCell>
                              <TableCell>{type}</TableCell>
                              <TableCell>{date.toISOString().split('T')[0]}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    status === '완료' ? 'success' :
                                    status === '검토 중' ? 'outline' : 'secondary'
                                  }
                                >
                                  {status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setSelectedUser(null)}>
                    사용자 목록으로 돌아가기
                  </Button>
                  
                  <div className="space-x-2">
                    <Button variant="destructive">계정 정지</Button>
                    <Button variant="outline">비밀번호 초기화</Button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default UserManagementPage;
