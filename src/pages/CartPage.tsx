
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ShoppingCart, Trash2, Plus, Minus, CreditCard, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
}

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock cart data - in a real app this would come from state management or API
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'document-preparation',
      title: '소장 작성 서비스',
      description: '법률 전문가의 도움으로 정확하고 효과적인 소장을 작성하세요.',
      price: 150000,
      quantity: 1
    },
    {
      id: 'legal-consultation',
      title: '법률 상담 서비스',
      description: '경험 많은 변호사와 1:1 상담을 통해 법적 문제를 해결하세요.',
      price: 100000,
      quantity: 1
    }
  ]);
  
  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast.success('항목이 장바구니에서 제거되었습니다.');
  };
  
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);
  };
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.1); // 10% VAT
  const total = subtotal + tax;
  
  const handleCheckout = () => {
    toast.success('결제 페이지로 이동합니다...');
    navigate('/checkout');
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="flex items-center mb-8">
          <ShoppingCart className="h-8 w-8 text-legal-primary mr-4" />
          <h1 className="text-3xl font-bold text-legal-primary">장바구니</h1>
        </div>
        
        {cartItems.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <ShoppingCart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h2 className="text-2xl font-bold text-gray-700 mb-4">장바구니가 비어있습니다</h2>
              <p className="text-gray-500 mb-8">필요한 법률 서비스를 장바구니에 추가해보세요.</p>
              <Button 
                className="bg-legal-primary hover:bg-legal-secondary text-white"
                onClick={() => navigate('/services')}
              >
                서비스 둘러보기
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>장바구니 항목 ({cartItems.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col md:flex-row border-b border-gray-200 pb-4">
                      <div className="flex-shrink-0 bg-gray-100 p-4 rounded-lg mb-4 md:mb-0 md:mr-4 flex items-center justify-center">
                        <FileText className="h-10 w-10 text-legal-primary" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:justify-between">
                          <div>
                            <h3 className="font-bold text-lg">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                          </div>
                          <div className="text-right mt-2 md:mt-0">
                            <p className="font-bold text-legal-primary">{formatPrice(item.price)}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button 
                              className="p-2 hover:bg-gray-100" 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4">{item.quantity}</span>
                            <button 
                              className="p-2 hover:bg-gray-100" 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50" 
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            삭제
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    className="border-legal-primary text-legal-primary hover:bg-legal-primary hover:text-white"
                    onClick={() => navigate('/services')}
                  >
                    서비스 더 보기
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>주문 요약</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>소계</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>부가가치세 (10%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>총계</span>
                    <span className="text-legal-primary">{formatPrice(total)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-legal-primary hover:bg-legal-secondary text-white"
                    onClick={handleCheckout}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    결제하기
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium mb-2">안내사항</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 서비스별 이용 조건 및 방법은 구매 후 안내됩니다.</li>
                  <li>• 결제 후 전문 변호사가 배정되어 서비스가 제공됩니다.</li>
                  <li>• 구매 후 7일 이내 미사용 건에 한해 환불이 가능합니다.</li>
                  <li>• 문의사항은 고객센터로 연락주세요.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
