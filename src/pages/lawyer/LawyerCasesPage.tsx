
import React from 'react';
import LawyerLayout from '@/components/lawyer/LawyerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Filter, Search, Download, MoreHorizontal, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const LawyerCasesPage = () => {
  const cases = [
    { id: '1001', title: '김철수 교통사고 손해배상', date: '2023-05-15', priority: 'high', status: 'review', type: '민사' },
    { id: '1002', title: '이영희 부동산 매매계약 분쟁', date: '2023-05-18', priority: 'medium', status: 'draft', type: '부동산' },
    { id: '1003', title: '주식회사 ABC 상표권 침해', date: '2023-05-20', priority: 'high', status: 'submitted', type: '지적재산권' },
    { id: '1004', title: '박민수 이혼 및 양육권', date: '2023-05-22', priority: 'low', status: 'approved', type: '가사' },
    { id: '1005', title: '최영철 명예훼손 고소', date: '2023-05-23', priority: 'high', status: 'review', type: '형사' },
    { id: '1006', title: '정상원 대여금 청구', date: '2023-05-25', priority: 'medium', status: 'draft', type: '민사' },
    { id: '1007', title: '한소영 해고무효 확인', date: '2023-05-28', priority: 'high', status: 'submitted', type: '노동' },
  ];

  const statusStyles = {
    draft: { label: '작성중', color: 'bg-yellow-100 text-yellow-800' },
    review: { label: '검토중', color: 'bg-blue-100 text-blue-800' },
    submitted: { label: '제출완료', color: 'bg-green-100 text-green-800' },
    rejected: { label: '반려', color: 'bg-red-100 text-red-800' },
    approved: { label: '승인', color: 'bg-emerald-100 text-emerald-800' },
  };

  const priorityIcon = (priority: string) => {
    switch(priority) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'low':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <LawyerLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">사건 관리</h1>
        <p className="text-gray-500">의뢰인 사건 목록을 관리하고 상태를 업데이트하세요</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>사건 목록</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                검색
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                필터
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                내보내기
              </Button>
              <Button>새 사건 등록</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>사건 번호</TableHead>
                <TableHead>사건명</TableHead>
                <TableHead>유형</TableHead>
                <TableHead>우선순위</TableHead>
                <TableHead>접수일</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {priorityIcon(item.priority)}
                      <span className="ml-1 capitalize">
                        {item.priority === 'high' ? '높음' : 
                         item.priority === 'medium' ? '중간' : '낮음'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>
                    <Badge className={statusStyles[item.status as keyof typeof statusStyles].color}>
                      {statusStyles[item.status as keyof typeof statusStyles].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">보기</Button>
                      <Button variant="ghost" size="sm">수정</Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>상태 변경</DropdownMenuItem>
                          <DropdownMenuItem>파일 첨부</DropdownMenuItem>
                          <DropdownMenuItem>담당자 변경</DropdownMenuItem>
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
    </LawyerLayout>
  );
};

export default LawyerCasesPage;
