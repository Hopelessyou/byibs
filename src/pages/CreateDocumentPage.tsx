
import React from 'react';
import Layout from '@/components/layout/Layout';
import DocumentStepNavigation from '@/components/document/DocumentStepNavigation';
import DocumentStepContent from '@/components/document/DocumentStepContent';
import DocumentNavigationButtons from '@/components/document/DocumentNavigationButtons';
import { useDocumentForm } from '@/hooks/useDocumentForm';
import CreateDocumentFormWrapper from '@/components/document/CreateDocumentFormWrapper';

const CreateDocumentPage = () => {
  const {
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
    handleBack,
    handleNext,
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
    canProceedFromCurrentStep
  } = useDocumentForm();

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <CreateDocumentFormWrapper>
            <div className="mb-8">
              <DocumentStepNavigation 
                steps={steps}
                activeStep={activeStep}
                onStepChange={setActiveStep}
                canAccessPreview={canAccessPreview}
                hasChatMessages={chatMessages.length > 0}
              />

              <DocumentStepContent
                activeStep={activeStep}
                formData={formData}
                evidenceFiles={evidenceFiles}
                reviewStatus={reviewStatus}
                chatSummary={chatSummary}
                lawyerFeedback={lawyerFeedback}
                chatMessages={chatMessages}
                onTypeSelect={handleTypeSelect}
                onPersonalInfoChange={handlePersonalInfoChange}
                onIncidentDetailsChange={handleIncidentDetailsChange}
                onEvidenceChange={handleEvidenceChange}
                onChatComplete={handleChatComplete}
                onRequestReview={handleRequestReview}
                onRequestRevision={handleRequestRevision}
              />
            </div>
            
            <DocumentNavigationButtons
              activeStep={activeStep}
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              canProceedFromCurrentStep={canProceedFromCurrentStep}
              onBack={handleBack}
              onNext={handleNext}
              onComplete={handleDocumentComplete}
              lastSavedAt={lastSavedAt}
            />
          </CreateDocumentFormWrapper>
        </div>
      </div>
    </Layout>
  );
};

export default CreateDocumentPage;
