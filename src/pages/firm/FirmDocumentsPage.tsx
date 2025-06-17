
import React from 'react';
import FirmLayout from '@/components/firm/FirmLayout';
import { 
  FileText, 
  Upload, 
  Folder, 
  Search, 
  File, 
  Filter, 
  Grid, 
  List, 
  SlidersHorizontal 
} from 'lucide-react';
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
  Card, 
  CardContent 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const FirmDocumentsPage: React.FC = () => {
  // Sample data for demonstration
  const documents = [
    { id: 1, title: '손해배상 소장', type: '소장', case: '김민준 vs 주식회사 건설', creator: '이변호', date: '2025-04-02', size: '1.2 MB', format: 'PDF' },
    { id: 2, title: '답변서', type: '답변서', case: '주식회사 테크놀로지 vs 이기술', creator: '이변호', date: '2025-04-01', size: '0.8 MB', format: 'DOCX' },
    { id: 3, title: '준비서면 1', type: '준비서면', case: '김민준 vs 주식회사 건설', creator: '박변호', date: '2025-03-30', size: '1.5 MB', format: 'DOCX' },
    { id: 4, title: '증거자료 1-5', type: '증거', case: '김민준 vs 주식회사 건설', creator: '이변호', date: '2025-03-29', size: '3.4 MB', format: 'PDF' },
    { id: 5, title: '계약서 검토', type: '계약서', case: '최수민', creator: '김변호', date: '2025-03-28', size: '0.9 MB', format: 'PDF' },
    { id: 6, title: '녹취록', type: '녹취', case: '박서연 형사 사건', creator: '김변호', date: '2025-03-27', size: '1.1 MB', format: 'MP3' },
    { id: 7, title: '출석요구서 사본', type: '기타', case: '박서연 형사 사건', creator: '사무장', date: '2025-03-26', size: '0.5 MB', format: 'PDF' },
    { id: 8, title: '감정서', type: '감정서', case: '이지훈 vs 주식회사 미디어', creator: '박변호', date: '2025-03-25', size: '2.2 MB', format: 'PDF' }
  ];

  // 문서 유형에 따른 아이콘과 색상 반환
  const getDocumentIcon = (type: string) => {
    const iconMap: { [key: string]: { icon: React.ReactNode, color: string } } = {
      '소장': { icon: <FileText className="h-6 w-6" />, color: 'bg-blue-100 text-blue-700' },
      '답변서': { icon: <FileText className="h-6 w-6" />, color: 'bg-purple-100 text-purple-700' },
      '준비서면': { icon: <FileText className="h-6 w-6" />, color: 'bg-amber-100 text-amber-700' },
      '증거': { icon: <File className="h-6 w-6" />, color: 'bg-green-100 text-green-700' },
      '판결문': { icon: <FileText className="h-6 w-6" />, color: 'bg-red-100 text-red-700' },
      '계약서': { icon: <FileText className="h-6 w-6" />, color: 'bg-indigo-100 text-indigo-700' },
      '녹취': { icon: <FileText className="h-6 w-6" />, color: 'bg-cyan-100 text-cyan-700' },
      '감정서': { icon: <FileText className="h-6 w-6" />, color: 'bg-emerald-100 text-emerald-700' },
      '기타': { icon: <File className="h-6 w-6" />, color: 'bg-gray-100 text-gray-700' }
    };

    return iconMap[type] || { icon: <File className="h-6 w-6" />, color: 'bg-gray-100 text-gray-700' };
  };

  return (
    <FirmLayout>
      <div className="container px-4 py-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">문서 관리</h1>
            <p className="text-gray-600">로펌의 모든 법률 문서를 한곳에서 관리하세요.</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="outline" className="border-legal-primary text-legal-primary hover:bg-legal-primary/10">
              <Folder className="mr-1 h-4 w-4" /> 폴더 만들기
            </Button>
            <Button className="bg-legal-primary hover:bg-legal-secondary">
              <Upload className="mr-1 h-4 w-4" /> 문서 업로드
            </Button>
          </div>
        </div>

        {/* 검색 및 필터 영역 */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="문서명, 내용, 사건 검색..."
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="문서 종류" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="complaint">소장</SelectItem>
                  <SelectItem value="answer">답변서</SelectItem>
                  <SelectItem value="brief">준비서면</SelectItem>
                  <SelectItem value="evidence">증거</SelectItem>
                  <SelectItem value="judgment">판결문</SelectItem>
                  <SelectItem value="contract">계약서</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="관련 사건" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="case1">김민준 사건</SelectItem>
                  <SelectItem value="case2">주식회사 테크놀로지</SelectItem>
                  <SelectItem value="case3">이지훈</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* 문서 보기 탭과 뷰 선택 */}
        <div className="flex items-center justify-between mb-4">
          <Tabs defaultValue="all" className="w-auto">
            <TabsList>
              <TabsTrigger value="all">모든 문서</TabsTrigger>
              <TabsTrigger value="recent">최근 문서</TabsTrigger>
              <TabsTrigger value="mine">내가 작성한 문서</TabsTrigger>
              <TabsTrigger value="templates">템플릿</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8">
              <Grid className="h-4 w-4 mr-1" /> 그리드
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <List className="h-4 w-4 mr-1" /> 리스트
            </Button>
          </div>
        </div>

        {/* 문서 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {documents.map((doc) => {
            const { icon, color } = getDocumentIcon(doc.type);
            return (
              <Card key={doc.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`rounded-md p-2 ${color}`}>
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{doc.title}</h3>
                      <p className="text-sm text-gray-500 truncate">{doc.case}</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline" className={color}>
                          {doc.type}
                        </Badge>
                        <span className="text-xs text-gray-500">{doc.date}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </FirmLayout>
  );
};

export default FirmDocumentsPage;
