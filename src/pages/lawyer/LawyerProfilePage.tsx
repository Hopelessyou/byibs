
import React from 'react';
import LawyerLayout from '@/components/lawyer/LawyerLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, FileText, User, Briefcase, Calendar } from 'lucide-react';

const LawyerProfilePage = () => {
  return (
    <LawyerLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">내 프로필</h1>
        <p className="text-gray-500">프로필 정보를 확인하고 관리하세요</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>프로필</CardTitle>
            <CardDescription>개인 정보 및 연락처</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl bg-legal-primary text-white">김</AvatarFallback>
              </Avatar>
              <h3 className="mt-4 text-xl font-bold">김변호사</h3>
              <p className="text-gray-500">변호사</p>
              <Badge className="mt-2">10년 경력</Badge>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-500 mr-2" />
                <span>lawyer@example.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-gray-500 mr-2" />
                <span>010-1234-5678</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                <span>서울시 강남구 테헤란로 123</span>
              </div>
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-gray-500 mr-2" />
                <span>변호사 등록번호: 12345</span>
              </div>
            </div>
            
            <Button className="w-full">프로필 편집</Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>활동 내역</CardTitle>
            <CardDescription>최근 사건 및 활동</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">담당 사건</h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Briefcase className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="font-medium">김철수 교통사고 손해배상</p>
                    <p className="text-xs text-gray-500">사건번호: 1001 · 상태: 검토중</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Briefcase className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="font-medium">이영희 부동산 매매계약 분쟁</p>
                    <p className="text-xs text-gray-500">사건번호: 1002 · 상태: 작성중</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Briefcase className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="font-medium">주식회사 ABC 상표권 침해</p>
                    <p className="text-xs text-gray-500">사건번호: 1003 · 상태: 제출완료</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">다가오는 일정</h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-500 mr-3" />
                  <div>
                    <p className="font-medium">김철수 상담</p>
                    <p className="text-xs text-gray-500">오늘 14:00</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-red-500 mr-3" />
                  <div>
                    <p className="font-medium">법원 출석 (서울중앙지법)</p>
                    <p className="text-xs text-gray-500">내일 10:00</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </LawyerLayout>
  );
};

export default LawyerProfilePage;
