
import React from 'react';
import LawyerLayout from '@/components/lawyer/LawyerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Search, Filter, Plus, Clock, Eye, Edit, MoreHorizontal, Download } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const LawyerDocumentsPage = () => {
  const documents = [
    { id: 'D001', title: '김철수 사건 소장', type: '소장', created: '2023-05-10', modified: '2023-05-15', status: 'review' },
    { id: 'D002', title: '이영희 사건 합의서', type: '합의서', created: '2023-05-12', modified: '2023-05-16', status: 'draft' },
    { id: 'D003', title: 'ABC 회사 답변서', type: '답변서', created: '2023-05-14', modified: '2023-05-18', status: 'completed' },
    { id: 'D004', title: '박민수 이혼 소송 준비서면', type: '준비서면', created: '2023-05-16', modified: '2023-05-20', status: 'review' },
    { id: 'D005', title: '최영철 고소장', type: '고소장', created: '2023-05-18', modified: '2023-05-22', status: 'draft' },
    { id: 'D006', title: '정상원 소송 소장', type: '소장', created: '2023-05-20', modified: '2023-05-24', status: 'completed' },
  ];

  const statusStyles = {
    draft: { label: '작성중', color: 'bg-yellow-100 text-yellow-800' },
    review: { label: '검토중', color: 'bg-blue-100 text-blue-800' },
    completed: { label: '완료', color: 'bg-green-100 text-green-800' },
  };

  return (
    <LawyerLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">문서 관리</h1>
        <p className="text-gray-500">법률 문서를 작성하고 관리하세요</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input className="pl-9" placeholder="문서 검색..." />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            필터
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            새 문서 작성
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">전체 문서</TabsTrigger>
          <TabsTrigger value="draft">작성중</TabsTrigger>
          <TabsTrigger value="review">검토중</TabsTrigger>
          <TabsTrigger value="completed">완료됨</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>문서 목록</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>문서 번호</TableHead>
                    <TableHead>문서명</TableHead>
                    <TableHead>유형</TableHead>
                    <TableHead>생성일</TableHead>
                    <TableHead>수정일</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.id}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{doc.title}</TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.created}</TableCell>
                      <TableCell>{doc.modified}</TableCell>
                      <TableCell>
                        <Badge className={statusStyles[doc.status as keyof typeof statusStyles].color}>
                          {statusStyles[doc.status as keyof typeof statusStyles].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>PDF로 내보내기</DropdownMenuItem>
                              <DropdownMenuItem>복사하기</DropdownMenuItem>
                              <DropdownMenuItem>상태 변경</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">삭제</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="draft">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-gray-500 py-8">
                <FileText className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                <p>작성 중인 문서만 표시됩니다.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="review">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-gray-500 py-8">
                <Clock className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                <p>검토 중인 문서만 표시됩니다.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-gray-500 py-8">
                <FileText className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                <p>완료된 문서만 표시됩니다.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </LawyerLayout>
  );
};

export default LawyerDocumentsPage;
