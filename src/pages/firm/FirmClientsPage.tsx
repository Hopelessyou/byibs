
import React from 'react';
import FirmLayout from '@/components/firm/FirmLayout';
import { Users, UserPlus, Search, Filter, SlidersHorizontal, Building, User, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent
} from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const FirmClientsPage: React.FC = () => {
  // Sample data for demonstration
  const clients = [
    { 
      id: 1, 
      name: '김민준', 
      type: '개인', 
      phone: '010-1234-5678', 
      email: 'kim@example.com', 
      address: '서울시 강남구', 
      activeCases: 2,
      completedCases: 1,
      totalRevenue: 5000000,
      tags: ['VIP', '민사']
    },
    { 
      id: 2, 
      name: '주식회사 테크놀로지', 
      type: '법인', 
      phone: '02-1234-5678', 
      email: 'tech@example.com', 
      address: '서울시 서초구', 
      activeCases: 1,
      completedCases: 0,
      totalRevenue: 10000000,
      tags: ['계약', '상사']
    },
    { 
      id: 3, 
      name: '이지훈', 
      type: '개인', 
      phone: '010-2345-6789', 
      email: 'lee@example.com', 
      address: '서울시 마포구', 
      activeCases: 1,
      completedCases: 0,
      totalRevenue: 3000000,
      tags: ['특허']
    },
    { 
      id: 4, 
      name: '박서연', 
      type: '개인', 
      phone: '010-3456-7890', 
      email: 'park@example.com', 
      address: '경기도 분당구', 
      activeCases: 1,
      completedCases: 0,
      totalRevenue: 1500000,
      tags: ['형사']
    },
    { 
      id: 5, 
      name: '최수민', 
      type: '개인', 
      phone: '010-4567-8901', 
      email: 'choi@example.com', 
      address: '서울시 중구', 
      activeCases: 0,
      completedCases: 1,
      totalRevenue: 2000000,
      tags: ['부동산']
    },
    { 
      id: 6, 
      name: '주식회사 건설', 
      type: '법인', 
      phone: '02-3456-7890', 
      email: 'const@example.com', 
      address: '서울시 송파구', 
      activeCases: 0,
      completedCases: 1,
      totalRevenue: 8000000,
      tags: ['건설', '계약']
    }
  ];

  return (
    <FirmLayout>
      <div className="container px-4 py-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">고객 관리</h1>
            <p className="text-gray-600">모든 고객 정보를 효율적으로 관리하세요.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-legal-primary hover:bg-legal-secondary">
              <UserPlus className="mr-1 h-4 w-4" /> 신규 고객
            </Button>
          </div>
        </div>

        {/* 검색 및 필터 영역 */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="고객명, 연락처, 이메일 검색..."
                className="pl-9"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="고객 유형" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="individual">개인</SelectItem>
                  <SelectItem value="corporate">법인</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="사건 관련" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="active">진행중 사건</SelectItem>
                  <SelectItem value="completed">종결 사건</SelectItem>
                  <SelectItem value="none">사건 없음</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* 고객 탭 */}
        <Tabs defaultValue="all" className="w-full mb-4">
          <TabsList>
            <TabsTrigger value="all">모든 고객</TabsTrigger>
            <TabsTrigger value="individual">개인</TabsTrigger>
            <TabsTrigger value="corporate">법인</TabsTrigger>
            <TabsTrigger value="vip">VIP</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* 고객 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((client) => (
            <Card key={client.id} className="hover:shadow-md transition-shadow cursor-pointer border border-gray-200">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    client.type === '법인' ? 'bg-indigo-100' : 'bg-blue-100'
                  }`}>
                    {client.type === '법인' ? (
                      <Building className="h-6 w-6 text-indigo-600" />
                    ) : (
                      <User className="h-6 w-6 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900">{client.name}</h3>
                      <Badge variant={client.type === '법인' ? 'outline' : 'secondary'}>
                        {client.type}
                      </Badge>
                    </div>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-3 w-3 mr-2" />
                        {client.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-3 w-3 mr-2" />
                        {client.email}
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">진행 사건:</span>
                        <span className="font-medium">{client.activeCases}건</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">완료 사건:</span>
                        <span className="font-medium">{client.completedCases}건</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {client.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </FirmLayout>
  );
};

export default FirmClientsPage;
