
import React from 'react';
import { Shield, Lock, CheckCircle, FileCheck } from 'lucide-react';

const SecurityFeature: React.FC = () => {
  return (
    <div className="security-feature">
      <div className="flex justify-center mb-6">
        <div className="p-5 bg-navy-100 rounded-full shadow-inner">
          <div className="p-4 bg-navy-600 rounded-full shadow-lg">
            <Shield size={64} className="text-white" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
            <Lock size={20} className="text-navy-600 mr-2" />
            <h4 className="font-semibold text-navy-800">SSL 암호화</h4>
          </div>
          <p className="text-sm text-gray-600">모든 데이터 전송 과정에 강력한 암호화 적용</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
            <FileCheck size={20} className="text-navy-600 mr-2" />
            <h4 className="font-semibold text-navy-800">문서 보안</h4>
          </div>
          <p className="text-sm text-gray-600">생성된 법률 문서 안전하게 보관 및 관리</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
            <CheckCircle size={20} className="text-navy-600 mr-2" />
            <h4 className="font-semibold text-navy-800">개인정보 보호</h4>
          </div>
          <p className="text-sm text-gray-600">엄격한 개인정보 취급 방침 준수</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
            <Shield size={20} className="text-navy-600 mr-2" />
            <h4 className="font-semibold text-navy-800">접근 제어</h4>
          </div>
          <p className="text-sm text-gray-600">문서별 권한 설정으로 안전한 접근 관리</p>
        </div>
      </div>
      
      <div className="flex justify-center mt-4">
        <div className="bg-navy-100 text-navy-600 text-xs px-3 py-1 rounded-full font-medium">
          KISA 정보보호 인증 완료
        </div>
      </div>
    </div>
  );
};

export default SecurityFeature;
