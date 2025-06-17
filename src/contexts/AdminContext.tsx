
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentData } from '@/types/document';
import { api } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface AdminContextType {
  isLoading: boolean;
  documents: DocumentData[];
  selectedDocument: DocumentData | null;
  loadDocuments: () => Promise<void>;
  selectDocument: (id: string) => Promise<void>;
  reviewDocument: (id: string, action: 'approve' | 'request_revision' | 'reject', feedback: string) => Promise<boolean>;
  isAdmin: boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<DocumentData | null>(null);
  
  // Check if admin is logged in
  const adminToken = localStorage.getItem('adminToken');
  const isAdmin = !!adminToken;
  
  const loadDocuments = async () => {
    if (!isAdmin) {
      navigate('/admin/login');
      return;
    }
    
    setIsLoading(true);
    try {
      const docs = await api.documents.getAll();
      // Filter to only show documents that need review
      const filteredDocs = docs.filter(doc => 
        doc.status === 'pending_review' || 
        doc.status === 'in_review' ||
        doc.status === 'needs_revision' ||
        doc.status === 'approved'
      );
      setDocuments(filteredDocs);
    } catch (err) {
      toast({
        title: "오류",
        description: "문서 목록을 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const selectDocument = async (id: string) => {
    setIsLoading(true);
    try {
      const doc = await api.documents.get(id);
      setSelectedDocument(doc);
    } catch (err) {
      toast({
        title: "오류",
        description: "문서를 불러오는데 실패했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const reviewDocument = async (id: string, action: 'approve' | 'request_revision' | 'reject', feedback: string) => {
    setIsLoading(true);
    try {
      await api.documents.simulateLawyerReview(id, action, feedback);
      toast({
        title: "검토 완료",
        description: action === 'approve' ? "문서가 승인되었습니다." : 
                     action === 'request_revision' ? "추가 정보 요청이 완료되었습니다." : 
                     "문서가 거부되었습니다.",
      });
      
      // Refresh the document list
      loadDocuments();
      return true;
    } catch (err) {
      toast({
        title: "오류",
        description: "문서 검토 처리 중 오류가 발생했습니다.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminId');
    navigate('/admin/login');
  };

  return (
    <AdminContext.Provider value={{
      isLoading,
      documents,
      selectedDocument,
      loadDocuments,
      selectDocument,
      reviewDocument,
      isAdmin,
      logout
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
