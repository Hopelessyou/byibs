
import React from 'react';
import { Smartphone, Laptop, Tablet } from 'lucide-react';

const MobileAccess: React.FC = () => {
  return (
    <div className="mobile-access-container text-center">
      <div className="flex justify-center gap-4 mb-8">
        <div className="relative transform -rotate-6">
          <div className="bg-gray-800 w-32 h-64 rounded-2xl p-2 shadow-xl">
            <div className="bg-white w-full h-full rounded-lg overflow-hidden">
              <div className="bg-legal-primary h-10 flex items-center justify-center">
                <span className="text-white text-xs font-semibold">고소장닷컴</span>
              </div>
              <div className="p-2">
                <div className="w-full h-6 bg-gray-100 rounded mb-2"></div>
                <div className="w-full h-4 bg-gray-100 rounded mb-2"></div>
                <div className="w-3/4 h-4 bg-gray-100 rounded mb-4"></div>
                
                <div className="w-full h-20 bg-blue-50 rounded flex items-center justify-center">
                  <span className="text-xs text-legal-accent">작성중</span>
                </div>
                
                <div className="mt-4">
                  <div className="w-full h-4 bg-gray-100 rounded mb-1"></div>
                  <div className="w-full h-4 bg-gray-100 rounded mb-1"></div>
                  <div className="w-1/2 h-4 bg-gray-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gray-800 rounded-full"></div>
        </div>
        
        <div className="relative hidden md:block transform rotate-6">
          <div className="bg-gray-800 w-48 h-32 rounded-lg p-1 shadow-lg">
            <div className="bg-white w-full h-full rounded overflow-hidden">
              <div className="bg-legal-primary h-5 flex items-center pl-2">
                <span className="text-white text-[8px] font-semibold">고소장닷컴 - 태블릿</span>
              </div>
              <div className="p-1 flex">
                <div className="w-1/3 p-1">
                  <div className="w-full h-4 bg-gray-100 rounded mb-1"></div>
                  <div className="w-full h-4 bg-gray-100 rounded mb-1"></div>
                  <div className="w-full h-4 bg-gray-100 rounded"></div>
                </div>
                <div className="w-2/3 p-1">
                  <div className="w-full h-16 bg-blue-50 rounded flex items-center justify-center">
                    <span className="text-[8px] text-legal-accent">미리보기</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="device-list flex justify-center gap-8 mb-6">
        <div className="flex flex-col items-center">
          <div className="p-2 bg-legal-accent rounded-full text-white mb-2">
            <Smartphone size={24} />
          </div>
          <span className="text-sm font-medium">스마트폰</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="p-2 bg-gray-200 rounded-full text-gray-600 mb-2">
            <Tablet size={24} />
          </div>
          <span className="text-sm font-medium">태블릿</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="p-2 bg-gray-200 rounded-full text-gray-600 mb-2">
            <Laptop size={24} />
          </div>
          <span className="text-sm font-medium">데스크탑</span>
        </div>
      </div>
      
      <p className="text-sm text-gray-600">
        모든 기기에서 동일한 사용자 경험을 제공합니다.<br />
        시작한 작업을 다른 기기에서도 이어서 진행할 수 있습니다.
      </p>
    </div>
  );
};

export default MobileAccess;
