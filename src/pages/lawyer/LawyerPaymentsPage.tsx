
import React from 'react';
import LawyerLayout from '@/components/lawyer/LawyerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';

const LawyerPaymentsPage = () => {
  return (
    <LawyerLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">결제 관리</h1>
        <p className="text-gray-500">의뢰인 결제 내역과 청구서를 관리하세요</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>결제 내역</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CreditCard className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700">결제 관리 기능 준비 중</h3>
            <p className="text-gray-500 mt-2 max-w-md">
              결제 관리 기능이 곧 제공될 예정입니다. 의뢰인 결제 내역을 확인하고 청구서를 발행할 수 있습니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </LawyerLayout>
  );
};

export default LawyerPaymentsPage;
