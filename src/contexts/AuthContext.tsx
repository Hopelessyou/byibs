
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userId: string | null;
  login: (token: string, userId: string, rememberMe: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    const storedUserId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
    
    if (token && storedUserId) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
    }
  }, []);
  
  const login = (token: string, userId: string, rememberMe: boolean) => {
    if (rememberMe) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userId);
    } else {
      sessionStorage.setItem('authToken', token);
      sessionStorage.setItem('userId', userId);
    }
    setIsAuthenticated(true);
    setUserId(userId);
  };
  
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
    setIsAuthenticated(false);
    setUserId(null);
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
