
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function useDocumentForm() {
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState('type');
  const [formData, setFormData] = useState({
    documentType: '',
    plaintiff: {
      name: '',
      nationalId: '',
      address: '',
      phone: '',
      email: '',
    },
    defendant: {
      name: '',
      address: '',
      phone: '',
    },
    incidentDate: undefined as Date | undefined,
    incidentLocation: '',
    incidentDetails: '',
    damages: '',
  });
  
  const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]);
  const [reviewStatus, setReviewStatus] = useState<'pending' | 'in_progress' | 'completed' | 'rejected'>('pending');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [chatSummary, setChatSummary] = useState<string>('');
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  const steps = [
    { id: 'type', label: '사건 유형' },
    { id: 'personal', label: '인적사항' },
    { id: 'details', label: '사건 내용' },
    { id: 'ai_chat', label: 'AI 상담' },
    { id: 'evidence', label: '증거 자료' },
    { id: 'review', label: '변호사 작성' },
    { id: 'preview', label: '문서 미리보기' },
  ];
  
  // Load form data from localStorage on component mount
  useEffect(() => {
    const savedFormData = localStorage.getItem('documentFormData');
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        
        // Convert stored date string back to Date object if it exists
        if (parsedData.incidentDate) {
          parsedData.incidentDate = new Date(parsedData.incidentDate);
        }
        
        setFormData(parsedData);
        
        const savedStep = localStorage.getItem('documentActiveStep');
        if (savedStep) {
          setActiveStep(savedStep);
        }
        
        toast({
          title: "양식 복원됨",
          description: "이전에 작성하던 내용이 복원되었습니다.",
        });
      } catch (error) {
        console.error("Failed to parse saved form data:", error);
      }
    }
  }, [toast]);
  
  // Auto-save functionality
  const autoSaveData = useCallback(() => {
    try {
      // Save form data to localStorage
      localStorage.setItem('documentFormData', JSON.stringify(formData));
      localStorage.setItem('documentActiveStep', activeStep);
      setLastSavedAt(new Date());
      
      // Don't show toast for auto-save to avoid disrupting the user
      console.log("Auto-saved document data at", new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Failed to auto-save form data:", error);
    }
  }, [formData, activeStep]);
  
  // Set up auto-save interval (every 3 minutes)
  useEffect(() => {
    const autoSaveInterval = setInterval(autoSaveData, 3 * 60 * 1000); // 3 minutes
    
    // Clean up interval on component unmount
    return () => clearInterval(autoSaveInterval);
  }, [autoSaveData]);
  
  // Also save when user changes tabs/steps
  useEffect(() => {
    autoSaveData();
  }, [activeStep, autoSaveData]);
  
  const handleNext = () => {
    const currentIndex = steps.findIndex(step => step.id === activeStep);
    if (currentIndex < steps.length - 1) {
      setActiveStep(steps[currentIndex + 1].id);
    }
  };
  
  const handleBack = () => {
    const currentIndex = steps.findIndex(step => step.id === activeStep);
    if (currentIndex > 0) {
      setActiveStep(steps[currentIndex - 1].id);
    }
  };
  
  const handleTypeSelect = (type: string) => {
    console.log("Document type selected:", type);
    setFormData(prev => ({ ...prev, documentType: type }));
  };
  
  const handlePersonalInfoChange = (field: string, value: string, category: 'plaintiff' | 'defendant') => {
    console.log("Personal info changed:", category, field, value);
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };
  
  const handleIncidentDetailsChange = (field: string, value: any) => {
    console.log("Incident detail changed:", field, value);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleEvidenceChange = (files: File[]) => {
    setEvidenceFiles(files);
  };
  
  const handleChatComplete = (messages: Message[]) => {
    setChatMessages(messages);
    
    const userMessages = messages.filter(m => m.role === 'user').map(m => m.content);
    const summary = "AI 상담 요약:\n\n" + userMessages.join("\n\n");
    setChatSummary(summary);
    
    handleNext();
    
    toast({
      title: "AI 상담 완료",
      description: "AI 상담이 완료되었습니다. 다음 단계로 진행하여 고소장 정보를 입력해주세요.",
    });
  };
  
  const handleRequestReview = () => {
    setReviewStatus('in_progress');
    toast({
      title: "검수 요청 완료",
      description: "변호사 검수 요청이 접수되었습니다. 영업일 기준 1-2일 내에 검수가 완료됩니다.",
    });
    
    setTimeout(() => {
      setReviewStatus('completed');
      toast({
        title: "변호사 검수 완료",
        description: "변호사 검수가 완료되었습니다. '문서 미리보기' 단계로 이동하여 확인하세요.",
      });
    }, 5000);
  };
  
  const handleRequestRevision = () => {
    setReviewStatus('in_progress');
    toast({
      title: "재검수 요청 완료",
      description: "변호사 재검수 요청이 접수되었습니다. 영업일 기준 1-2일 내에 검수가 완료됩니다.",
    });
    
    setTimeout(() => {
      setReviewStatus('completed');
      toast({
        title: "변호사 재검수 완료",
        description: "변호사 재검수가 완료되었습니다. '문서 미리보기' 단계로 이동하여 확인하세요.",
      });
    }, 5000);
  };

  const handleDocumentComplete = () => {
    toast({
      title: "고소장 작성 완료",
      description: "고소장 작성이 완료되었습니다. 원하시는 방식으로 제출해 주세요.",
    });
    // Clear local storage after completion
    localStorage.removeItem('documentFormData');
    localStorage.removeItem('documentActiveStep');
  };

  const canAccessPreview = reviewStatus === 'completed';
  const lawyerFeedback = "고소장 내용을 검토한 결과, 법적으로 문제없이 작성되었습니다. 증거가 충분하여 고소 성공 가능성이 높습니다.";
  const isFirstStep = activeStep === steps[0].id;
  const isLastStep = activeStep === steps[steps.length - 1].id;
  
  const canProceedFromCurrentStep = () => {
    if (activeStep === 'review') return reviewStatus === 'completed';
    if (activeStep === 'ai_chat') return chatMessages.length > 0;
    if (activeStep === 'type') return formData.documentType !== '';
    return true;
  };
  
  return {
    activeStep,
    setActiveStep,
    formData,
    evidenceFiles,
    reviewStatus,
    chatMessages,
    chatSummary,
    lawyerFeedback,
    lastSavedAt,
    steps,
    handleNext,
    handleBack,
    handleTypeSelect,
    handlePersonalInfoChange,
    handleIncidentDetailsChange,
    handleEvidenceChange,
    handleChatComplete,
    handleRequestReview,
    handleRequestRevision,
    handleDocumentComplete,
    canAccessPreview,
    isFirstStep,
    isLastStep,
    canProceedFromCurrentStep: canProceedFromCurrentStep()
  };
}
