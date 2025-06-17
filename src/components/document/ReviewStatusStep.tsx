
import React from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useDocument } from '@/contexts/DocumentContext';

interface ReviewStatusStepProps {
  onRequestReview: () => void;
  onRequestRevision?: () => void;
  chatSummary?: string;
  lawyerFeedback?: string;
}

const ReviewStatusStep: React.FC<ReviewStatusStepProps> = ({ 
  onRequestReview,
  onRequestRevision,
  chatSummary,
  lawyerFeedback
}) => {
  const { currentDocument, documentStatus } = useDocument();
  
  const getStatusDisplay = () => {
    if (!currentDocument) {
      return 'pending';
    }
    
    switch (currentDocument.status) {
      case 'pending_review':
      case 'in_review':
        return 'in_progress';
      case 'approved':
        return 'completed';
      case 'needs_revision':
        return 'rejected';
      default:
        return 'pending';
    }
  };
  
  const status = getStatusDisplay();
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-legal-primary mb-4">변호사 검수</h2>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 p-4 border-b">
          <div className="flex items-center justify-between">
            <span className="font-medium">검수 상태</span>
            {status === 'pending' && (
              <Button onClick={onRequestReview} size="sm">
                검수 요청하기
              </Button>
            )}
          </div>
        </div>
        
        <div className="p-6">
          {status === 'pending' && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
              <h3 className="text-lg font-medium">검수 대기 중</h3>
              <p className="text-gray-600 mt-2 max-w-md">
                변호사 검수를 요청하기 전에 입력하신 모든 정보가 정확한지 확인해 주세요. 
                검수를 시작하려면 '검수 요청하기' 버튼을 클릭하세요.
              </p>
            </div>
          )}
          
          {status === 'in_progress' && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Clock className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-lg font-medium">검수 진행 중</h3>
              <p className="text-gray-600 mt-2 max-w-md">
                현재 변호사가 고소장 내용을 검토 중입니다. 영업일 기준 1-2일 내에 검수가 완료됩니다.
              </p>
              <div className="w-full max-w-md mt-6">
                <Progress value={30} className="h-2 w-full" />
                <p className="text-sm text-gray-500 mt-2">진행 상태: 30%</p>
              </div>
            </div>
          )}
          
          {status === 'completed' && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-lg font-medium">검수 완료</h3>
              <p className="text-gray-600 mt-2 max-w-md">
                변호사 검수가 완료되었습니다. 이제 '문서 미리보기' 탭에서 고소장을 확인하고 다운로드하실 수 있습니다.
              </p>
              
              {lawyerFeedback && (
                <div className="mt-6 w-full max-w-md p-4 bg-gray-50 border rounded-lg text-left">
                  <h4 className="font-medium mb-2">변호사 피드백</h4>
                  <p className="text-gray-700">{lawyerFeedback}</p>
                </div>
              )}
            </div>
          )}
          
          {status === 'rejected' && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-lg font-medium">추가 정보 필요</h3>
              <p className="text-gray-600 mt-2 max-w-md">
                변호사 검토 결과, 고소장 작성을 위해 추가 정보가 필요합니다. 
                아래 피드백을 확인하고 정보를 보완해 주세요.
              </p>
              
              {lawyerFeedback && (
                <div className="mt-6 w-full max-w-md p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                  <h4 className="font-medium mb-2 text-red-700">변호사 피드백</h4>
                  <p className="text-gray-700">{lawyerFeedback}</p>
                </div>
              )}
              
              <Button 
                className="mt-6" 
                variant="outline" 
                onClick={onRequestRevision || onRequestReview}
              >
                정보 보완 후 재검수 요청
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {chatSummary && (
        <div className="mt-6 border rounded-lg p-4">
          <h3 className="font-medium mb-2">AI 상담 요약</h3>
          <p className="text-gray-700 whitespace-pre-line">{chatSummary}</p>
        </div>
      )}
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <p className="text-sm text-blue-800">
          * 변호사 검수는 영업일 기준 1-2일 소요됩니다. 복잡한 사건은 추가 시간이 필요할 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default ReviewStatusStep;
