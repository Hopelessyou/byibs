
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatStepProps {
  onComplete: (chatHistory: Message[]) => void;
}

const AIChatStep: React.FC<AIChatStepProps> = ({ onComplete }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '안녕하세요. 고소장 작성을 위한 AI 비서입니다. 어떤 사건에 대해 고소장을 작성하고 싶으신가요? 사건의 내용을 최대한 상세히 알려주시면 도움을 드릴 수 있습니다.',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to latest messages
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Simulate AI response (in a real app, this would connect to an actual AI service)
    setTimeout(() => {
      let responseContent = '';
      
      // Simple rule-based responses to simulate conversation
      if (userMessage.content.includes('사기')) {
        responseContent = '사기 사건에 대한 고소장을 작성하시는군요. 피해 금액과 사기 수법, 증거가 있으신가요? 어떤 약속이 있었고 어떻게 기만당하셨는지 자세히 알려주시면 도움이 됩니다.';
      } else if (userMessage.content.includes('폭행') || userMessage.content.includes('상해')) {
        responseContent = '폭행 또는 상해 사건에 대한 고소장을 작성하시는군요. 사건이 발생한 날짜와 장소, 가해자와의 관계, 부상 정도와 진단서 유무에 대해 알려주시겠어요?';
      } else if (userMessage.content.includes('명예')) {
        responseContent = '명예훼손 사건에 대한 고소장을 작성하시는군요. 어떤 내용으로 명예가 훼손되었는지, 그 내용이 사실인지 허위인지, 그리고 어디서 어떻게 배포되었는지 자세히 알려주세요.';
      } else {
        responseContent = '더 자세한 정보가 필요합니다. 사건이 언제, 어디서 발생했는지, 가해자는 누구인지, 어떤 피해를 입으셨는지 등을 구체적으로 알려주세요.';
      }
      
      // If we have had 5+ messages, offer to complete the process
      if (messages.length >= 6) {
        responseContent += '\n\n지금까지 충분한 정보를 제공해 주셨습니다. 변호사에게 전달하여 검토를 요청하시겠습니까? "네"라고 입력하시면 다음 단계로 진행합니다.';
      }
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
      
      // If user has responded with "네" or "예" after several exchanges, complete the process
      if (userMessage.content.includes('네') || userMessage.content.includes('예')) {
        if (messages.length >= 4) {
          setTimeout(() => onComplete(messages), 1500);
        }
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[600px] border rounded-lg overflow-hidden bg-gray-50">
      <div className="p-4 bg-legal-primary text-white">
        <h2 className="text-lg font-semibold">AI 심층 조사</h2>
        <p className="text-sm">사건에 대한 정보를 최대한 상세히 알려주세요.</p>
      </div>
      
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-legal-primary text-white'
                    : 'bg-white border border-gray-200 text-gray-800'
                }`}
              >
                <p className="whitespace-pre-line">{message.content}</p>
                <div className={`text-xs mt-1 ${message.role === 'user' ? 'text-gray-200' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-white border border-gray-200">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                  <span className="text-gray-500 text-sm">AI가 응답을 작성 중입니다...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t bg-white">
        <div className="flex space-x-2">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="flex-grow"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || !inputValue.trim()}
            className="h-auto"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChatStep;
