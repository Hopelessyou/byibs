import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Phone, Mail, MapPin, CheckCircle, Award, Lock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-legal-primary text-white">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6" />
              <span className="font-serif text-xl font-bold">IBS</span>
              <span className="text-xl font-bold text-legal-accent">법률사무소</span>
            </div>
            <p className="text-sm text-gray-300">
              소장 작성 서비스로 시간과 비용, 정신적 스트레스를 줄이세요.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="hover:text-legal-accent transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-legal-accent transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">서비스</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors font-medium text-base">이용방법</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors font-medium text-base">요금제</Link>
              </li>
              <li>
                <Link to="/cases" className="hover:text-white transition-colors font-medium text-base">사건유형</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors font-medium text-base">자주 묻는 질문</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">법적 정보</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/terms" className="hover:text-white transition-colors font-medium text-base">이용약관</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors font-medium text-base">개인정보처리방침</Link>
              </li>
              <li>
                <Link to="/legal-notice" className="hover:text-white transition-colors font-medium text-base">법적 고지</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-serif font-semibold mb-4">연락처</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center hover:text-white transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                <span className="font-medium">02-598-5818</span>
              </li>
              <li className="flex items-center hover:text-white transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                <span className="font-medium">info@ibslaw.co.kr</span>
              </li>
              <li className="flex items-center hover:text-white transition-colors">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="font-medium">서울 서초구 서초대로 272 IBS 빌딩 3층 Info desk</span>
              </li>
              {/* Removed the phone call feature item */}
            </ul>
          </div>
        </div>
        
        {/* Security badges and partnerships */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center">
              <Lock className="h-8 w-8 mb-2 text-gray-300" />
              <p className="text-xs text-gray-400 font-medium text-center">SSL 보안 인증</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="h-8 w-8 mb-2 text-gray-300" />
              <p className="text-xs text-gray-400 font-medium text-center">개인정보 보호</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-8 w-8 mb-2 text-gray-300" />
              <p className="text-xs text-gray-400 font-medium text-center">대한변호사협회 인증</p>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="h-8 w-8 mb-2 text-gray-300" />
              <p className="text-xs text-gray-400 font-medium text-center">법률 서비스 품질 인증</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 IBS 법률사무소. 모든 권리 보유.</p>
            <div className="flex items-center mt-4 md:mt-0">
              <p className="text-sm">
                <span className="mr-4">사업자등록번호: 123-45-67890</span>
                <span>대표변호사: 유변호</span>
              </p>
            </div>
          </div>
          
          <p className="text-xs mt-4 text-center md:text-left">
            본 웹사이트의 콘텐츠는 법률 조언이 아닌 정보 제공을 목적으로 합니다. 구체적인 법률 문제는 전문 변호사와 상담하시기 바랍니다.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
