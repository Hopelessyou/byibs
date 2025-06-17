
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  CreditCard, 
  MessageSquare,
  BarChart, 
  Settings, 
  Bell,
  LogOut 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

interface SidebarLinkProps {
  icon: React.ElementType;
  label: string;
  path: string;
  active?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ icon: Icon, label, path, active }) => {
  return (
    <Link to={path} className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
      active 
        ? "bg-legal-primary/10 text-legal-primary font-medium" 
        : "hover:bg-gray-100 text-gray-700"
    )}>
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title = '관리자 대시보드' }) => {
  const { isAdmin, logout } = useAdmin();
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  
  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-legal-primary" />
            <span className="text-xl font-semibold text-legal-primary">고소장닷컴</span>
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="flex-grow p-4 space-y-1">
          <SidebarLink 
            icon={LayoutDashboard} 
            label="대시보드" 
            path="/admin/dashboard"
            active={pathname === '/admin/dashboard'}
          />
          <SidebarLink 
            icon={Users} 
            label="사용자 관리" 
            path="/admin/users"
            active={pathname === '/admin/users'}
          />
          <SidebarLink 
            icon={FileText} 
            label="문서 관리" 
            path="/admin/documents"
            active={pathname.includes('/admin/documents')}
          />
          <SidebarLink 
            icon={CreditCard} 
            label="결제/구독 관리" 
            path="/admin/billing"
            active={pathname === '/admin/billing'}
          />
          <SidebarLink 
            icon={MessageSquare} 
            label="CS/문의 관리" 
            path="/admin/support"
            active={pathname === '/admin/support'}
          />
          <SidebarLink 
            icon={BarChart} 
            label="통계/분석" 
            path="/admin/analytics"
            active={pathname === '/admin/analytics'}
          />
          <SidebarLink 
            icon={Settings} 
            label="시스템 설정" 
            path="/admin/settings"
            active={pathname === '/admin/settings'}
          />
          <SidebarLink 
            icon={Bell} 
            label="알림/공지 관리" 
            path="/admin/notifications"
            active={pathname === '/admin/notifications'}
          />
        </nav>
        
        {/* Logout */}
        <div className="p-4 border-t">
          <Button 
            variant="ghost" 
            onClick={logout}
            className="w-full justify-start text-gray-700 hover:text-legal-primary hover:bg-legal-primary/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            로그아웃
          </Button>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-legal-primary/20 flex items-center justify-center text-legal-primary font-medium">
              A
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
