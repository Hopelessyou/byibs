import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, UserRound, UserCog, CheckCircle, PhoneCall, Scale, Building2, FileText, ShoppingCart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (  
    <header className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group" aria-label="소장닷컴 홈페이지로 이동">
          <Shield className={`h-${isMobile ? '6' : '8'} w-${isMobile ? '6' : '8'} text-legal-accent group-hover:scale-110 transition-transform duration-300`} />
          <div className="font-serif flex items-center">
            <span className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-legal-primary`}>IBS</span>
            <span className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold ml-1 text-legal-accent`}>법률사무소</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center ml-4 bg-green-50 rounded-full px-3 py-1">
          <CheckCircle className="h-4 w-4 text-green-600 mr-1" aria-hidden="true" />
          <span className="text-xs text-green-700 font-medium">보안 인증됨</span>
        </div>
        
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={cn(
                navigationMenuTriggerStyle(),
                isActive('/cases') ? "bg-blue-50 text-legal-accent font-bold" : ""
              )}>
                <Link to="/cases">소장 의뢰하기</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={cn(
                navigationMenuTriggerStyle(),
                isActive('/how-it-works') ? "bg-blue-50 text-legal-accent font-bold" : ""
              )}>
                <Link to="/how-it-works">단계별 의뢰하기</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={cn(
                navigationMenuTriggerStyle(),
                isActive('/pricing') ? "bg-blue-50 text-legal-accent font-bold" : ""
              )}>
                <Link to="/pricing">요금제</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={cn(
                navigationMenuTriggerStyle(),
                isActive('/legal-news') ? "bg-blue-50 text-legal-accent font-bold" : ""
              )}>
                <Link to="/legal-news">법률 정보</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a href="tel:0606041000" className="hidden md:flex items-center px-3 py-2 bg-rose-50 border border-rose-200 rounded-lg text-rose-600 hover:bg-rose-100 transition-colors animate-pulse hover:animate-none group">
                  <PhoneCall className="h-4 w-4 mr-2" aria-hidden="true" />
                  <div>
                    <span className="font-bold">060-604-1000</span>
                    <span className="text-xs block -mt-1">유료 법률 상담</span>
                  </div>
                  <span className="hidden group-hover:inline ml-1 text-xs bg-rose-200 text-rose-800 px-1 rounded">→ 전화하기</span>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                분당 3,000원의 유료 법률 상담 서비스입니다
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {/* Cart Link */}
          <Link to="/cart" className="relative">
            <Button variant="outline" size="icon" className="border-legal-primary text-legal-primary hover:bg-legal-primary hover:text-white">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
              <span className="sr-only">장바구니</span>
            </Button>
          </Link>
          
          {/* Login Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-legal-primary text-legal-primary hover:bg-legal-primary hover:text-white">
                <UserRound className="mr-2 h-4 w-4" aria-hidden="true" />
                로그인
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white" align="end">
              <DropdownMenuLabel>계정 유형</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/login" className="cursor-pointer w-full">
                  <UserRound className="mr-2 h-4 w-4" />
                  <span>일반 회원 로그인</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/lawyer/login" className="cursor-pointer w-full">
                  <Scale className="mr-2 h-4 w-4" />
                  <span>변호사 로그인</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/firm/login" className="cursor-pointer w-full">
                  <Building2 className="mr-2 h-4 w-4" />
                  <span>로펌 로그인</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/admin/login" className="cursor-pointer w-full">
                  <UserCog className="mr-2 h-4 w-4" />
                  <span>관리자 로그인</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link to="/register" className="hidden md:block">
            <Button className="bg-legal-primary hover:bg-legal-secondary text-white shadow-elegant hover:shadow-premium transition-all btn-ripple">
              회원가입
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
