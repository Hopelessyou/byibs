
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { HelpCircle } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const SupportPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Or loading spinner
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">고객 지원</h1>
          <p className="text-gray-600 mt-1">도움이 필요하신가요? 문의하시면 빠르게 답변드리겠습니다.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">문의하기</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">문의 제목</Label>
                    <Input id="subject" placeholder="문의 제목을 입력해주세요" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">문의 유형</Label>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="문의 유형 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="account">계정 문의</SelectItem>
                          <SelectItem value="payment">결제 문의</SelectItem>
                          <SelectItem value="document">문서 작성 문의</SelectItem>
                          <SelectItem value="feature">기능 제안</SelectItem>
                          <SelectItem value="other">기타</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">우선 순위</Label>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="우선 순위 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">낮음</SelectItem>
                          <SelectItem value="normal">보통</SelectItem>
                          <SelectItem value="high">높음</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">문의 내용</Label>
                    <Textarea id="message" placeholder="문의 내용을 자세히 입력해주세요" className="min-h-[200px]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="attachment">첨부 파일 (선택사항)</Label>
                    <Input id="attachment" type="file" />
                  </div>
                  <Button>문의 제출하기</Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-legal-primary/10 flex items-center justify-center text-legal-primary">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <CardTitle>자주 묻는 질문</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold">문서 작성은 어떻게 하나요?</p>
                  <p className="text-sm text-gray-600 mt-1">상단 메뉴에서 '문서 작성' 버튼을 클릭하여 시작할 수 있습니다.</p>
                </div>
                <div>
                  <p className="font-semibold">결제는 어떻게 진행되나요?</p>
                  <p className="text-sm text-gray-600 mt-1">계정 메뉴에서 결제 내역 및 구독 관리를 확인하실 수 있습니다.</p>
                </div>
                <div>
                  <p className="font-semibold">환불 정책은 어떻게 되나요?</p>
                  <p className="text-sm text-gray-600 mt-1">서비스 이용 후 7일 이내에 환불 요청이 가능합니다.</p>
                </div>
                <Button variant="outline" className="w-full">더 많은 FAQ 보기</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-legal-primary/10 flex items-center justify-center text-legal-primary">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <CardTitle>고객센터 연락처</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold">이메일</p>
                  <p className="text-legal-primary">support@example.com</p>
                </div>
                <div>
                  <p className="font-semibold">전화번호</p>
                  <p className="text-legal-primary">02-1234-5678</p>
                </div>
                <div>
                  <p className="font-semibold">운영시간</p>
                  <p className="text-sm text-gray-600">평일 09:00 - 18:00</p>
                  <p className="text-sm text-gray-600">주말 및 공휴일 휴무</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SupportPage;
