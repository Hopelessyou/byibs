
import React from 'react';
import FirmLayout from '@/components/firm/FirmLayout';
import { BriefcaseIcon, Plus, Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const FirmCasesPage: React.FC = () => {
  // Sample data for demonstration
  const cases = [
    { 
      id: 1, 
      caseNumber: '2025가단12345', 
      title: '손해배상청구', 
      client: '김민준', 
      opponent: '주식회사 건설', 
      type: '민사', 
      status: '진행중',
      court: '서울중앙지방법원',
      nextDate: '2025-04-15',
      lawyer: '이변호'
    },
    { 
      id: 2, 
      caseNumber: '2025가합54321', 
      title: '계약분쟁', 
      client: '주식회사 테크놀로지', 
      opponent: '이기술', 
      type: '상사', 
      status: '진행중',
      court: '서울중앙지방법원',
      nextDate: '2025-04-22',
      lawyer: '이변호'
    },
    { 
      id: 3, 
      caseNumber: '2025나87654', 
      title: '지식재산권 침해', 
      client: '이지훈', 
      opponent: '주식회사 미디어', 
      type: '특허', 
      status: '항소심',
      court: '특허법원',
      nextDate: '2025-05-10',
      lawyer: '박변호'
    },
    { 
      id: 4, 
      caseNumber: '2024고단9876', 
      title: '사기 혐의', 
      client: '박서연', 
      opponent: '검찰청', 
      type: '형사', 
      status: '1심',
      court: '서울중앙지방법원',
      nextDate: '2025-04-18',
      lawyer: '김변호'
    },
    { 
      id: 5, 
      caseNumber: '2025드단5432', 
      title: '임대차 분쟁', 
      client: '최수민', 
      opponent: '강건물', 
      type: '부동산', 
      status: '종결',
      court: '서울서부지방법원',
      nextDate: '-',
      lawyer: '이변호'
    }
  ];

  return (
    <FirmLayout>
      <div className="container px-4 py-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">사건 관리</h1>
            <p className="text-gray-600">로펌의 모든 사건을 효율적으로 관리하세요.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-legal-primary hover:bg-legal-secondary">
              <Plus className="mr-1 h-4 w-4" /> 새 사건
            </Button>
          </div>
        </div>

        {/* 검색 및 필터 영역 */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="사건명, 사건번호, 의뢰인 검색..."
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="사건 종류" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="civil">민사</SelectItem>
                  <SelectItem value="criminal">형사</SelectItem>
                  <SelectItem value="commercial">상사</SelectItem>
                  <SelectItem value="patent">특허</SelectItem>
                  <SelectItem value="real-estate">부동산</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="사건 상태" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="active">진행중</SelectItem>
                  <SelectItem value="closed">종결</SelectItem>
                  <SelectItem value="appeal">항소심</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* 사건 목록 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">사건번호</TableHead>
                <TableHead>사건명</TableHead>
                <TableHead>의뢰인</TableHead>
                <TableHead>상대방</TableHead>
                <TableHead>담당변호사</TableHead>
                <TableHead>다음 기일</TableHead>
                <TableHead>종류</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((caseItem) => (
                <TableRow key={caseItem.id} className="cursor-pointer hover:bg-gray-50">
                  <TableCell className="font-medium">{caseItem.caseNumber}</TableCell>
                  <TableCell>{caseItem.title}</TableCell>
                  <TableCell>{caseItem.client}</TableCell>
                  <TableCell>{caseItem.opponent}</TableCell>
                  <TableCell>{caseItem.lawyer}</TableCell>
                  <TableCell>{caseItem.nextDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200">
                      {caseItem.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`
                      ${caseItem.status === '진행중' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                      ${caseItem.status === '항소심' ? 'bg-amber-100 text-amber-800 border-amber-200' : ''}
                      ${caseItem.status === '1심' ? 'bg-blue-100 text-blue-800 border-blue-200' : ''}
                      ${caseItem.status === '종결' ? 'bg-gray-100 text-gray-800 border-gray-200' : ''}
                    `}>
                      {caseItem.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </FirmLayout>
  );
};

export default FirmCasesPage;
