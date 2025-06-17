
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Menu, 
  X, 
  FileText, 
  Users, 
  Calendar, 
  MessageSquare, 
  Clock, 
  BarChart4, 
  Settings, 
  LogOut, 
  BriefcaseIcon, 
  Bell,
  Search,
  ChevronDown,
  Shield
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FirmLayoutProps {
  children: React.ReactNode;
}

const FirmLayout: React.FC<FirmLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  
  const handleLogout = () => {
    logout();
    toast.success('로그아웃 되었습니다');
    navigate('/firm/login');
  };

  // Primary navigation items for the sidebar
  const mainNavItems = [
    { path: '/firm/dashboard', label: '대시보드', icon: Building2 },
    { path: '/firm/cases', label: '사건 관리', icon: BriefcaseIcon },
    { path: '/firm/documents', label: '문서 관리', icon: FileText },
    { path: '/firm/clients', label: '고객 관리', icon: Users },
    { path: '/firm/calendar', label: '일정 관리', icon: Calendar },
    { path: '/firm/consultations', label: '상담 관리', icon: MessageSquare },
    { path: '/firm/billing', label: '청구 관리', icon: Clock },
    { path: '/firm/analytics', label: '통계', icon: BarChart4 },
  ];
  
  // Secondary navigation items for the sidebar
  const secondaryNavItems = [
    { path: '/firm/settings', label: '설정', icon: Settings },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:relative lg:translate-x-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <Link to="/firm/dashboard" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-legal-primary" />
            <span className="font-bold text-xl text-legal-primary">로펌 포털</span>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            className="lg:hidden" 
            onClick={toggleSidebar}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="px-2 py-4 space-y-8 overflow-y-auto h-[calc(100%-4rem)]">
          <nav>
            <ul className="space-y-1">
              {mainNavItems.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      isActive(item.path) 
                        ? 'text-legal-primary bg-legal-primary/10' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div>
            <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              시스템
            </h3>
            <nav className="mt-2">
              <ul className="space-y-1">
                {secondaryNavItems.map((item) => (
                  <li key={item.path}>
                    <Link 
                      to={item.path}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        isActive(item.path) 
                          ? 'text-legal-primary bg-legal-primary/10' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
                
                <li>
                  <button 
                    className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    <span>로그아웃</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                className="mr-2 lg:hidden" 
                onClick={toggleSidebar}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="relative md:w-64">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="사건, 문서, 고객 검색..." 
                  className="w-full pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-legal-primary focus:border-transparent" 
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-1">
                    <div className="w-8 h-8 rounded-full bg-legal-primary/10 flex items-center justify-center">
                      <Building2 className="h-4 w-4 text-legal-primary" />
                    </div>
                    <span className="hidden md:block text-sm font-medium">법무법인 정의</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>법무법인 정의</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="px-2 py-1.5">
                    <p className="text-xs text-gray-500">관리자: 김대표 변호사</p>
                    <p className="text-xs text-gray-500">회원 등급: 프리미엄</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center cursor-pointer">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>로펌 프로필 관리</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center cursor-pointer">
                    <Users className="mr-2 h-4 w-4" />
                    <span>구성원 관리</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>계정 설정</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center cursor-pointer" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>로그아웃</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default FirmLayout;
