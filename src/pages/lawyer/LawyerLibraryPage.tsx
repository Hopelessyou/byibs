
import React from 'react';
import LawyerLayout from '@/components/lawyer/LawyerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bookmark } from 'lucide-react';

const LawyerLibraryPage = () => {
  return (
    <LawyerLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">법률 자료실</h1>
        <p className="text-gray-500">판례, 법령, 논문 등의 법률 자료를 검색하고 저장하세요</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>법률 자료</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Bookmark className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700">법률 자료실 기능 준비 중</h3>
            <p className="text-gray-500 mt-2 max-w-md">
              법률 자료실 기능이 곧 제공될 예정입니다. 판례, 법령, 논문 등 다양한 법률 자료를 검색하고 저장할 수 있습니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </LawyerLayout>
  );
};

export default LawyerLibraryPage;
