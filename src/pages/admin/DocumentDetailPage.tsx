
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Users, MapPin, Calendar, FileText, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAdmin } from '@/contexts/AdminContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DocumentType } from '@/types/document';

const DocumentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin, selectedDocument, selectDocument, isLoading, reviewDocument } = useAdmin();
  const [feedback, setFeedback] = useState('');
  const [actionType, setActionType] = useState<'approve' | 'request_revision' | 'reject'>('approve');
  const [dialogOpen, setDialogOpen] = useState(false);
  
  useEffect(() => {
    if (isAdmin && id) {
      selectDocument(id);
    } else if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, id, navigate]);
  
  const formatDate = (date: Date | undefined) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('ko-KR');
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_review':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">검토 대기 중</Badge>;
      case 'in_review':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">검토 진행 중</Badge>;
      case 'needs_revision':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">추가 정보 필요</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">승인 완료</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const handleBackToList = () => {
    navigate('/admin/documents');
  };
  
  const handleOpenDialog = (action: 'approve' | 'request_revision' | 'reject') => {
    setActionType(action);
    
    // Set default feedback based on action
    if (action === 'approve') {
      setFeedback('법적으로 문제가 없습니다. 고소장이 승인되었습니다.');
    } else if (action === 'request_revision') {
      setFeedback('추가 정보가 필요합니다. 아래 내용을 보완해주세요.');
    } else {
      setFeedback('문서 내용에 법적 문제가 있어 반려합니다.');
    }
    
    setDialogOpen(true);
  };
  
  const handleReviewSubmit = async () => {
    if (id) {
      const success = await reviewDocument(id, actionType, feedback);
      if (success) {
        setDialogOpen(false);
        // After successful review, navigate back to document list
        navigate('/admin/documents');
      }
    }
  };
  
  const getActionButtonColor = (action: string) => {
    switch (action) {
      case 'approve':
        return 'bg-green-600 hover:bg-green-700';
      case 'request_revision':
        return 'bg-amber-500 hover:bg-amber-600';
      case 'reject':
        return 'bg-red-600 hover:bg-red-700';
      default:
        return '';
    }
  };

  const getDocumentTypeDisplay = (docType: DocumentType): string => {
    switch (docType) {
      case 'fraud': return '사기';
      case 'defamation': return '명예훼손';
      case 'negligence': return '업무상 과실';
      case 'assault': return '폭행';
      case 'contract_breach': return '계약 위반';
      case 'traffic': return '교통';
      case 'voice_phishing': return '보이스피싱';
      case 'sexual_crime': return '성범죄';
      case 'loan': return '대여금';
      case 'real_estate': return '부동산';
      case 'other_criminal': return '기타 형사';
      case 'other_civil': return '기타 민사';
      case 'other': return '기타';
      default: return '기타';
    }
  };

  if (isLoading || !selectedDocument) {
    return (
      <AdminLayout title="문서 상세">
        <div className="p-8 text-center">
          <p>문서를 불러오는 중입니다...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="문서 상세 검토">
      <div className="mb-6 flex items-center">
        <Button 
          variant="outline" 
          onClick={handleBackToList} 
          className="mr-4"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          목록으로
        </Button>
        
        <h3 className="text-lg font-medium">
          문서 ID: {selectedDocument.id} 
          <span className="ml-3">
            {getStatusBadge(selectedDocument.status)}
          </span>
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <User className="mr-2 h-5 w-5 text-blue-500" />
              원고 정보
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">이름</dt>
                <dd>{selectedDocument.plaintiff.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">연락처</dt>
                <dd>{selectedDocument.plaintiff.phone}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">주소</dt>
                <dd className="text-sm">{selectedDocument.plaintiff.address}</dd>
              </div>
              {selectedDocument.plaintiff.email && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">이메일</dt>
                  <dd>{selectedDocument.plaintiff.email}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Users className="mr-2 h-5 w-5 text-red-500" />
              피고 정보
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">이름</dt>
                <dd>{selectedDocument.defendant.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">연락처</dt>
                <dd>{selectedDocument.defendant.phone}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">주소</dt>
                <dd className="text-sm">{selectedDocument.defendant.address}</dd>
              </div>
              {selectedDocument.defendant.email && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">이메일</dt>
                  <dd>{selectedDocument.defendant.email}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <FileText className="mr-2 h-5 w-5 text-gray-500" />
              문서 정보
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">문서 유형</dt>
                <dd>{getDocumentTypeDisplay(selectedDocument.documentType)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">생성일</dt>
                <dd>{formatDate(selectedDocument.createdAt)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">수정일</dt>
                <dd>{formatDate(selectedDocument.updatedAt)}</dd>
              </div>
              {selectedDocument.incidentDate && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">사건일</dt>
                  <dd>{formatDate(selectedDocument.incidentDate)}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="incident" className="bg-white rounded-lg shadow overflow-hidden">
        <TabsList className="bg-gray-100 border-b p-0">
          <TabsTrigger value="incident" className="py-3 px-6 rounded-none data-[state=active]:bg-white">
            <MapPin className="mr-2 h-4 w-4" />
            사건 정보
          </TabsTrigger>
          {selectedDocument.chatSummary && (
            <TabsTrigger value="chat" className="py-3 px-6 rounded-none data-[state=active]:bg-white">
              <FileText className="mr-2 h-4 w-4" />
              상담 요약
            </TabsTrigger>
          )}
          {selectedDocument.lawyerFeedback && (
            <TabsTrigger value="feedback" className="py-3 px-6 rounded-none data-[state=active]:bg-white">
              <FileText className="mr-2 h-4 w-4" />
              기존 피드백
            </TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="incident" className="p-6 space-y-6">
          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              사건 발생 위치
            </h4>
            <p className="text-gray-700 bg-gray-50 p-3 rounded border">
              {selectedDocument.incidentLocation}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">사건 상세 내용</h4>
            <p className="text-gray-700 bg-gray-50 p-3 rounded border whitespace-pre-line">
              {selectedDocument.incidentDetails}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">피해 내용</h4>
            <p className="text-gray-700 bg-gray-50 p-3 rounded border whitespace-pre-line">
              {selectedDocument.damages}
            </p>
          </div>
        </TabsContent>
        
        {selectedDocument.chatSummary && (
          <TabsContent value="chat" className="p-6">
            <div>
              <h4 className="font-medium mb-2">AI 상담 요약</h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded border whitespace-pre-line">
                {selectedDocument.chatSummary}
              </p>
            </div>
          </TabsContent>
        )}
        
        {selectedDocument.lawyerFeedback && (
          <TabsContent value="feedback" className="p-6">
            <div>
              <h4 className="font-medium mb-2">기존 변호사 피드백</h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded border whitespace-pre-line">
                {selectedDocument.lawyerFeedback}
              </p>
            </div>
          </TabsContent>
        )}
      </Tabs>
      
      {/* 검토 버튼 영역 */}
      <div className="mt-8 flex justify-center space-x-4">
        <Button 
          className={`${getActionButtonColor('approve')} text-white`}
          onClick={() => handleOpenDialog('approve')}
          disabled={selectedDocument.status === 'approved'}
        >
          <CheckCircle className="mr-2 h-5 w-5" />
          승인하기
        </Button>
        
        <Button 
          className={`${getActionButtonColor('request_revision')} text-white`} 
          onClick={() => handleOpenDialog('request_revision')}
          disabled={selectedDocument.status === 'approved'}
        >
          <AlertCircle className="mr-2 h-5 w-5" />
          수정 요청
        </Button>
        
        <Button 
          className={`${getActionButtonColor('reject')} text-white`}
          onClick={() => handleOpenDialog('reject')}
          disabled={selectedDocument.status === 'approved'}
        >
          <XCircle className="mr-2 h-5 w-5" />
          반려하기
        </Button>
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {actionType === 'approve' && '문서 승인'}
              {actionType === 'request_revision' && '수정 요청'}
              {actionType === 'reject' && '문서 반려'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="feedback">피드백 내용</Label>
              <Textarea 
                id="feedback" 
                value={feedback} 
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="의견을 작성해주세요"
                className="min-h-[120px]"
              />
            </div>
          </div>
          
          <DialogFooter className="sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDialogOpen(false)}
            >
              취소
            </Button>
            <Button
              type="button"
              className={getActionButtonColor(actionType)}
              onClick={handleReviewSubmit}
            >
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default DocumentDetailPage;
