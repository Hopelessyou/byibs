
import React from 'react';
import FirmLayout from '@/components/firm/FirmLayout';
import { Settings, Building2, User, Shield, CreditCard, Bell, FileText, Mail, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const FirmSettingsPage: React.FC = () => {
  return (
    <FirmLayout>
      <div className="container px-4 py-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">로펌 설정</h1>
            <p className="text-gray-600">로펌 계정과 시스템 설정을 관리하세요.</p>
          </div>
        </div>

        {/* 설정 탭 */}
        <Tabs defaultValue="profile" className="w-full">
          <div className="flex flex-col md:flex-row gap-6">
            <Card className="md:w-64 flex-shrink-0">
              <CardContent className="p-4">
                <TabsList className="flex flex-col h-auto bg-transparent space-y-1">
                  <TabsTrigger value="profile" className="w-full justify-start px-3 py-2 h-auto data-[state=active]:bg-legal-primary/10">
                    <Building2 className="h-4 w-4 mr-2" />
                    <span>로펌 프로필</span>
                  </TabsTrigger>
                  <TabsTrigger value="account" className="w-full justify-start px-3 py-2 h-auto data-[state=active]:bg-legal-primary/10">
                    <User className="h-4 w-4 mr-2" />
                    <span>내 계정</span>
                  </TabsTrigger>
                  <TabsTrigger value="team" className="w-full justify-start px-3 py-2 h-auto data-[state=active]:bg-legal-primary/10">
                    <Users className="h-4 w-4 mr-2" />
                    <span>구성원 관리</span>
                  </TabsTrigger>
                  <TabsTrigger value="billing" className="w-full justify-start px-3 py-2 h-auto data-[state=active]:bg-legal-primary/10">
                    <CreditCard className="h-4 w-4 mr-2" />
                    <span>결제 정보</span>
                  </TabsTrigger>
                  <TabsTrigger value="security" className="w-full justify-start px-3 py-2 h-auto data-[state=active]:bg-legal-primary/10">
                    <Shield className="h-4 w-4 mr-2" />
                    <span>보안</span>
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="w-full justify-start px-3 py-2 h-auto data-[state=active]:bg-legal-primary/10">
                    <Bell className="h-4 w-4 mr-2" />
                    <span>알림 설정</span>
                  </TabsTrigger>
                  <TabsTrigger value="templates" className="w-full justify-start px-3 py-2 h-auto data-[state=active]:bg-legal-primary/10">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>문서 템플릿</span>
                  </TabsTrigger>
                  <TabsTrigger value="email" className="w-full justify-start px-3 py-2 h-auto data-[state=active]:bg-legal-primary/10">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>이메일 설정</span>
                  </TabsTrigger>
                </TabsList>
              </CardContent>
            </Card>

            <div className="flex-grow">
              {/* 로펌 프로필 */}
              <TabsContent value="profile" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>로펌 정보</CardTitle>
                    <CardDescription>로펌의 기본 정보와 프로필을 관리합니다.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-1">
                      <Label htmlFor="firm-name">로펌명</Label>
                      <Input id="firm-name" defaultValue="법무법인 정의" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="business-number">사업자등록번호</Label>
                        <Input id="business-number" defaultValue="123-45-67890" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="representative">대표 변호사</Label>
                        <Input id="representative" defaultValue="김대표" />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="address">주소</Label>
                      <Input id="address" defaultValue="서울특별시 서초구 법원로 1길 10, 5층" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="phone">대표 전화</Label>
                        <Input id="phone" defaultValue="02-1234-5678" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="email">대표 이메일</Label>
                        <Input id="email" defaultValue="contact@justice-law.com" />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="website">웹사이트</Label>
                      <Input id="website" defaultValue="https://www.justice-law.com" />
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="description">로펌 소개</Label>
                      <Textarea 
                        id="description" 
                        rows={5}
                        defaultValue="법무법인 정의는 2010년에 설립된 종합 법률 서비스 제공 기업으로, 민사, 형사, 행정, 가사, 기업법무 등 다양한 분야에서 전문적인 법률 서비스를 제공합니다."
                      />
                    </div>
                    
                    <div className="space-y-3 pt-2">
                      <Button className="bg-legal-primary hover:bg-legal-secondary">변경사항 저장</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* 내 계정 */}
              <TabsContent value="account" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>계정 정보</CardTitle>
                    <CardDescription>개인 계정 정보를 관리합니다.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-1">
                      <Label htmlFor="name">이름</Label>
                      <Input id="name" defaultValue="김대표" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="email">이메일</Label>
                        <Input id="email" defaultValue="kim@justice-law.com" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="phone">휴대폰</Label>
                        <Input id="phone" defaultValue="010-1234-5678" />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="position">직책</Label>
                      <Input id="position" defaultValue="대표 변호사" />
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="current-password">현재 비밀번호</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="new-password">새 비밀번호</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="confirm-password">비밀번호 확인</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-2">
                      <Button className="bg-legal-primary hover:bg-legal-secondary">변경사항 저장</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* 구성원 관리 */}
              <TabsContent value="team" className="mt-0">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>구성원 관리</CardTitle>
                        <CardDescription>로펌 구성원을 관리하고 권한을 설정합니다.</CardDescription>
                      </div>
                      <Button className="bg-legal-primary hover:bg-legal-secondary">
                        <Users className="mr-1 h-4 w-4" /> 구성원 추가
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-md">
                      <div className="grid grid-cols-12 p-3 bg-gray-50 border-b font-medium text-sm">
                        <div className="col-span-3">이름</div>
                        <div className="col-span-3">이메일</div>
                        <div className="col-span-2">직책</div>
                        <div className="col-span-2">권한</div>
                        <div className="col-span-2">상태</div>
                      </div>
                      
                      {[
                        { name: '김대표', email: 'kim@justice-law.com', position: '대표 변호사', role: '관리자', status: '활성' },
                        { name: '이변호', email: 'lee@justice-law.com', position: '파트너 변호사', role: '편집자', status: '활성' },
                        { name: '박변호', email: 'park@justice-law.com', position: '변호사', role: '일반', status: '활성' },
                        { name: '최사무장', email: 'choi@justice-law.com', position: '사무장', role: '일반', status: '활성' },
                        { name: '정직원', email: 'jung@justice-law.com', position: '사무직원', role: '일반', status: '활성' },
                      ].map((member, i) => (
                        <div key={i} className={`grid grid-cols-12 p-3 ${i % 2 === 1 ? 'bg-gray-50' : ''} border-b last:border-0`}>
                          <div className="col-span-3 flex items-center">
                            <div className="font-medium">{member.name}</div>
                          </div>
                          <div className="col-span-3 flex items-center">{member.email}</div>
                          <div className="col-span-2 flex items-center">{member.position}</div>
                          <div className="col-span-2 flex items-center">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              member.role === '관리자' ? 'bg-blue-100 text-blue-800' : 
                              member.role === '편집자' ? 'bg-purple-100 text-purple-800' : 
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {member.role}
                            </span>
                          </div>
                          <div className="col-span-2 flex items-center">
                            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              {member.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* 결제 정보 */}
              <TabsContent value="billing" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>결제 정보</CardTitle>
                    <CardDescription>서비스 구독 및 결제 정보를 관리합니다.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                      <div className="flex items-start">
                        <div className="mr-4">
                          <Shield className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-blue-800">현재 구독: 프리미엄 플랜</h3>
                          <p className="text-sm text-blue-700 mt-1">무제한 사건, 문서 저장, 고급 분석 기능 포함</p>
                          <p className="text-sm font-medium mt-1">다음 갱신일: 2025년 8월 15일</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-3">결제 방법</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 mr-2 text-gray-500" />
                          <span>신용카드 (1234-xxxx-xxxx-5678)</span>
                        </div>
                        <Button variant="outline" size="sm">변경</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-3">결제 이력</h3>
                      <div className="space-y-2">
                        {[
                          { date: '2025-03-15', amount: '150,000원', desc: '프리미엄 구독 (1개월)' },
                          { date: '2025-02-15', amount: '150,000원', desc: '프리미엄 구독 (1개월)' },
                          { date: '2025-01-15', amount: '150,000원', desc: '프리미엄 구독 (1개월)' }
                        ].map((payment, i) => (
                          <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
                            <div>
                              <div>{payment.desc}</div>
                              <div className="text-sm text-gray-500">{payment.date}</div>
                            </div>
                            <div className="font-medium">{payment.amount}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-2">
                      <div className="flex space-x-2">
                        <Button variant="outline" className="text-legal-primary border-legal-primary">구독 변경</Button>
                        <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">구독 취소</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* 보안 */}
              <TabsContent value="security" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>보안 설정</CardTitle>
                    <CardDescription>계정 보안 설정을 관리합니다.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="2fa" className="text-base font-medium">2단계 인증</Label>
                          <p className="text-sm text-gray-500 mt-1">로그인 시 추가 인증 코드 필요</p>
                        </div>
                        <Switch id="2fa" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="session" className="text-base font-medium">자동 로그아웃</Label>
                          <p className="text-sm text-gray-500 mt-1">1시간 동안 활동이 없으면 자동 로그아웃</p>
                        </div>
                        <Switch id="session" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="ip-restrict" className="text-base font-medium">IP 제한</Label>
                          <p className="text-sm text-gray-500 mt-1">특정 IP에서만 접속 허용</p>
                        </div>
                        <Switch id="ip-restrict" />
                      </div>
                    </div>
                    
                    <div className="border-t pt-4 mt-4">
                      <h3 className="font-medium mb-3">로그인 기록</h3>
                      <div className="space-y-2">
                        {[
                          { date: '2025-04-03 09:15', ip: '123.45.67.89', device: 'Chrome on Windows' },
                          { date: '2025-04-02 14:22', ip: '123.45.67.89', device: 'Safari on MacOS' },
                          { date: '2025-04-01 10:05', ip: '98.76.54.32', device: 'Chrome on Android' }
                        ].map((session, i) => (
                          <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
                            <div>
                              <div>{session.device}</div>
                              <div className="text-sm text-gray-500">{session.ip}</div>
                            </div>
                            <div className="text-sm">{session.date}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-2">
                      <Button className="bg-legal-primary hover:bg-legal-secondary">설정 저장</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* 알림 설정 */}
              <TabsContent value="notifications" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>알림 설정</CardTitle>
                    <CardDescription>알림 수신 방법과 유형을 설정합니다.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-base font-medium mb-2">알림 방식</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Switch id="email-notifications" defaultChecked />
                            <Label htmlFor="email-notifications">이메일</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="sms-notifications" defaultChecked />
                            <Label htmlFor="sms-notifications">SMS</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="push-notifications" defaultChecked />
                            <Label htmlFor="push-notifications">앱 푸시 알림</Label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <h3 className="text-base font-medium mb-2">알림 유형</h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-1 font-medium">사건 관련</div>
                            <div className="col-span-2">
                              <div className="flex items-center justify-between mb-2">
                                <Label htmlFor="case-update" className="flex-grow">사건 업데이트</Label>
                                <Switch id="case-update" defaultChecked />
                              </div>
                              <div className="flex items-center justify-between mb-2">
                                <Label htmlFor="court-date" className="flex-grow">재판 기일 (3일 전)</Label>
                                <Switch id="court-date" defaultChecked />
                              </div>
                              <div className="flex items-center justify-between">
                                <Label htmlFor="deadline" className="flex-grow">마감일 알림</Label>
                                <Switch id="deadline" defaultChecked />
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-1 font-medium">상담 관련</div>
                            <div className="col-span-2">
                              <div className="flex items-center justify-between mb-2">
                                <Label htmlFor="new-consultation" className="flex-grow">새로운 상담 요청</Label>
                                <Switch id="new-consultation" defaultChecked />
                              </div>
                              <div className="flex items-center justify-between mb-2">
                                <Label htmlFor="consultation-reminder" className="flex-grow">상담 일정 알림</Label>
                                <Switch id="consultation-reminder" defaultChecked />
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-1 font-medium">청구 관련</div>
                            <div className="col-span-2">
                              <div className="flex items-center justify-between mb-2">
                                <Label htmlFor="payment-received" className="flex-grow">결제 완료</Label>
                                <Switch id="payment-received" defaultChecked />
                              </div>
                              <div className="flex items-center justify-between mb-2">
                                <Label htmlFor="invoice-due" className="flex-grow">청구서 마감일</Label>
                                <Switch id="invoice-due" defaultChecked />
                              </div>
                              <div className="flex items-center justify-between">
                                <Label htmlFor="overdue" className="flex-grow">미납 알림</Label>
                                <Switch id="overdue" defaultChecked />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3 pt-2">
                        <Button className="bg-legal-primary hover:bg-legal-secondary">설정 저장</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* 문서 템플릿 */}
              <TabsContent value="templates" className="mt-0">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>문서 템플릿</CardTitle>
                        <CardDescription>자주 사용하는 문서 템플릿을 관리합니다.</CardDescription>
                      </div>
                      <Button className="bg-legal-primary hover:bg-legal-secondary">
                        <FileText className="mr-1 h-4 w-4" /> 새 템플릿
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-md">
                      <div className="grid grid-cols-12 p-3 bg-gray-50 border-b font-medium text-sm">
                        <div className="col-span-4">템플릿 이름</div>
                        <div className="col-span-3">문서 유형</div>
                        <div className="col-span-2">최종 수정일</div>
                        <div className="col-span-2">생성자</div>
                        <div className="col-span-1">작업</div>
                      </div>
                      
                      {[
                        { name: '민사 소장 기본', type: '소장', date: '2025-03-15', creator: '김대표' },
                        { name: '항소장 템플릿', type: '항소장', date: '2025-03-10', creator: '이변호' },
                        { name: '형사 변론요지서', type: '변론요지서', date: '2025-02-28', creator: '박변호' },
                        { name: '내용증명 기본', type: '내용증명', date: '2025-02-20', creator: '이변호' },
                        { name: '법률 자문 의견서', type: '의견서', date: '2025-02-15', creator: '김대표' },
                      ].map((template, i) => (
                        <div key={i} className={`grid grid-cols-12 p-3 ${i % 2 === 1 ? 'bg-gray-50' : ''} border-b last:border-0`}>
                          <div className="col-span-4 flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="font-medium">{template.name}</span>
                          </div>
                          <div className="col-span-3 flex items-center">{template.type}</div>
                          <div className="col-span-2 flex items-center">{template.date}</div>
                          <div className="col-span-2 flex items-center">{template.creator}</div>
                          <div className="col-span-1 flex items-center">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">메뉴 열기</span>
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* 이메일 설정 */}
              <TabsContent value="email" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>이메일 설정</CardTitle>
                    <CardDescription>자동 이메일 서식 및 발송 설정을 관리합니다.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-1">
                      <Label htmlFor="email-from">발신자 이메일</Label>
                      <Input id="email-from" defaultValue="no-reply@justice-law.com" />
                    </div>
                    
                    <div className="space-y-1">
                      <Label htmlFor="email-name">발신자 이름</Label>
                      <Input id="email-name" defaultValue="법무법인 정의" />
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="text-base font-medium mb-3">이메일 자동 발송 설정</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="font-medium">상담 확인 이메일</Label>
                            <p className="text-sm text-gray-500">상담 예약 시 고객에게 자동 발송</p>
                          </div>
                          <Switch id="consultation-email" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="font-medium">청구서 발행 이메일</Label>
                            <p className="text-sm text-gray-500">청구서 생성 시 고객에게 자동 발송</p>
                          </div>
                          <Switch id="invoice-email" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="font-medium">미납 안내 이메일</Label>
                            <p className="text-sm text-gray-500">청구서 마감일 경과 시 발송</p>
                          </div>
                          <Switch id="reminder-email" defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h3 className="text-base font-medium mb-3">이메일 템플릿</h3>
                      <div className="space-y-4">
                        <div className="border rounded-md p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">상담 확인 이메일</h4>
                            <Button variant="outline" size="sm">편집</Button>
                          </div>
                          <p className="text-sm text-gray-600">상담 일정, 장소, 준비물 안내 이메일 템플릿</p>
                        </div>
                        
                        <div className="border rounded-md p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">청구서 발행 이메일</h4>
                            <Button variant="outline" size="sm">편집</Button>
                          </div>
                          <p className="text-sm text-gray-600">청구 금액, 마감일, 결제 방법 안내 이메일 템플릿</p>
                        </div>
                        
                        <div className="border rounded-md p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">미납 안내 이메일</h4>
                            <Button variant="outline" size="sm">편집</Button>
                          </div>
                          <p className="text-sm text-gray-600">미납 금액, 연체 일수, 결제 유도 안내 이메일 템플릿</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-2">
                      <Button className="bg-legal-primary hover:bg-legal-secondary">설정 저장</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </FirmLayout>
  );
};

export default FirmSettingsPage;
