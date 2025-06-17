
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdminSettingsPage = () => {
  return (
    <AdminLayout title="시스템 설정">
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">일반</TabsTrigger>
          <TabsTrigger value="security">보안</TabsTrigger>
          <TabsTrigger value="users">사용자</TabsTrigger>
          <TabsTrigger value="integrations">연동</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>일반 설정</CardTitle>
              <CardDescription>시스템 기본 설정을 관리합니다</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">사이트 정보</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">사이트명</Label>
                    <Input id="site-name" defaultValue="고소장닷컴" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-url">사이트 URL</Label>
                    <Input id="site-url" defaultValue="https://gosojang.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">관리자 이메일</Label>
                    <Input id="admin-email" defaultValue="admin@gosojang.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="support-email">고객지원 이메일</Label>
                    <Input id="support-email" defaultValue="support@gosojang.com" />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">시스템 설정</h3>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">유지보수 모드</p>
                      <p className="text-sm text-gray-500">사이트를 유지보수 모드로 전환합니다</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">회원가입 허용</p>
                      <p className="text-sm text-gray-500">새로운 사용자의 회원가입을 허용합니다</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-upload">최대 업로드 크기 (MB)</Label>
                    <Input id="max-upload" type="number" defaultValue="10" />
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
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>보안 설정</CardTitle>
              <CardDescription>시스템 보안 설정을 관리합니다</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">비밀번호 정책</h3>
                <div className="space-y-2">
                  <Label htmlFor="min-length">최소 길이</Label>
                  <Input id="min-length" type="number" defaultValue="8" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">특수문자 필요</p>
                    <p className="text-sm text-gray-500">비밀번호에 특수문자를 포함해야 합니다</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">대소문자 구분</p>
                    <p className="text-sm text-gray-500">비밀번호에 대문자와 소문자를 모두 포함해야 합니다</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">로그인 설정</h3>
                <div className="space-y-2">
                  <Label htmlFor="max-attempts">최대 로그인 시도 횟수</Label>
                  <Input id="max-attempts" type="number" defaultValue="5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lockout">계정 잠금 시간 (분)</Label>
                  <Input id="lockout" type="number" defaultValue="30" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">2단계 인증 필수</p>
                    <p className="text-sm text-gray-500">관리자 계정은 2단계 인증을 필수로 합니다</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">취소</Button>
                <Button>저장</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>사용자 설정</CardTitle>
              <CardDescription>사용자 관련 설정을 관리합니다</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">회원가입</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">이메일 인증 필수</p>
                    <p className="text-sm text-gray-500">가입 시 이메일 인증을 요구합니다</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-role">기본 역할</Label>
                  <Select defaultValue="user">
                    <SelectTrigger id="default-role">
                      <SelectValue placeholder="역할 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">일반 사용자</SelectItem>
                      <SelectItem value="premium">프리미엄 사용자</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">프로필</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">실명 입력 필수</p>
                    <p className="text-sm text-gray-500">사용자 프로필에 실명 입력을 필수로 합니다</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">프로필 사진 허용</p>
                    <p className="text-sm text-gray-500">사용자 프로필 사진 업로드를 허용합니다</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">취소</Button>
                <Button>저장</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>연동 설정</CardTitle>
              <CardDescription>외부 서비스 연동을 관리합니다</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">결제 연동</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">결제 게이트웨이 활성화</p>
                    <p className="text-sm text-gray-500">온라인 결제 시스템을 활성화합니다</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-gateway">결제 게이트웨이</Label>
                  <Select defaultValue="inicis">
                    <SelectTrigger id="payment-gateway">
                      <SelectValue placeholder="게이트웨이 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inicis">이니시스</SelectItem>
                      <SelectItem value="kcp">KCP</SelectItem>
                      <SelectItem value="toss">토스페이먼츠</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">이메일 서비스</h3>
                <div className="space-y-2">
                  <Label htmlFor="email-service">이메일 서비스 제공자</Label>
                  <Select defaultValue="smtp">
                    <SelectTrigger id="email-service">
                      <SelectValue placeholder="서비스 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smtp">SMTP</SelectItem>
                      <SelectItem value="mailgun">Mailgun</SelectItem>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">SMTP 호스트</Label>
                  <Input id="smtp-host" defaultValue="smtp.example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP 포트</Label>
                  <Input id="smtp-port" defaultValue="587" />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">취소</Button>
                <Button>저장</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
