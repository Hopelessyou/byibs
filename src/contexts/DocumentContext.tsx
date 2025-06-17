
import React, { createContext, useContext, useState, useEffect } from 'react';
import { DocumentData } from '@/types/document';
import { api } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface DocumentContextType {
  currentDocument: DocumentData | null;
  isLoading: boolean;
  error: string | null;
  createDocument: (docData: Omit<DocumentData, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Promise<DocumentData>;
  updateDocument: (updates: Partial<DocumentData>) => Promise<DocumentData | null>;
  submitForReview: () => Promise<DocumentData | null>;
  uploadEvidence: (files: File[]) => Promise<string[]>;
  requestRevision: () => Promise<DocumentData | null>;
  documentStatus: {
    canPreview: boolean;
    needsRevision: boolean;
    isApproved: boolean;
    isInReview: boolean;
    isPending: boolean;
  };
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { toast } = useToast();
  const [currentDocument, setCurrentDocument] = useState<DocumentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate document status helper properties
  const documentStatus = {
    canPreview: currentDocument?.status === 'approved',
    needsRevision: currentDocument?.status === 'needs_revision',
    isApproved: currentDocument?.status === 'approved',
    isInReview: currentDocument?.status === 'in_review' || currentDocument?.status === 'pending_review',
    isPending: !currentDocument || currentDocument.status === 'draft',
  };

  // Create a new document
  const createDocument = async (docData: Omit<DocumentData, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newDocument = await api.documents.create({
        ...docData,
        // Add a default user ID (in a real app, get from auth context)
        userId: 'user123',
      });
      
      setCurrentDocument(newDocument);
      return newDocument;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '문서 생성 중 오류가 발생했습니다';
      setError(errorMessage);
      toast({
        title: "오류",
        description: errorMessage,
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update the current document
  const updateDocument = async (updates: Partial<DocumentData>) => {
    if (!currentDocument?.id) {
      toast({
        title: "오류",
        description: "문서가 아직 생성되지 않았습니다",
        variant: "destructive",
      });
      return null;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedDocument = await api.documents.update(currentDocument.id, updates);
      setCurrentDocument(updatedDocument);
      return updatedDocument;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '문서 업데이트 중 오류가 발생했습니다';
      setError(errorMessage);
      toast({
        title: "오류",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Submit document for lawyer review
  const submitForReview = async () => {
    if (!currentDocument?.id) {
      toast({
        title: "오류",
        description: "문서가 아직 생성되지 않았습니다",
        variant: "destructive",
      });
      return null;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedDocument = await api.documents.submitForReview(currentDocument.id);
      setCurrentDocument(updatedDocument);
      
      toast({
        title: "검수 요청 완료",
        description: "변호사 검수 요청이 접수되었습니다. 영업일 기준 1-2일 내에 검수가 완료됩니다.",
      });
      
      // For demo only: simulate lawyer review process
      simulateLawyerProcess(currentDocument.id);
      
      return updatedDocument;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '검수 요청 중 오류가 발생했습니다';
      setError(errorMessage);
      toast({
        title: "오류",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Upload evidence files
  const uploadEvidence = async (files: File[]) => {
    if (!currentDocument?.id) {
      toast({
        title: "오류",
        description: "문서가 아직 생성되지 않았습니다",
        variant: "destructive",
      });
      return [];
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const fileUrls = await api.documents.uploadEvidence(currentDocument.id, files);
      // Update the current document with new evidence files
      const updatedDoc = await api.documents.get(currentDocument.id);
      setCurrentDocument(updatedDoc);
      return fileUrls;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '증거 업로드 중 오류가 발생했습니다';
      setError(errorMessage);
      toast({
        title: "오류",
        description: errorMessage,
        variant: "destructive",
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Request revision after lawyer feedback
  const requestRevision = async () => {
    if (!currentDocument?.id) {
      toast({
        title: "오류",
        description: "문서가 아직 생성되지 않았습니다",
        variant: "destructive",
      });
      return null;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Update status back to in_review
      const updatedDocument = await api.documents.update(currentDocument.id, {
        status: 'in_review'
      });
      
      setCurrentDocument(updatedDocument);
      
      toast({
        title: "재검수 요청 완료",
        description: "변호사 재검수 요청이 접수되었습니다. 영업일 기준 1-2일 내에 검수가 완료됩니다.",
      });
      
      // For demo only: simulate lawyer review process again
      simulateLawyerProcess(currentDocument.id, true);
      
      return updatedDocument;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '재검수 요청 중 오류가 발생했습니다';
      setError(errorMessage);
      toast({
        title: "오류",
        description: errorMessage,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // DEMO ONLY: Simulate lawyer review process
  const simulateLawyerProcess = async (docId: string, isRevision = false) => {
    // Simulate lawyer picking up the document
    setTimeout(async () => {
      try {
        // Randomly decide outcome for demo purposes
        const random = Math.random();
        
        if (isRevision || random > 0.3) {
          // Approve document
          const updatedDoc = await api.documents.simulateLawyerReview(
            docId, 
            'approve',
            '법적으로 문제가 없습니다. 고소장이 승인되었습니다.'
          );
          
          setCurrentDocument(updatedDoc);
          
          toast({
            title: "변호사 검수 완료",
            description: "변호사 검수가 완료되었습니다. 이제 문서를 미리보기하고 다운로드할 수 있습니다.",
          });
        } else {
          // Request revision
          const updatedDoc = await api.documents.simulateLawyerReview(
            docId, 
            'request_revision',
            '피해 사실에 대한 증거가 부족합니다. 추가 증거나 상세한 설명이 필요합니다.'
          );
          
          setCurrentDocument(updatedDoc);
          
          toast({
            title: "추가 정보 필요",
            description: "변호사 검토 결과, 추가 정보가 필요합니다. 피드백을 확인해 주세요.",
            variant: "destructive",
          });
        }
      } catch (err) {
        console.error('Simulation error:', err);
      }
    }, 5000); // Simulate 5s processing time
  };

  return (
    <DocumentContext.Provider value={{
      currentDocument,
      isLoading,
      error,
      createDocument,
      updateDocument,
      submitForReview,
      uploadEvidence,
      requestRevision,
      documentStatus
    }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
};
