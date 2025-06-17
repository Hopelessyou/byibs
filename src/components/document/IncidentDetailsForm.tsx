
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface IncidentDetailsFormProps {
  formData: {
    incidentDate: Date | undefined;
    incidentLocation: string;
    incidentDetails: string;
    damages: string;
  };
  onChange: (field: string, value: any) => void;
}

const IncidentDetailsForm: React.FC<IncidentDetailsFormProps> = ({
  formData,
  onChange
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-legal-primary mb-4">사건 내용</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="incident-date">사건 발생일 *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal ${
                  formData.incidentDate ? 'text-foreground' : 'text-muted-foreground'
                }`}
                type="button"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.incidentDate ? (
                  format(formData.incidentDate, 'PPP', { locale: ko })
                ) : (
                  '날짜를 선택하세요'
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.incidentDate}
                onSelect={(date) => onChange('incidentDate', date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="incident-location">사건 발생 장소 *</Label>
          <Input
            id="incident-location"
            value={formData.incidentLocation}
            onChange={(e) => onChange('incidentLocation', e.target.value)}
            placeholder="예: 서울특별시 강남구 OO빌딩 앞"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="incident-details">사건 경위 (상세히 작성) *</Label>
        <Textarea
          id="incident-details"
          value={formData.incidentDetails}
          onChange={(e) => onChange('incidentDetails', e.target.value)}
          placeholder="사건이 발생한 경위, 피고소인의 행위, 정황 등을 시간 순서대로 상세히 기술하세요."
          className="min-h-[200px]"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="damages">피해 내용 *</Label>
        <Textarea
          id="damages"
          value={formData.damages}
          onChange={(e) => onChange('damages', e.target.value)}
          placeholder="금전적, 정신적, 신체적 피해 등을 구체적으로 기술하세요."
          className="min-h-[150px]"
        />
      </div>
    </div>
  );
};

export default IncidentDetailsForm;
