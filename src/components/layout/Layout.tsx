
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { initScrollReveal } from '@/utils/scrollReveal';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Initialize scroll reveal animations with enhanced effects
    initScrollReveal();
    
    // Add page transition effects
    document.body.classList.add('page-transition');
    setTimeout(() => {
      document.body.classList.remove('page-transition');
      document.body.classList.add('page-visible');
    }, 300);
    
    return () => {
      document.body.classList.remove('page-visible');
    };
  }, [location.pathname]);

  // Apply route-specific classes for targeted animations and styles
  const getRouteClass = () => {
    if (location.pathname === '/') return 'home-page';
    if (location.pathname.includes('/create-document')) return 'document-creation-page';
    if (location.pathname.includes('/pricing')) return 'pricing-page';
    return '';
  };

  return (
    <div className={`flex flex-col min-h-screen ${getRouteClass()}`}>
      {/* Premium geometric background shape */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-radial from-legal-primary/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-radial from-legal-accent/10 to-transparent rounded-full blur-3xl"></div>
        </div>
      </div>
      
      <Header />
      
      <main className="flex-grow relative">
        {/* Dynamic dot pattern overlay for premium background texture */}
        <div className="absolute inset-0 -z-10 opacity-5 dot-pattern"></div>
        
        {/* Page content with premium wrapper */}
        <div className="premium-content relative z-10">
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
