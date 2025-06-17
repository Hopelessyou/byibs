
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import HowItWorks from '@/components/home/HowItWorks';
import Pricing from '@/components/home/Pricing';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';
import { ArrowUpIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  // Scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Scroll to section functionality
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <Layout>
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:text-legal-primary focus:p-4 focus:m-4 focus:rounded-md"
      >
        메인 콘텐츠로 건너뛰기
      </a>
      
      <main id="main-content">
        <Hero />
        <Features />
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <section id="pricing">
          <Pricing />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <CTA />
      </main>
      
      {/* Back to top button */}
      <Button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-legal-primary hover:bg-legal-secondary text-white rounded-full p-3 shadow-lg z-40"
        aria-label="맨 위로 이동"
      >
        <ArrowUpIcon className="h-5 w-5" />
      </Button>
    </Layout>
  );
};

export default Index;
