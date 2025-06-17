
import React, { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  ChevronLeft, ChevronRight, LogOut, Settings, User, FileText, 
  Scale, Home, Briefcase, Calendar, MessageSquare, CreditCard, 
  Bell, FileCheck, Users, Folder, PanelLeft, Bookmark
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface LawyerLayoutProps {
  children: ReactNode;
}

const LawyerLayout = ({ children }: LawyerLayoutProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('로그아웃 되었습니다.');
    navigate('/lawyer/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const sidebarLinks = [
    { href: '/lawyer/dashboard', label: '대시보드', icon: Home },
    { href: '/lawyer/cases', label: '사건 관리', icon: Briefcase, notifications: 3 },
    { href: '/lawyer/documents', label: '소장 작성', icon: FileText },
    { href: '/lawyer/templates', label: '템플릿 관리', icon: Folder },
    { href: '/lawyer/clients', label: '의뢰인 관리', icon: Users },
    { href: '/lawyer/consultations', label: '상담 관리', icon: MessageSquare, notifications: 2 },
    { href: '/lawyer/calendar', label: '일정 관리', icon: Calendar },
    { href: '/lawyer/payments', label: '결제 관리', icon: CreditCard },
    { href: '/lawyer/library', label: '법률 자료실', icon: Bookmark },
    { href: '/lawyer/settings', label: '설정', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={cn(
          "bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out shadow-sm",
          collapsed ? "w-20" : "w-72"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "h-16 flex items-center border-b border-gray-100",
          collapsed ? "justify-center px-4" : "px-6"
        )}>
          <Link to="/lawyer/dashboard" className="flex items-center space-x-3">
            <Scale className="h-8 w-8 text-legal-primary" />
            {!collapsed && <span className="text-xl font-bold text-legal-primary">법률 포털</span>}
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="px-3 space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "flex items-center py-3 px-4 rounded-lg transition-colors group relative",
                  isActive(link.href)
                    ? "bg-legal-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <link.icon className={cn(
                  "h-5 w-5",
                  collapsed ? "mx-auto" : "mr-3"
                )} />
                
                {!collapsed && <span>{link.label}</span>}
                
                {link.notifications && (
                  <Badge
                    variant="destructive"
                    className={cn(
                      "ml-auto rounded-full px-1.5 h-5 min-w-5 flex items-center justify-center",
                      collapsed && "absolute -top-1 -right-1"
                    )}
                  >
                    {link.notifications}
                  </Badge>
                )}
                
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity w-max z-10">
                    {link.label}
                  </div>
                )}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Collapse button */}
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            size="sm"
            className="w-full flex items-center justify-center"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight /> : <>
              <ChevronLeft className="mr-2" />
              <span>메뉴 접기</span>
            </>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 sticky top-0 z-10">
          <div className="flex-1 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">
              {sidebarLinks.find(link => isActive(link.href))?.label || '대시보드'}
            </h1>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">5</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>알림</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-[300px] overflow-y-auto">
                    {[
                      { id: 1, title: '새 사건이 등록되었습니다', time: '10분 전', type: 'case' },
                      { id: 2, title: '문서 검토 요청이 있습니다', time: '1시간 전', type: 'document' },
                      { id: 3, title: '의뢰인 채팅 메시지가 도착했습니다', time: '3시간 전', type: 'message' },
                      { id: 4, title: '내일 법원 출석 예정입니다', time: '5시간 전', type: 'calendar' },
                      { id: 5, title: '결제가 완료되었습니다', time: '1일 전', type: 'payment' },
                    ].map(notification => (
                      <DropdownMenuItem key={notification.id} className="p-3 cursor-pointer">
                        <div className="flex items-start space-x-3">
                          <div className="bg-blue-100 p-2 rounded-full">
                            {notification.type === 'case' && <Briefcase className="h-4 w-4 text-blue-600" />}
                            {notification.type === 'document' && <FileCheck className="h-4 w-4 text-blue-600" />}
                            {notification.type === 'message' && <MessageSquare className="h-4 w-4 text-blue-600" />}
                            {notification.type === 'calendar' && <Calendar className="h-4 w-4 text-blue-600" />}
                            {notification.type === 'payment' && <CreditCard className="h-4 w-4 text-blue-600" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{notification.title}</p>
                            <p className="text-xs text-gray-500">{notification.time}</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-center" asChild>
                    <Link to="/lawyer/notifications">모든 알림 보기</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-legal-primary text-white">김</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">김변호사</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link to="/lawyer/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>프로필</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link to="/lawyer/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>설정</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>로그아웃</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default LawyerLayout;
