
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PersonalInformationFormProps {
  formData: {
    plaintiff: {
      name: string;
      nationalId: string;
      address: string;
      phone: string;
      email: string;
    };
    defendant: {
      name: string;
      address: string;
      phone: string;
    };
  };
  onChange: (field: string, value: string, category: 'plaintiff' | 'defendant') => void;
}

const PersonalInformationForm: React.FC<PersonalInformationFormProps> = ({
  formData,
  onChange
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-legal-primary mb-4">고소인 (피해자) 정보</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="plaintiff-name">이름 *</Label>
            <Input 
              id="plaintiff-name" 
              value={formData.plaintiff.name}
              onChange={(e) => onChange('name', e.target.value, 'plaintiff')}
              placeholder="홍길동" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="plaintiff-nationalId">주민등록번호 *</Label>
            <Input 
              id="plaintiff-nationalId" 
              value={formData.plaintiff.nationalId}
              onChange={(e) => onChange('nationalId', e.target.value, 'plaintiff')}
              placeholder="000000-0000000" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="plaintiff-phone">연락처 *</Label>
            <Input 
              id="plaintiff-phone" 
              value={formData.plaintiff.phone}
              onChange={(e) => onChange('phone', e.target.value, 'plaintiff')}
              placeholder="010-1234-5678" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="plaintiff-email">이메일</Label>
            <Input 
              id="plaintiff-email" 
              type="email"
              value={formData.plaintiff.email}
              onChange={(e) => onChange('email', e.target.value, 'plaintiff')}
              placeholder="example@email.com" 
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="plaintiff-address">주소 *</Label>
            <Input 
              id="plaintiff-address" 
              value={formData.plaintiff.address}
              onChange={(e) => onChange('address', e.target.value, 'plaintiff')}
              placeholder="서울특별시 강남구 테헤란로 123" 
            />
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-legal-primary mb-4">피고소인 (가해자) 정보</h2>
        <p className="text-gray-500 text-sm mb-4">* 알고 있는 정보만 입력하세요. 모르는 경우 "성명불상" 등으로 입력할 수 있습니다.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="defendant-name">이름 *</Label>
            <Input 
              id="defendant-name" 
              value={formData.defendant.name}
              onChange={(e) => onChange('name', e.target.value, 'defendant')}
              placeholder="김철수 / 성명불상" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="defendant-phone">연락처</Label>
            <Input 
              id="defendant-phone" 
              value={formData.defendant.phone}
              onChange={(e) => onChange('phone', e.target.value, 'defendant')}
              placeholder="알고 있는 경우만 입력" 
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="defendant-address">주소 또는 소재지</Label>
            <Textarea 
              id="defendant-address" 
              value={formData.defendant.address}
              onChange={(e) => onChange('address', e.target.value, 'defendant')}
              placeholder="알고 있는 경우만 입력" 
              className="resize-none h-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationForm;
