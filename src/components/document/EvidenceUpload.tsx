
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadCloud, File, X, Image, FileText } from 'lucide-react';

interface EvidenceUploadProps {
  evidenceFiles: File[];
  onEvidenceChange: (files: File[]) => void;
}

const EvidenceUpload: React.FC<EvidenceUploadProps> = ({
  evidenceFiles,
  onEvidenceChange
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      onEvidenceChange([...evidenceFiles, ...newFiles]);
    }
  };
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      onEvidenceChange([...evidenceFiles, ...newFiles]);
    }
  };
  
  const removeFile = (index: number) => {
    const updatedFiles = [...evidenceFiles];
    updatedFiles.splice(index, 1);
    onEvidenceChange(updatedFiles);
  };
  
  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="h-5 w-5 text-blue-500" />;
    } else if (file.type === 'application/pdf') {
      return <FileText className="h-5 w-5 text-red-500" />;
    } else {
      return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-legal-primary mb-2">증거자료 업로드</h2>
        <p className="text-gray-600 mb-6">
          증거자료가 있는 경우 업로드하세요. 이메일, 문자메시지, 사진, 영상, 계약서 등 사건과 관련된 증거를 첨부할 수 있습니다.
        </p>
      </div>
      
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          dragActive ? 'border-legal-accent bg-blue-50' : 'border-gray-300 hover:border-legal-accent'
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <Input 
          ref={fileInputRef}
          type="file" 
          multiple 
          className="hidden" 
          onChange={handleFileChange}
        />
        
        <UploadCloud className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600 mb-2">
          파일을 여기에 드래그하거나 클릭하여 업로드하세요
        </p>
        <p className="text-gray-500 text-sm">
          지원 형식: JPG, PNG, PDF, DOCX, XLSX, MP4 (최대 50MB)
        </p>
      </div>
      
      {evidenceFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">업로드된 증거자료 ({evidenceFiles.length})</h3>
          <div className="space-y-2">
            {evidenceFiles.map((file, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 bg-gray-50 rounded border"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(file)}
                  <div>
                    <p className="font-medium truncate max-w-xs">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                >
                  <X className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EvidenceUpload;
