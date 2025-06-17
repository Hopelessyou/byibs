
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Download, Printer } from 'lucide-react';

interface DocumentPreviewProps {
  formData: {
    documentType: string;
    plaintiff: {
      name: string;
      address: string;
      phone: string;
      email: string;
    };
    defendant: {
      name: string;
      address: string;
      phone: string;
    };
    incidentDate?: Date;
    incidentLocation: string;
    incidentDetails: string;
    damages: string;
  };
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ formData }) => {
  const documentTypeLabel = {
    'fraud': '사기',
    'defamation': '명예훼손',
    'assault': '폭행',
    'etc': '기타 형사사건'
  }[formData.documentType] || '형사고소';
  
  const formatDate = (date?: Date) => {
    if (!date) return '날짜 미지정';
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };
  
  const today = new Date();
  const formattedToday = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-legal-primary">문서 미리보기</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-1" />
            인쇄
          </Button>
          <Button size="sm" className="bg-legal-primary hover:bg-legal-secondary">
            <Download className="h-4 w-4 mr-1" />
            PDF 다운로드
          </Button>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 p-4 border-b">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-legal-primary" />
            <span className="font-medium">{documentTypeLabel} 고소장</span>
          </div>
        </div>
        
        <div className="p-8 bg-white space-y-8 font-serif">
          <div className="text-center space-y-6">
            <h1 className="text-2xl font-bold">고 소 장</h1>
            
            <div className="flex justify-end">
              <div className="text-right space-y-2">
                <p>작성일자: {formattedToday}</p>
              </div>
            </div>
          </div>
          
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-t border-b">
                <td className="py-3 px-4 bg-gray-50 font-medium w-24">고소인</td>
                <td className="py-3 px-4">
                  <div className="space-y-1">
                    <p>이름: {formData.plaintiff.name || '(미입력)'}</p>
                    <p>주소: {formData.plaintiff.address || '(미입력)'}</p>
                    <p>연락처: {formData.plaintiff.phone || '(미입력)'}</p>
                    {formData.plaintiff.email && <p>이메일: {formData.plaintiff.email}</p>}
                  </div>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 bg-gray-50 font-medium w-24">피고소인</td>
                <td className="py-3 px-4">
                  <div className="space-y-1">
                    <p>이름: {formData.defendant.name || '성명불상'}</p>
                    {formData.defendant.address && <p>주소: {formData.defendant.address}</p>}
                    {formData.defendant.phone && <p>연락처: {formData.defendant.phone}</p>}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center">고소 취지</h2>
            <p className="leading-relaxed">
              위 피고소인을 {documentTypeLabel} 혐의로 고소하오니 처벌하여 주시기 바랍니다.
            </p>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center">고소 원인</h2>
            
            <div className="space-y-2">
              <h3 className="font-bold">1. 당사자의 관계</h3>
              <p className="leading-relaxed text-gray-600">
                (고소인과 피고소인의 관계는 사건 내용에서 유추할 수 있음)
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-bold">2. 범죄사실</h3>
              <p className="leading-relaxed">
                피고소인은 {formData.incidentDate ? formatDate(formData.incidentDate) : '(날짜 미입력)'} {formData.incidentLocation || '(장소 미입력)'}에서 다음과 같은 행위를 하였습니다:
              </p>
              <p className="leading-relaxed whitespace-pre-line pl-4 border-l-2 border-gray-200">
                {formData.incidentDetails || '(사건 내용 미입력)'}
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-bold">3. 피해사실</h3>
              <p className="leading-relaxed whitespace-pre-line">
                {formData.damages || '(피해 내용 미입력)'}
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-bold">4. 결론</h3>
              <p className="leading-relaxed">
                이상과 같이 피고소인의 행위는 형법 제X조 {documentTypeLabel}에 해당하므로, 엄중한 처벌을 구합니다.
              </p>
            </div>
          </div>
          
          <div className="pt-10">
            <div className="text-right space-y-6">
              <p>{formattedToday}</p>
              <p>고소인: {formData.plaintiff.name} (인)</p>
            </div>
          </div>
          
          <div className="pt-10 text-center">
            <p className="font-bold text-xl">OO 지방검찰청 귀중</p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          * 이 문서는 미리보기용이며, 실제 제출 전에 변호사 검수를 권장합니다. 요금제에 따라 기본 검수 또는 심층 검수 옵션이 제공됩니다.
        </p>
      </div>
    </div>
  );
};

export default DocumentPreview;
