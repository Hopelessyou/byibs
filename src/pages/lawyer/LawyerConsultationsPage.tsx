
import React from 'react';
import LawyerLayout from '@/components/lawyer/LawyerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

const LawyerConsultationsPage = () => {
  return (
    <LawyerLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">상담 관리</h1>
        <p className="text-gray-500">의뢰인 상담 일정과 내역을 관리하세요</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>상담 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <MessageSquare className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700">상담 관리 기능 준비 중</h3>
            <p className="text-gray-500 mt-2 max-w-md">
              의뢰인 상담 관리 기능이 곧 제공될 예정입니다. 상담 일정을 등록하고 상담 내역을 기록하여 효율적으로 관리할 수 있습니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </LawyerLayout>
  );
};

export default LawyerConsultationsPage;
