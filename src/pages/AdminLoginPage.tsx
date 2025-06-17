
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/services/api';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // For demo purposes we'll use a hardcoded admin check
      // In a real app, this would be a separate API endpoint
      const response = await api.users.login(email, password);
      
      // Check if user is an admin (in this demo, we'll consider admin@example.com as admin)
      if (email === 'admin@example.com') {
        localStorage.setItem('adminToken', response.token);
        localStorage.setItem('adminId', response.userId);
        toast({
          title: "로그인 성공",
          description: "관리자 페이지로 이동합니다.",
        });
        navigate('/admin/dashboard');
      } else {
        toast({
          title: "권한 오류",
          description: "관리자 계정이 아닙니다.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "로그인 실패",
        description: "이메일 또는 비밀번호가 올바르지 않습니다.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">관리자 로그인</h1>
            <p className="text-gray-500">변호사 계정으로 로그인하세요</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                required
              />
              <p className="text-xs text-gray-500">
                데모 계정: admin@example.com / password123
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-legal-primary hover:bg-legal-secondary"
              disabled={isLoading}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLoginPage;
