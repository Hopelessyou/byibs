
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import { api } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, KeyIcon, MailIcon, ShieldIcon, UserIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    
    try {
      setIsLoading(true);
      // Call the login API
      const response = await api.users.login(email, password);
      
      // Use the auth context to handle login
      login(response.token, response.userId, rememberMe);
      
      // Show success message
      toast.success('로그인 성공! 환영합니다.');
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      toast.error('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const useTestAccount = () => {
    setEmail('test@example.com');
    setPassword('password123');
    setRememberMe(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">이메일</Label>
          <div className="relative">
            <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              id="email" 
              type="email" 
              placeholder="example@email.com" 
              className="pl-10" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password" className="text-sm font-medium">비밀번호</Label>
            <Link to="/forgot-password" className="text-xs text-legal-accent hover:underline">
              비밀번호를 잊으셨나요?
            </Link>
          </div>
          <div className="relative">
            <KeyIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••" 
              className="pl-10 pr-10" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
            <button 
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remember" 
              checked={rememberMe} 
              onCheckedChange={(checked) => setRememberMe(checked === true)}
            />
            <Label htmlFor="remember" className="text-xs font-normal">로그인 상태 유지</Label>
          </div>
          
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <ShieldIcon className="h-3 w-3" />
            <span>보안 로그인</span>
          </div>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-legal-primary hover:bg-legal-secondary"
        disabled={isLoading}
      >
        {isLoading ? '처리 중...' : '로그인'}
      </Button>

      <Button 
        type="button" 
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={useTestAccount}
        disabled={isLoading}
      >
        <UserIcon className="h-4 w-4" />
        테스트 계정으로 로그인
      </Button>
      
      <div className="text-center text-sm">
        계정이 없으신가요?{" "}
        <Link to="/register" className="text-legal-accent font-medium hover:underline">
          회원가입
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
