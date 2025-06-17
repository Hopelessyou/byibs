import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Users, Bell, FileText, AlertCircle, ShieldAlert, 
  CheckCircle, Clock, Calendar, Settings, MessageSquare 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';

const AdminNotificationsPage = () => {
  const systemAlerts = [
    { id: 1, title: '시스템 백업 완료', time: '오늘 03:00', type: 'success', read: true },
    { id: 2, title: '디스크 사용량 경고', time: '어제 14:23', type: 'warning', read: false },
    { id: 3, title: '로그인 실패 5회 초과', time: '어제 10:15', type: 'danger', read: false },
    { id: 4, title: '새 버전 업데이트 가능', time: '2023-06-01 09:30', type: 'info', read: true }
  ];
  
  const userNotifications = [
    { id: 1, title: '새로운 사용자 가입', user: '김철수', time: '오늘 09:15', read: false },
    { id: 2, title: '구독 플랜 변경', user: '이영희', time: '어제 16:45', read: true },
    { id: 3, title: '결제 실패', user: '박민수', time: '어제 13:20', read: false },
    { id: 4, title: '문서 업로드', user: '최수연', time: '2023-06-01 11:30', read: true }
  ];

  const scheduledNotifications = [
    { id: 1, title: '정기 점검 안내', schedule: '2023-06-10 22:00', status: 'scheduled', audience: '모든 사용자' },
    { id: 2, title: '서비스 이용약관 변경 안내', schedule: '2023-06-15 09:00', status: 'scheduled', audience: '모든 사용자' },
    { id: 3, title: '프리미엄 기능 업데이트 안내', schedule: '2023-06-20 10:00', status: 'draft', audience: '프리미엄 사용자' }
  ];

  return (
    <AdminLayout title="알림/공지 관리">
      <Tabs defaultValue="alerts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="alerts">시스템 알림</TabsTrigger>
          <TabsTrigger value="users">사용자 알림</TabsTrigger>
          <TabsTrigger value="scheduled">예약된 공지</TabsTrigger>
          <TabsTrigger value="settings">알림 설정</TabsTrigger>
        </TabsList>
        
        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>시스템 알림</CardTitle>
                  <CardDescription>시스템 상태 및 중요 이벤트 알림</CardDescription>
                </div>
                <div>
                  <Badge variant="outline" className="ml-2">
                    {systemAlerts.filter(alert => !alert.read).length}개 읽지 않음
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemAlerts.map(alert => (
                  <div 
                    key={alert.id} 
                    className={`p-4 rounded-lg border flex items-start ${!alert.read ? 'bg-amber-50 border-amber-200' : ''}`}
                  >
                    <div className={`p-2 rounded-full mr-3 ${
                      alert.type === 'success' ? 'bg-green-100' :
                      alert.type === 'warning' ? 'bg-amber-100' :
                      alert.type === 'danger' ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      {alert.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
                      {alert.type === 'warning' && <AlertCircle className="h-5 w-5 text-amber-600" />}
                      {alert.type === 'danger' && <ShieldAlert className="h-5 w-5 text-red-600" />}
                      {alert.type === 'info' && <Bell className="h-5 w-5 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{alert.title}</h4>
                        <span className="text-xs text-gray-500">{alert.time}</span>
                      </div>
                      <div className="flex items-center mt-2">
                        {!alert.read && <Badge variant="outline" className="text-amber-600 border-amber-300 mr-2">읽지 않음</Badge>}
                        <Badge variant={
                          alert.type === 'success' ? 'outline' : 
                          alert.type === 'warning' ? 'secondary' :
                          alert.type === 'danger' ? 'destructive' : 'outline'
                        }>
                          {alert.type === 'success' ? '성공' : 
                           alert.type === 'warning' ? '경고' : 
                           alert.type === 'danger' ? '위험' : '정보'}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      {alert.read ? '다시 읽음 표시' : '읽음 표시'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>사용자 관련 알림</CardTitle>
                  <CardDescription>사용자 활동 및 계정 관련 알림</CardDescription>
                </div>
                <div>
                  <Badge variant="outline" className="ml-2">
                    {userNotifications.filter(n => !n.read).length}개 읽지 않음
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userNotifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`p-4 rounded-lg border flex items-start ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}
                  >
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{notification.title}</h4>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">사용자: {notification.user}</p>
                      {!notification.read && <Badge variant="outline" className="text-blue-600 border-blue-300 mt-2">읽지 않음</Badge>}
                    </div>
                    <Button variant="ghost" size="sm">
                      {notification.read ? '다시 읽음 표시' : '읽음 표시'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scheduled">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>예약된 공지사항</CardTitle>
                  <CardDescription>사용자에게 발송될 공지사항 관리</CardDescription>
                </div>
                <Button>새 공지 작성</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>제목</TableHead>
                    <TableHead>예약 시간</TableHead>
                    <TableHead>대상</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead className="text-right">작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduledNotifications.map(notification => (
                    <TableRow key={notification.id}>
                      <TableCell className="font-medium">{notification.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          {notification.schedule}
                        </div>
                      </TableCell>
                      <TableCell>{notification.audience}</TableCell>
                      <TableCell>
                        <Badge variant={notification.status === 'scheduled' ? 'outline' : 'secondary'}>
                          {notification.status === 'scheduled' ? '예약됨' : '초안'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm">수정</Button>
                          <Button variant="ghost" size="sm" className="text-red-600">삭제</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>알림 설정</CardTitle>
              <CardDescription>시스템 알림 및 공지 설정 관리</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">시스템 알림 설정</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">보안 알림</p>
                    <p className="text-sm text-gray-500">로그인 실패, 권한 변경 등의 알림</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">서버 상태 알림</p>
                    <p className="text-sm text-gray-500">서버 부하, 오류 등의 알림</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">데이터베이스 알림</p>
                    <p className="text-sm text-gray-500">백업, 용량 경고 등의 알림</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">공지사항 설정</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">자동 공지 발송</p>
                    <p className="text-sm text-gray-500">예약된 시간에 자동으로 공지를 발송합니다</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">이메일 발송</p>
                    <p className="text-sm text-gray-500">중요 공지를 이메일로도 발송합니다</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-sender">기본 발신자 이메일</Label>
                  <Input id="default-sender" defaultValue="notice@gosojang.com" />
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

export default AdminNotificationsPage;
