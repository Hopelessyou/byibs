
import { DocumentData, DocumentStatus } from '@/types/document';

// Mock database for documents
let documents: DocumentData[] = [];
let nextId = 1;

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Document operations
  documents: {
    // Create a new document
    create: async (document: Omit<DocumentData, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<DocumentData> => {
      await delay(800); // Simulate network delay
      
      const now = new Date();
      const newDoc: DocumentData = {
        ...document,
        id: String(nextId++),
        createdAt: now,
        updatedAt: now,
        status: 'draft',
      };
      
      documents.push(newDoc);
      return newDoc;
    },
    
    // Update an existing document
    update: async (id: string, updates: Partial<DocumentData>): Promise<DocumentData> => {
      await delay(600);
      
      const index = documents.findIndex(doc => doc.id === id);
      if (index === -1) {
        throw new Error('Document not found');
      }
      
      const updatedDoc = {
        ...documents[index],
        ...updates,
        updatedAt: new Date(),
      };
      
      documents[index] = updatedDoc;
      return updatedDoc;
    },
    
    // Submit document for review
    submitForReview: async (id: string): Promise<DocumentData> => {
      await delay(700);
      
      const index = documents.findIndex(doc => doc.id === id);
      if (index === -1) {
        throw new Error('Document not found');
      }
      
      const updatedDoc = {
        ...documents[index],
        status: 'pending_review' as DocumentStatus,
        updatedAt: new Date(),
      };
      
      documents[index] = updatedDoc;
      
      // Simulate lawyer picking up the document after 2 seconds
      setTimeout(() => {
        if (documents[index] && documents[index].status === 'pending_review') {
          documents[index] = {
            ...documents[index],
            status: 'in_review' as DocumentStatus,
            updatedAt: new Date(),
          };
        }
      }, 2000);
      
      return updatedDoc;
    },
    
    // Get a document by ID
    get: async (id: string): Promise<DocumentData> => {
      await delay(500);
      
      const document = documents.find(doc => doc.id === id);
      if (!document) {
        throw new Error('Document not found');
      }
      
      return document;
    },
    
    // Get all documents for a user
    getAll: async (userId?: string): Promise<DocumentData[]> => {
      await delay(700);
      
      if (!userId) {
        return [...documents];
      }
      
      return documents.filter(doc => doc.userId === userId);
    },
    
    // Upload evidence files
    uploadEvidence: async (id: string, files: File[]): Promise<string[]> => {
      await delay(1000);
      
      // In a real app, we would upload files to a server/storage
      // For now, just return file names
      const fileUrls = files.map(file => URL.createObjectURL(file));
      
      const index = documents.findIndex(doc => doc.id === id);
      if (index !== -1) {
        documents[index] = {
          ...documents[index],
          evidenceFiles: [...(documents[index].evidenceFiles || []), ...fileUrls],
          updatedAt: new Date(),
        };
      }
      
      return fileUrls;
    },
    
    // Mock lawyer review process
    // In reality, this would be an admin panel for lawyers
    simulateLawyerReview: async (
      id: string, 
      action: 'approve' | 'request_revision' | 'reject', 
      feedback?: string
    ): Promise<DocumentData> => {
      await delay(1500);
      
      const index = documents.findIndex(doc => doc.id === id);
      if (index === -1) {
        throw new Error('Document not found');
      }
      
      let status: DocumentStatus;
      
      switch (action) {
        case 'approve':
          status = 'approved';
          break;
        case 'request_revision':
          status = 'needs_revision';
          break;
        case 'reject':
          status = 'rejected';
          break;
        default:
          throw new Error('Invalid action');
      }
      
      const updatedDoc = {
        ...documents[index],
        status,
        lawyerFeedback: feedback,
        updatedAt: new Date(),
      };
      
      documents[index] = updatedDoc;
      return updatedDoc;
    }
  },

  // User related operations (minimal implementation)
  users: {
    // Mock authentication (in a real app, this would involve proper auth)
    login: async (email: string, password: string): Promise<{userId: string, token: string}> => {
      await delay(800);
      
      // This is just a simulation - in a real app, validate credentials
      if (email && password) {
        return {
          userId: 'user123',
          token: 'mock-token-xyz'
        };
      }
      
      throw new Error('Invalid credentials');
    },
    
    // Mock registration
    register: async (email: string, password: string, name: string): Promise<{userId: string, token: string}> => {
      await delay(1000);
      
      // Simulate user creation - in a real app, store user data securely
      if (email && password && name) {
        return {
          userId: 'user' + Math.floor(Math.random() * 1000),
          token: 'mock-token-' + Math.random().toString(36).substring(2)
        };
      }
      
      throw new Error('Invalid user data');
    }
  }
};
