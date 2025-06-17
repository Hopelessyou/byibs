
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

interface PdfQualityPreviewProps {
  documentType: string;
  documentTitle: string;
  onDownload: () => void;
}

const PdfQualityPreview: React.FC<PdfQualityPreviewProps> = ({
  documentType,
  documentTitle,
  onDownload
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-elegant">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-sm text-gray-500 font-medium">{documentType}</p>
          <h3 className="text-xl font-bold text-legal-primary font-serif">{documentTitle}</h3>
        </div>
        <Button 
          variant="outline" 
          onClick={onDownload}
          className="flex items-center space-x-2 border-legal-accent text-legal-accent hover:bg-legal-accent hover:text-white btn-ripple"
        >
          <FileDown className="h-4 w-4" />
          <span>PDF 다운로드</span>
        </Button>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-md border border-gray-100 relative shadow-sm">
        <div className="absolute top-4 right-4 bg-legal-accent/10 text-legal-accent text-xs font-medium px-2 py-1 rounded">
          인쇄물 품질
        </div>
        <div className="space-y-4 mt-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="flex space-x-4">
            <div className="w-1/3">
              <div className="h-24 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4 mt-1"></div>
            </div>
            <div className="w-2/3 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-4/5"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
          
          <div className="space-y-1 mt-6">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-4">
          <div className="flex justify-between">
            <div className="w-1/3">
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
            <div className="w-1/3">
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-center text-sm text-gray-500 mt-4">
        인쇄물 품질의 문서는 법원 제출용으로 최적화되어 있습니다
      </p>
    </div>
  );
};

export default PdfQualityPreview;
