
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PaymentsPage: React.FC = () => {
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
          <h1 className="text-3xl font-bold">결제 내역</h1>
          <p className="text-gray-600 mt-1">결제 내역 및 구독 정보를 확인하세요.</p>
        </header>

        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">현재 구독 플랜</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-legal-primary">기본 플랜</p>
                  <p className="text-gray-600 mt-1">월 5건의 문서 작성 가능</p>
                </div>
                <Button>플랜 업그레이드</Button>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <p className="font-medium">다음 결제일: 2023년 9월 15일</p>
                <p className="text-sm text-gray-600 mt-1">결제 카드: **** **** **** 1234</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">결제 내역</h2>
          <Card>
            <CardContent className="p-0">
              <div className="border-b p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-legal-primary/10 flex items-center justify-center text-legal-primary">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">기본 플랜 월 구독료</p>
                    <p className="text-sm text-gray-600">2023년 8월 15일</p>
                  </div>
                </div>
                <p className="font-semibold">29,000원</p>
              </div>
              
              <div className="border-b p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-legal-primary/10 flex items-center justify-center text-legal-primary">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">기본 플랜 월 구독료</p>
                    <p className="text-sm text-gray-600">2023년 7월 15일</p>
                  </div>
                </div>
                <p className="font-semibold">29,000원</p>
              </div>
              
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-legal-primary/10 flex items-center justify-center text-legal-primary">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">기본 플랜 월 구독료</p>
                    <p className="text-sm text-gray-600">2023년 6월 15일</p>
                  </div>
                </div>
                <p className="font-semibold">29,000원</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentsPage;
