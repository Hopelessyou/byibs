import React, { useState, useEffect, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Scale, Gavel, Shield, ShoppingCart, Check, Info, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

// 상수 정의
const JSON_PATHS = {
  CRIMINAL_FLOW: '/data/criminal-flow-areas.json',
  WARRANT_REVIEW: '/data/warrant-review-areas.json',
} as const;

const CIVIL_JSON_PATHS: Record<CivilSubCategory, string> = {
  '일반': '/data/civil/general-civil.json',
  '소액': '/data/civil/small-claims.json',
  '지급명령': '/data/civil/payment-order.json',
  '조정': '/data/civil/civil-mediation.json',
  '제소전화해': '/data/civil/pre-litigation-settlement.json',
  '가처분': '/data/civil/provisional-disposition.json',
  '가압류': '/data/civil/provisional-attachment.json'
};

// 인터페이스 정의
interface ServiceDetail {
  name: string;
  price: string;
  duration: string;
  description: string;
}

// 역할 기반 서비스 (형사/민사)
interface RoleBasedServices {
  victim?: ServiceDetail[];
  suspect?: ServiceDetail[];
  plaintiff?: ServiceDetail[];
  defendant?: ServiceDetail[];
}

interface FlowStepDetail {
  title: string;
  description:string;
  services: ServiceDetail[] | RoleBasedServices;
  tips: string[];
}

interface ClickableArea {
  id: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  title: string;
  details: FlowStepDetail;
}

interface FlowAreaData {
  flowType: string;
  imagePath: string;
  areas: ClickableArea[];
}

// 카테고리 타입 정의 (문자열 리터럴 타입 사용)
type Category = '형사' | '민사';
type CriminalSubCategory = '일반' | '구속영장';
type CivilSubCategory = '일반' | '소액' | '지급명령' | '조정' | '제소전화해' | '가처분' | '가압류';

const civilSubCategoryMap: Record<CivilSubCategory, string> = {
  '일반': 'general-civil',
  '소액': 'small-claims',
  '지급명령': 'payment-order',
  '조정': 'civil-mediation',
  '제소전화해': 'pre-litigation-settlement',
  '가처분': 'provisional-disposition',
  '가압류': 'provisional-attachment'
};

const HowItWorksPage = () => {
  // 법률 카테고리 상태
  const [selectedCategory, setSelectedCategory] = useState<Category>('형사');
  const [selectedCriminalSubCategory, setSelectedCriminalSubCategory] = useState<CriminalSubCategory>('일반');
  const [selectedCivilSubCategory, setSelectedCivilSubCategory] = useState<CivilSubCategory>('일반');
  
  // 데이터 로딩 상태
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // JSON 데이터 상태
  const [criminalFlowData, setCriminalFlowData] = useState<FlowAreaData | null>(null);
  const [warrantReviewData, setWarrantReviewData] = useState<FlowAreaData | null>(null);
  const [civilFlowData, setCivilFlowData] = useState<Record<string, FlowAreaData | null>>({});

  // 장바구니 상태
  const { addToCart, items: cartItems } = useCart();
  const [selectedServices, setSelectedServices] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const newSelectedServices: Record<string, boolean> = {};
    cartItems.forEach(item => {
      newSelectedServices[item.id] = true;
    });
    setSelectedServices(newSelectedServices);
  }, [cartItems]);


  // 모달 상태
  const [selectedFlowArea, setSelectedFlowArea] = useState<ClickableArea | null>(null);
  const [hoveredFlowArea, setHoveredFlowArea] = useState<string | null>(null);
  const [debugMode, setDebugMode] = useState(false);
  const [modalScrollOffset, setModalScrollOffset] = useState(0);
  const [selectedRole, setSelectedRole] = useState<string>('');
  
  // JSON 데이터 로딩
  const loadFlowData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const [criminalData, warrantData] = await Promise.all([
        fetch(JSON_PATHS.CRIMINAL_FLOW).then(res => {
          if (!res.ok) throw new Error('Failed to load criminal flow data');
          return res.json();
        }),
        fetch(JSON_PATHS.WARRANT_REVIEW).then(res => {
          if (!res.ok) throw new Error('Failed to load warrant review data');
          return res.json();
        }),
      ]);

      setCriminalFlowData(criminalData);
      setWarrantReviewData(warrantData);

      const civilDataPromises = Object.entries(CIVIL_JSON_PATHS).map(async ([key, path]) => {
        const response = await fetch(path);
        if (!response.ok) {
          console.warn(`Could not load ${path}. It might not exist yet.`);
          return [key, null];
        }
        const data = await response.json();
        return [key, data] as [string, FlowAreaData];
      });

      const civilResults = await Promise.all(civilDataPromises);
      const newCivilFlowData = Object.fromEntries(civilResults.filter(r => r[1] !== null));

      setCivilFlowData(newCivilFlowData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      setError(errorMessage);
      console.error('플로우 데이터 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFlowData();
  }, []);

  // 모달 제어
  useEffect(() => {
    if (selectedFlowArea) {
      setModalScrollOffset(window.scrollY);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedFlowArea]);

  // 모달 열릴 때 역할 초기화
  useEffect(() => {
    if (selectedFlowArea) {
      if (selectedCategory === '형사' && selectedCriminalSubCategory === '일반') {
        setSelectedRole('victim');
      } else if (selectedCategory === '민사') {
        // 민사 기본 역할 설정 (예: 'plaintiff')
        setSelectedRole('plaintiff');
      } else {
        setSelectedRole('');
      }
    }
  }, [selectedFlowArea, selectedCategory, selectedCriminalSubCategory]);


  // 현재 플로우 영역 계산
  const currentFlowAreas = useMemo((): ClickableArea[] => {
    if (selectedCategory === '형사') {
      if (selectedCriminalSubCategory === '일반') {
        return criminalFlowData?.areas || [];
      } else { // '구속영장'
        return warrantReviewData?.areas || [];
      }
    } else if (selectedCategory === '민사') {
      const currentCivilData = civilFlowData[selectedCivilSubCategory];
      return currentCivilData?.areas || [];
    }
    return [];
  }, [selectedCategory, selectedCriminalSubCategory, selectedCivilSubCategory, criminalFlowData, warrantReviewData, civilFlowData]);

  // 현재 이미지 경로 계산
  const getCurrentImagePath = (): string => {
    if (selectedCategory === '형사') {
      return selectedCriminalSubCategory === '일반'
        ? criminalFlowData?.imagePath || ''
        : warrantReviewData?.imagePath || '';
    } else if (selectedCategory === '민사') {
      const currentCivilData = civilFlowData[selectedCivilSubCategory];
      return currentCivilData?.imagePath || '';
    }
    return '';
  };

  // 장바구니 핸들러
  const handleServiceClick = (service: ServiceDetail, stepTitle: string) => {
    const serviceId = `${selectedCategory}-${stepTitle}-${service.name}`;
    
      addToCart({
        id: serviceId,
        name: service.name,
        price: parseInt(service.price.replace(/,/g, '')),
      category: selectedCategory,
        duration: service.duration
      });
      toast.success(`${service.name}이(가) 장바구니에 추가되었습니다.`);
  };

  const categoryIcons = {
    '형사': <Gavel className="w-8 h-8" />,
    '민사': <Scale className="w-8 h-8" />
  };

  // 로딩 및 에러 처리
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">절차 데이터를 불러오는 중입니다...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={loadFlowData}>다시 시도</Button>
          </div>
        </div>
      </Layout>
    );
  }

  // 서비스 렌더링 컴포넌트
  const ServiceCard = ({ service, stepTitle }: { service: ServiceDetail, stepTitle: string }) => (
    <Card className="border border-gray-200 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h5 className="font-semibold text-gray-900 text-lg">{service.name}</h5>
          <span className="text-xl font-bold text-primary">
            {parseInt(service.price).toLocaleString()}원
          </span>
        </div>
        <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">소요시간: {service.duration}</span>
          <Button
            onClick={() => handleServiceClick(service, stepTitle)}
            className="h-10 px-6"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            장바구니 담기
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-12">
          {/* 헤더 섹션 */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              법적 절차 안내
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              복잡한 법적 절차를 단계별로 이해하고, 각 단계에서 필요한 서비스를 확인하세요.
            </p>
          </motion.div>

          {/* 카테고리 탭 */}
          <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as Category)} className="w-full mb-12">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto h-16 mb-12">
              {Object.entries(categoryIcons).map(([category, icon]) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="h-12 text-lg font-semibold flex items-center gap-3 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  {icon}
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* 형사 절차 탭 */}
            <TabsContent value="형사" className="space-y-8">
                    <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                
                {/* 형사 하위 탭 */}
                <div className="mb-8">
                  <div className="flex justify-center">
                    <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-gray-50">
                      <button
                        onClick={() => setSelectedCriminalSubCategory('일반')}
                        className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                          selectedCriminalSubCategory === '일반'
                            ? 'bg-primary text-white shadow-sm'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                        }`}
                      >
                        일반 형사절차
                      </button>
                      <button
                        onClick={() => setSelectedCriminalSubCategory('구속영장')}
                        className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                          selectedCriminalSubCategory === '구속영장'
                            ? 'bg-primary text-white shadow-sm'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                        }`}
                      >
                        구속영장실질심사
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-center text-gray-600 mb-8">
                  아래 이미지의 각 단계를 클릭하시면 상세 정보와 관련 서비스를 확인할 수 있습니다.
                </p>
                
                <div className="text-center mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDebugMode(!debugMode)}
                    className="text-xs"
                  >
                    {debugMode ? '영역 숨기기' : '영역 보기'}
                  </Button>
                </div>
                
                {/* 플로우 이미지와 클릭 영역 */}
                <div className="relative w-full max-w-4xl mx-auto mb-8">
                    <div className="relative">
                      <img 
                        src={getCurrentImagePath()}
                      alt={`${selectedCategory} ${selectedCriminalSubCategory}절차 플로우`}
                        className="w-full h-auto"
                      />
                      
                    {/* 클릭 가능한 영역들 (형사) */}
                      {currentFlowAreas.map((area) => (
                        <div
                          key={area.id}
                        className={`absolute cursor-pointer transition-all duration-200 rounded-lg ${
                          selectedFlowArea?.id === area.id
                            ? 'bg-blue-500 bg-opacity-30 border-2 border-blue-600'
                              : hoveredFlowArea === area.id
                            ? 'bg-blue-300 bg-opacity-20 border-2 border-blue-400'
                              : debugMode 
                            ? 'bg-red-200 bg-opacity-30 border border-red-400'
                            : 'bg-transparent hover:bg-blue-200 hover:bg-opacity-10'
                          }`}
                          style={{
                          left: `${area.position.x}%`,
                          top: `${area.position.y}%`,
                          width: `${area.position.width}%`,
                          height: `${area.position.height}%`,
                        }}
                        onClick={() => setSelectedFlowArea(area)}
                          onMouseEnter={() => setHoveredFlowArea(area.id)}
                          onMouseLeave={() => setHoveredFlowArea(null)}
                          title={area.title}
                      />
                                        ))}
                                      </div>
                                          </div>
                              </motion.div>
            </TabsContent>

            {/* 민사 절차 탭 */}
            <TabsContent value="민사" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >

              {/* 민사 세부 탭 */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2 bg-blue-50 p-2 rounded-lg justify-center">
                  {[
                      { key: '일반' as CivilSubCategory, label: '일반민사' },
                      { key: '소액' as CivilSubCategory, label: '소액사건' },
                      { key: '지급명령' as CivilSubCategory, label: '지급명령' },
                      { key: '조정' as CivilSubCategory, label: '민사조정절차' },
                      { key: '제소전화해' as CivilSubCategory, label: '제소전화해' },
                      { key: '가처분' as CivilSubCategory, label: '가처분' },
                      { key: '가압류' as CivilSubCategory, label: '가압류' }
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setSelectedCivilSubCategory(key)}
                      className={`px-4 py-2 rounded-md font-medium transition-colors ${
                        selectedCivilSubCategory === key
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-blue-600 hover:bg-blue-100'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
                
                <p className="text-center text-gray-600 mb-8">
                  아래 이미지의 각 단계를 클릭하시면 상세 정보와 관련 서비스를 확인할 수 있습니다.
                </p>
                
                <div className="text-center mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDebugMode(!debugMode)}
                    className="text-xs"
                  >
                    {debugMode ? '영역 숨기기' : '영역 보기'}
                  </Button>
                </div>
                
                {/* 플로우 이미지와 클릭 영역 */}
                <div className="relative w-full max-w-4xl mx-auto mb-8">
                  <div className="relative">
                    <img 
                      src={getCurrentImagePath()}
                      alt="민사절차 플로우"
                      className="w-full h-auto"
                    />
                    
                    {/* 클릭 가능한 영역들 (민사) */}
                    {currentFlowAreas.map((area) => (
                      <div
                        key={area.id}
                          className={`absolute cursor-pointer transition-all duration-200 rounded-lg ${
                            selectedFlowArea?.id === area.id
                              ? 'bg-blue-500 bg-opacity-30 border-2 border-blue-600'
                            : hoveredFlowArea === area.id
                              ? 'bg-blue-300 bg-opacity-20 border-2 border-blue-400'
                            : debugMode 
                              ? 'bg-red-200 bg-opacity-30 border border-red-400'
                              : 'bg-transparent hover:bg-blue-200 hover:bg-opacity-10'
                        }`}
                        style={{
                            left: `${area.position.x}%`,
                            top: `${area.position.y}%`,
                            width: `${area.position.width}%`,
                            height: `${area.position.height}%`,
                          }}
                          onClick={() => setSelectedFlowArea(area)}
                        onMouseEnter={() => setHoveredFlowArea(area.id)}
                        onMouseLeave={() => setHoveredFlowArea(null)}
                        title={area.title}
                        />
                    ))}
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* 모달 */}
                <AnimatePresence>
            {selectedFlowArea && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-50"
                style={{ top: modalScrollOffset, bottom: -modalScrollOffset }}
                        onClick={() => setSelectedFlowArea(null)}
                      >
                        <div className="flex items-center justify-center min-h-screen py-8 px-4">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto relative"
                            onClick={(e) => e.stopPropagation()}
                          >
                                <div className="p-8">
                                  {/* 모달 헤더 */}
                                  <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                      <Info className="w-8 h-8 text-blue-600" />
                          {selectedFlowArea.details.title}
                                    </h3>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setSelectedFlowArea(null)}
                                      className="h-10 w-10 p-0"
                                    >
                                      <X className="w-5 h-5" />
                                    </Button>
                                  </div>

                                  {/* 모달 바디 */}
                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* 좌측: 단계 설명 및 팁 */}
                                    <div>
                                      <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                            {selectedFlowArea.details.description}
                                      </p>
                                      
                                      <h4 className="text-xl font-semibold text-gray-900 mb-4">
                                        중요 체크포인트
                                      </h4>
                                      <ul className="space-y-3">
                            {selectedFlowArea.details.tips.map((tip, index) => (
                                          <li key={index} className="flex items-start gap-3">
                                            <Check className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-gray-700 text-lg">{tip}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>

                                    {/* 우측: 관련 서비스 */}
                                    <div>
                                      <h4 className="text-xl font-semibold text-gray-900 mb-4">
                                        관련 서비스
                                      </h4>

                          {/* 역할 선택 탭 */}
                          {(selectedCategory === '형사' && selectedCriminalSubCategory === '일반') && (
                            <div className="mb-4 flex gap-2">
                              <Button variant={selectedRole === 'victim' ? 'default' : 'outline'} onClick={() => setSelectedRole('victim')}>피해자</Button>
                              <Button variant={selectedRole === 'suspect' ? 'default' : 'outline'} onClick={() => setSelectedRole('suspect')}>피의자/피고인</Button>
                            </div>
                          )}
                          {selectedCategory === '민사' && 'defendant' in (selectedFlowArea.details.services) && (
                            <div className="mb-4 flex gap-2">
                               <Button variant={selectedRole === 'plaintiff' ? 'default' : 'outline'} onClick={() => setSelectedRole('plaintiff')}>원고</Button>
                               <Button variant={selectedRole === 'defendant' ? 'default' : 'outline'} onClick={() => setSelectedRole('defendant')}>피고</Button>
                            </div>
                          )}

                                      <div className="space-y-4">
                            {(() => {
                              const services = selectedFlowArea.details.services;
                              let servicesToRender: ServiceDetail[] = [];

                              if (Array.isArray(services)) {
                                servicesToRender = services;
                              } else if (selectedRole) {
                                servicesToRender = (services as RoleBasedServices)[selectedRole as keyof RoleBasedServices] || [];
                              }

                              if (servicesToRender.length === 0) {
                                return <p className="text-gray-500">제공되는 서비스가 없습니다.</p>;
                              }

                              return servicesToRender.map((service, index) => (
                                <ServiceCard key={index} service={service} stepTitle={selectedFlowArea.details.title} />
                              ));
                            })()}
                </div>
                                    </div>
                                  </div>

                                  {/* 모달 푸터 */}
                                  <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                                    <Button
                                      variant="outline"
                                      onClick={() => setSelectedFlowArea(null)}
                                      className="px-8"
                                    >
                                      닫기
                                    </Button>
                                  </div>
                                </div>
                          </motion.div>
                        </div>
                      </motion.div>
                  )}
                </AnimatePresence>

          {/* 하단 CTA */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                전문가와 상담하세요
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                복잡한 법적 절차, 혼자 고민하지 마세요. 
                저희 전문가들이 단계별로 안내해드립니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link to="/contact">
                    <Shield className="w-5 h-5 mr-2" />
                    무료 상담 신청
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <Link to="/services">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    서비스 둘러보기
              </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorksPage;
