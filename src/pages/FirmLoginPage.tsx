
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Building2, ShieldCheck, LockKeyhole, User, FileText, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const FirmLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // For demo purposes, use firm@example.com as a law firm account
      if (email === 'firm@example.com' && password === 'password123') {
        // In a real app, we would call an API
        const mockResponse = { token: 'firm-demo-token', userId: 'firm-123', role: 'firm' };
        
        // Login action
        login(mockResponse.token, mockResponse.userId, rememberMe);
        
        // Save the firm role
        localStorage.setItem('userRole', 'firm');
        
        toast.success('로펌 계정으로 로그인되었습니다.');
        navigate('/firm/dashboard');
      } else {
        toast.error('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('로그인 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Building2 className="h-16 w-16 text-legal-primary" />
            </div>
            <h1 className="text-2xl font-bold text-legal-primary">로펌 포털</h1>
            <p className="mt-2 text-gray-600">로펌 관리자 계정으로 로그인하세요</p>
          </div>
          
          <Card className="shadow-elegant">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-center text-navy-700">로펌 관리자 접속</CardTitle>
              <CardDescription className="text-center">
                계정으로 로그인하여 사건 및 변호사를 관리하세요
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">이메일</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="firm@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password" className="text-gray-700">비밀번호</Label>
                      <Link to="/forgot-password" className="text-xs text-legal-accent hover:underline">
                        비밀번호를 잊으셨나요?
                      </Link>
                    </div>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10"
                        required
                        disabled={isLoading}
                      />
                      <button 
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
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
                      <Label htmlFor="remember" className="text-sm font-normal text-gray-600">로그인 상태 유지</Label>
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
              </form>
              
              <div className="mt-5 flex items-center justify-center space-x-2 text-sm text-gray-500">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                <span>법률 정보 보호를 위한 보안 로그인</span>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 pt-2">
              <div className="pt-2 border-t border-gray-200 w-full">
                <div className="text-center text-sm text-gray-600">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Building2 className="h-4 w-4 text-legal-accent" />
                    <span>데모 계정: firm@example.com / password123</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 mt-2">
                    <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
                      <FileText className="h-4 w-4 mb-1" />
                      <span>사건 관리</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
                      <User className="h-4 w-4 mb-1" />
                      <span>변호사 관리</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-gray-50 rounded">
                      <Scale className="h-4 w-4 mb-1" />
                      <span>법적 분석</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              일반 사용자이신가요? <Link to="/login" className="text-legal-accent font-medium hover:underline">여기서 로그인</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FirmLoginPage;
