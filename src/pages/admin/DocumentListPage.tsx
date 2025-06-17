
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';
import { DocumentType } from '@/types/document';

const DocumentListPage = () => {
  const { isAdmin, documents, loadDocuments, isLoading } = useAdmin();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAdmin) {
      loadDocuments();
    } else {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);
  
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
  
  const handleViewDocument = (id: string) => {
    navigate(`/admin/documents/${id}`);
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

  return (
    <AdminLayout title="문서 목록">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <p>문서를 불러오는 중입니다...</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500">검토할 문서가 없습니다.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>문서 유형</TableHead>
                <TableHead>원고 이름</TableHead>
                <TableHead>피고 이름</TableHead>
                <TableHead>생성일</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.id}</TableCell>
                  <TableCell>{getDocumentTypeDisplay(doc.documentType)}</TableCell>
                  <TableCell>{doc.plaintiff?.name || '-'}</TableCell>
                  <TableCell>{doc.defendant?.name || '-'}</TableCell>
                  <TableCell>{formatDate(doc.createdAt)}</TableCell>
                  <TableCell>{getStatusBadge(doc.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDocument(doc.id as string)}
                    >
                      검토하기
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </AdminLayout>
  );
};

export default DocumentListPage;
