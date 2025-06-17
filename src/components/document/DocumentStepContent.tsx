
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import DocumentTypeSelector from './DocumentTypeSelector';
import PersonalInformationForm from './PersonalInformationForm';
import IncidentDetailsForm from './IncidentDetailsForm';
import EvidenceUpload from './EvidenceUpload';
import DocumentPreview from './DocumentPreview';
import AIChatStep from './AIChatStep';
import ReviewStatusStep from './ReviewStatusStep';

interface DocumentStepContentProps {
  activeStep: string;
  formData: any;
  evidenceFiles: File[];
  reviewStatus: 'pending' | 'in_progress' | 'completed' | 'rejected';
  chatSummary: string;
  lawyerFeedback: string;
  chatMessages: any[];
  onTypeSelect: (type: string) => void;
  onPersonalInfoChange: (field: string, value: string, category: 'plaintiff' | 'defendant') => void;
  onIncidentDetailsChange: (field: string, value: any) => void;
  onEvidenceChange: (files: File[]) => void;
  onChatComplete: (messages: any[]) => void;
  onRequestReview: () => void;
  onRequestRevision: () => void;
}

const DocumentStepContent: React.FC<DocumentStepContentProps> = ({
  activeStep,
  formData,
  evidenceFiles,
  reviewStatus,
  chatSummary,
  lawyerFeedback,
  chatMessages,
  onTypeSelect,
  onPersonalInfoChange,
  onIncidentDetailsChange,
  onEvidenceChange,
  onChatComplete,
  onRequestReview,
  onRequestRevision
}) => {
  return (
    <Tabs value={activeStep} className="w-full">
      <TabsContent value="type" className="mt-6">
        <DocumentTypeSelector 
          selectedType={formData.documentType} 
          onSelect={onTypeSelect} 
        />
      </TabsContent>
      
      <TabsContent value="personal" className="mt-6">
        <PersonalInformationForm 
          formData={{ plaintiff: formData.plaintiff, defendant: formData.defendant }}
          onChange={onPersonalInfoChange}
        />
      </TabsContent>
      
      <TabsContent value="details" className="mt-6">
        <IncidentDetailsForm 
          formData={{
            incidentDate: formData.incidentDate,
            incidentLocation: formData.incidentLocation,
            incidentDetails: formData.incidentDetails,
            damages: formData.damages
          }}
          onChange={onIncidentDetailsChange}
        />
      </TabsContent>
      
      <TabsContent value="ai_chat" className="mt-6">
        <AIChatStep onComplete={onChatComplete} />
      </TabsContent>
      
      <TabsContent value="evidence" className="mt-6">
        <EvidenceUpload 
          evidenceFiles={evidenceFiles}
          onEvidenceChange={onEvidenceChange}
        />
      </TabsContent>
      
      <TabsContent value="review" className="mt-6">
        <ReviewStatusStep 
          onRequestReview={onRequestReview}
          onRequestRevision={onRequestRevision}
          chatSummary={chatSummary}
          lawyerFeedback={reviewStatus === 'completed' ? lawyerFeedback : undefined}
        />
      </TabsContent>
      
      <TabsContent value="preview" className="mt-6">
        <DocumentPreview formData={formData} />
      </TabsContent>
    </Tabs>
  );
};

export default DocumentStepContent;
