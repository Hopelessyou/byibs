
import React from 'react';
import LawyerLayout from '@/components/lawyer/LawyerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const LawyerTemplatesPage = () => {
  return (
    <LawyerLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">템플릿 관리</h1>
        <p className="text-gray-500">자주 사용하는 문서 템플릿을 관리하세요</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>템플릿 라이브러리</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700">템플릿 기능 준비 중</h3>
            <p className="text-gray-500 mt-2 max-w-md">
              문서 템플릿 관리 기능이 곧 제공될 예정입니다. 자주 사용하는 법률 문서의 템플릿을 만들고 관리할 수 있습니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </LawyerLayout>
  );
};

export default LawyerTemplatesPage;
