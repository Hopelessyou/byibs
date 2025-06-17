
import React from 'react';
import LawyerLayout from '@/components/lawyer/LawyerLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Settings, Bell, Shield, CreditCard } from 'lucide-react';

const LawyerSettingsPage = () => {
  return (
    <LawyerLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">설정</h1>
        <p className="text-gray-500">계정, 알림, 보안 설정을 관리하세요</p>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">계정</TabsTrigger>
          <TabsTrigger value="notifications">알림</TabsTrigger>
          <TabsTrigger value="security">보안</TabsTrigger>
          <TabsTrigger value="billing">결제</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>계정 설정</CardTitle>
              <CardDescription>개인 정보와 계정 설정을 관리합니다</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">개인 정보</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">이름</Label>
                    <Input id="name" defaultValue="김변호사" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input id="email" defaultValue="lawyer@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">전화번호</Label>
                    <Input id="phone" defaultValue="010-1234-5678" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license">변호사 등록 번호</Label>
                    <Input id="license" defaultValue="12345" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">사무소 정보</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firm-name">사무소명</Label>
                    <Input id="firm-name" defaultValue="김변호사 법률사무소" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="firm-address">주소</Label>
                    <Input id="firm-address" defaultValue="서울시 강남구 테헤란로 123" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">취소</Button>
                <Button>저장</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>알림 설정</CardTitle>
              <CardDescription>알림 수신 방법과 유형을 설정합니다</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">이메일 알림</p>
                    <p className="text-sm text-gray-500">중요 알림을 이메일로 받습니다</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS 알림</p>
                    <p className="text-sm text-gray-500">긴급 알림을 SMS로 받습니다</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">브라우저 알림</p>
                    <p className="text-sm text-gray-500">웹사이트 사용 중 브라우저 알림을 받습니다</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>보안 설정</CardTitle>
              <CardDescription>비밀번호 및 계정 보안을 관리합니다</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">비밀번호 변경</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">현재 비밀번호</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">새 비밀번호</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">비밀번호 확인</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">2단계 인증</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">2단계 인증 활성화</p>
                    <p className="text-sm text-gray-500">로그인 시 추가 보안 코드가 필요합니다</p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">취소</Button>
                <Button>변경사항 저장</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>결제 설정</CardTitle>
              <CardDescription>구독 및 결제 정보를 관리합니다</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CreditCard className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700">결제 관리 기능 준비 중</h3>
                <p className="text-gray-500 mt-2 max-w-md">
                  결제 관리 기능이 곧 제공될 예정입니다. 구독 정보를 확인하고 결제 수단을 관리할 수 있습니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </LawyerLayout>
  );
};

export default LawyerSettingsPage;
