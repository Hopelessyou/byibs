
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

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
          <h1 className="text-3xl font-bold">계정 정보</h1>
          <p className="text-gray-600 mt-1">개인 정보 및 계정 설정을 관리하세요.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/placeholder.svg" alt="프로필 이미지" />
                    <AvatarFallback>사용자</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold mb-1">홍길동</h3>
                  <p className="text-sm text-gray-600 mb-4">user@example.com</p>
                  <Button variant="outline" size="sm" className="w-full">
                    프로필 이미지 변경
                  </Button>
                </div>
                
                <div className="mt-6 space-y-1">
                  <div className="flex justify-between text-sm py-2">
                    <span className="text-gray-600">가입일</span>
                    <span>2023년 7월 15일</span>
                  </div>
                  <div className="flex justify-between text-sm py-2">
                    <span className="text-gray-600">마지막 로그인</span>
                    <span>2023년 8월 20일</span>
                  </div>
                  <div className="flex justify-between text-sm py-2">
                    <span className="text-gray-600">계정 상태</span>
                    <span className="text-green-600">활성화</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">개인 정보</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? '취소' : '정보 수정'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">이름</Label>
                        <Input id="name" defaultValue="홍길동" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">이메일</Label>
                        <Input id="email" defaultValue="user@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">휴대폰 번호</Label>
                        <Input id="phone" defaultValue="010-1234-5678" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">주소</Label>
                        <Input id="address" defaultValue="서울시 강남구" />
                      </div>
                    </div>
                    <Button className="mt-4">저장하기</Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">이름</label>
                      <p className="font-medium">홍길동</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">이메일</label>
                      <p className="font-medium">user@example.com</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">휴대폰 번호</label>
                      <p className="font-medium">010-1234-5678</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">주소</label>
                      <p className="font-medium">서울시 강남구</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">보안 설정</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium">비밀번호 변경</p>
                    <p className="text-sm text-gray-600">주기적으로 비밀번호를 변경하면 계정 보안이 강화됩니다</p>
                  </div>
                  <Button variant="outline">변경하기</Button>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium">2단계 인증</p>
                    <p className="text-sm text-gray-600">로그인 시 추가 보안 코드를 요구하여 계정 보안을 강화합니다</p>
                  </div>
                  <Button variant="outline">설정하기</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountPage;
