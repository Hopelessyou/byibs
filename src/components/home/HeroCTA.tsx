import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroCTA: React.FC = () => {
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal">
      <Link to="/create-document">
        <Button size="lg" className="bg-legal-primary hover:bg-legal-secondary text-white shadow-lg hover:shadow-xl transition-all w-full h-20 text-xl font-semibold hover:scale-105">
          고소장 작성하기
          <ArrowRight className="ml-2 h-6 w-6" aria-hidden="true" />
        </Button>
      </Link>
      <Link to="/mediation">
        <Button size="lg" className="bg-legal-primary hover:bg-legal-secondary text-white shadow-lg hover:shadow-xl transition-all w-full h-20 text-xl font-semibold hover:scale-105">
          합의대행
          <ArrowRight className="ml-2 h-6 w-6" aria-hidden="true" />
        </Button>
      </Link>
      <Link to="/lawyer-accompaniment">
        <Button size="lg" className="bg-legal-primary hover:bg-legal-secondary text-white shadow-lg hover:shadow-xl transition-all w-full h-20 text-xl font-semibold hover:scale-105">
          변호사동행
          <ArrowRight className="ml-2 h-6 w-6" aria-hidden="true" />
        </Button>
      </Link>
      <Link to="/civil-complaint">
        <Button size="lg" className="bg-legal-primary hover:bg-legal-secondary text-white shadow-lg hover:shadow-xl transition-all w-full h-20 text-xl font-semibold hover:scale-105">
          민사소장 작성하기
          <ArrowRight className="ml-2 h-6 w-6" aria-hidden="true" />
        </Button>
      </Link>
      <Link to="/content-certificate">
        <Button size="lg" className="bg-legal-primary hover:bg-legal-secondary text-white shadow-lg hover:shadow-xl transition-all w-full h-20 text-xl font-semibold hover:scale-105">
          내용증명 작성하기
          <ArrowRight className="ml-2 h-6 w-6" aria-hidden="true" />
        </Button>
      </Link>
      <Link to="/response-document">
        <Button size="lg" className="bg-legal-primary hover:bg-legal-secondary text-white shadow-lg hover:shadow-xl transition-all w-full h-20 text-xl font-semibold hover:scale-105">
          답변서 작성하기
          <ArrowRight className="ml-2 h-6 w-6" aria-hidden="true" />
        </Button>
      </Link>
    </div>
  );
};

export default HeroCTA;
