
import React from 'react';
import LawyerLayout from '@/components/lawyer/LawyerLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import {
  Briefcase, MessageSquare, Calendar, FileText, AlertCircle,
  Bell, Clock, CheckCircle, MoreHorizontal, Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

const LawyerNotificationsPage = () => {
  const notifications = [
    { 
      id: 1, 
      title: '새 사건이 등록되었습니다', 
      description: '김철수 교통사고 손해배상 사건이 등록되었습니다.', 
      time: '10분 전',
      type: 'case',
      read: false 
    },
    { 
      id: 2, 
      title: '문서 검토 요청이 있습니다', 
      description: '이영희 부동산 매매계약 분쟁 관련 문서 검토가 필요합니다.', 
      time: '1시간 전',
      type: 'document',
      read: false 
    },
    { 
      id: 3, 
      title: '의뢰인 채팅 메시지가 도착했습니다', 
      description: '김철수님이 새로운 메시지를 보냈습니다.', 
      time: '3시간 전',
      type: 'message',
      read: true 
    },
    { 
      id: 4, 
      title: '내일 법원 출석 예정입니다', 
      description: '서울중앙지법 출석 일정이 내일 오전 10시입니다.', 
      time: '5시간 전',
      type: 'calendar',
      read: true 
    },
    { 
      id: 5, 
      title: '결제가 완료되었습니다', 
      description: '정기 구독 결제가 성공적으로 완료되었습니다.', 
      time: '1일 전',
      type: 'payment',
      read: true 
    },
  ];

  const renderNotificationIcon = (type: string) => {
    switch(type) {
      case 'case':
        return <Briefcase className="h-5 w-5 text-blue-500" />;
      case 'document':
        return <FileText className="h-5 w-5 text-amber-500" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-green-500" />;
      case 'calendar':
        return <Calendar className="h-5 w-5 text-red-500" />;
      case 'payment':
        return <CheckCircle className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <LawyerLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">알림</h1>
        <p className="text-gray-500">중요 알림과 업데이트를 확인하세요</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-legal-primary border-legal-primary">
            총 {notifications.length}개
          </Badge>
          <Badge variant="destructive">
            읽지 않음 {notifications.filter(n => !n.read).length}개
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            필터
          </Button>
          <Button variant="outline" size="sm">
            모두 읽음 표시
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="unread">읽지 않음</TabsTrigger>
          <TabsTrigger value="cases">사건</TabsTrigger>
          <TabsTrigger value="messages">메시지</TabsTrigger>
          <TabsTrigger value="system">시스템</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>모든 알림</CardTitle>
              <CardDescription>최근 알림과 업데이트</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className={`p-4 rounded-lg border flex items-start ${notification.read ? 'bg-white' : 'bg-blue-50'}`}>
                  <div className="bg-gray-100 p-2 rounded-full mr-4">
                    {renderNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{notification.title}</h4>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>읽음 표시</DropdownMenuItem>
                      <DropdownMenuItem>알림 끄기</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">삭제</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="unread">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-gray-500 py-8">
                <AlertCircle className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                <p>읽지 않은 알림만 표시됩니다.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cases">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-gray-500 py-8">
                <Briefcase className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                <p>사건 관련 알림만 표시됩니다.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="messages">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-gray-500 py-8">
                <MessageSquare className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                <p>메시지 알림만 표시됩니다.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-gray-500 py-8">
                <Bell className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                <p>시스템 알림만 표시됩니다.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </LawyerLayout>
  );
};

export default LawyerNotificationsPage;
