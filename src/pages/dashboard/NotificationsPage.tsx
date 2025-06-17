
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Bell } from 'lucide-react';

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

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
          <h1 className="text-3xl font-bold">알림</h1>
          <p className="text-gray-600 mt-1">최근 알림과 업데이트 내용입니다.</p>
        </header>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-legal-primary/10 flex items-center justify-center text-legal-primary">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">문서 검토 완료</CardTitle>
                  <CardDescription>1시간 전</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>'교통사고 고소장' 문서 검토가 완료되었습니다. 확인해주세요.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-legal-primary/10 flex items-center justify-center text-legal-primary">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">문서 피드백</CardTitle>
                  <CardDescription>3시간 전</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>'명예훼손 고소장'에 대한 수정 요청이 있습니다.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-legal-primary/10 flex items-center justify-center text-legal-primary">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">시스템 업데이트</CardTitle>
                  <CardDescription>1일 전</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>새로운 문서 템플릿이 추가되었습니다. 지금 확인해보세요.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default NotificationsPage;
