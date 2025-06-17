
import React from 'react';
import LawyerLayout from '@/components/lawyer/LawyerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const LawyerClientsPage = () => {
  return (
    <LawyerLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">의뢰인 관리</h1>
        <p className="text-gray-500">의뢰인 정보와 사건 내역을 관리하세요</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>의뢰인 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Users className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700">의뢰인 관리 기능 준비 중</h3>
            <p className="text-gray-500 mt-2 max-w-md">
              의뢰인 관리 기능이 곧 제공될 예정입니다. 의뢰인 정보를 등록하고 사건 내역을 연결하여 효율적으로 관리할 수 있습니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </LawyerLayout>
  );
};

export default LawyerClientsPage;
