
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import { UserIcon } from 'lucide-react';
import { api } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const RegisterForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      toast.error('모든 필수 항목을 입력해주세요.');
      return;
    }

    if (!termsAccepted) {
      toast.error('서비스 이용을 위해 이용약관 및 개인정보처리방침에 동의해주세요.');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (password.length < 8) {
      toast.error('비밀번호는 최소 8자 이상이어야 합니다.');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // API call to register
      const response = await api.users.register(email, password, `${firstName} ${lastName}`);
      
      // Log user in after successful registration
      login(response.token, response.userId, false);
      
      toast.success('회원가입이 완료되었습니다!');
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      toast.error('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const useTestData = () => {
    setFirstName('홍');
    setLastName('길동');
    setEmail('test@example.com');
    setPhone('010-1234-5678');
    setPassword('password123');
    setConfirmPassword('password123');
    setTermsAccepted(true);
  };

  return (
    <div className="max-w-md w-full mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">회원가입</h1>
        <p className="text-gray-500">고소장닷컴 서비스를 이용하기 위한 계정을 만드세요</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">이름</Label>
            <Input 
              id="firstName" 
              placeholder="홍" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">성</Label>
            <Input 
              id="lastName" 
              placeholder="길동" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="example@email.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">전화번호</Label>
          <Input 
            id="phone" 
            placeholder="010-1234-5678" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">비밀번호</Label>
          <Input 
            id="password" 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
          <p className="text-xs text-gray-500">
            비밀번호는 최소 8자 이상이어야 하며, 영문, 숫자, 특수문자를 포함해야 합니다.
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">비밀번호 확인</Label>
          <Input 
            id="confirmPassword" 
            type="password" 
            placeholder="••••••••" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="terms" 
              className="mt-1"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked === true)}
              disabled={isLoading}
              required
            />
            <Label htmlFor="terms" className="text-sm font-normal">
              <span>
                <a href="/terms" className="text-legal-accent hover:underline">이용약관</a> 및 <a href="/privacy" className="text-legal-accent hover:underline">개인정보처리방침</a>에 동의합니다.
              </span>
            </Label>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="marketing" 
              className="mt-1"
              checked={marketingConsent}
              onCheckedChange={(checked) => setMarketingConsent(checked === true)}
              disabled={isLoading}
            />
            <Label htmlFor="marketing" className="text-sm font-normal">
              마케팅 정보 수신에 동의합니다. (선택)
            </Label>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-legal-primary hover:bg-legal-secondary"
          disabled={isLoading}
        >
          {isLoading ? '처리 중...' : '회원가입'}
        </Button>

        <Button 
          type="button" 
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={useTestData}
          disabled={isLoading}
        >
          <UserIcon className="h-4 w-4" />
          테스트 데이터 입력
        </Button>
        
        <div className="text-center text-sm">
          이미 계정이 있으신가요?{" "}
          <Link to="/login" className="text-legal-accent hover:underline">
            로그인
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
