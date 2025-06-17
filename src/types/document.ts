
export type DocumentStatus = 'draft' | 'pending_review' | 'in_review' | 'needs_revision' | 'approved' | 'rejected';

export type DocumentType = 
  // Criminal types
  | 'traffic' 
  | 'voice_phishing'
  | 'sexual_crime'
  | 'fraud'
  | 'assault'
  | 'defamation'
  | 'cybercrime'
  | 'stalking'
  | 'juvenile'
  | 'economic_crime'
  | 'intellectual_crime'
  | 'other_criminal'
  // Civil types
  | 'loan'
  | 'contract'
  | 'real_estate'
  | 'family'
  | 'employment'
  | 'corporate'
  | 'medical'
  | 'administrative'
  | 'ip_it'
  | 'finance'
  | 'compensation'
  | 'other_civil'
  // Legacy types (for backward compatibility)
  | 'negligence'
  | 'contract_breach'
  | 'other'
  | 'etc';

export interface Person {
  name: string;
  nationalId?: string;
  address: string;
  phone: string;
  email?: string;
}

export interface DocumentData {
  id?: string;
  userId?: string;
  documentType: DocumentType;
  plaintiff: Person;
  defendant: Person;
  incidentDate?: Date;
  incidentLocation: string;
  incidentDetails: string;
  damages: string;
  chatSummary?: string;
  status: DocumentStatus;
  createdAt?: Date;
  updatedAt?: Date;
  lawyerFeedback?: string;
  evidenceFiles?: string[];
}
