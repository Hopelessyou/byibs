
import React from 'react';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-legal-light">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">고객 후기</h2>
          <p className="text-gray-600 text-lg">
            고소장닷컴 서비스를 이용한 고객들의 생생한 후기를 확인하세요
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">{testimonial.text}</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold mr-3">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const testimonials = [
  {
    name: "김민준",
    title: "IT 회사원",
    rating: 5,
    text: "중고거래 사기를 당했는데, 변호사 비용이 부담스러웠어요. 고소장닷컴을 통해 정확한 고소장을 빠르게 작성할 수 있었고, 사건이 신속하게 처리되었습니다."
  },
  {
    name: "이지현",
    title: "초등교사",
    rating: 5,
    text: "명예훼손으로 고소하려고 했는데, 법률 용어가 너무 어려워 고민이었어요. 고소장닷컴의 패키지 서비스를 이용해 변호사 검수까지 받으니 안심이 되었습니다."
  },
  {
    name: "박은지",
    title: "인플루언서",
    rating: 4,
    text: "SNS에서 악플로 고통받고 있었는데, 고소장닷컴을 통해 빠르게 대응할 수 있었어요. 여러 건을 처리해야 해서 월정액으로 바꿀 예정입니다."
  },
  {
    name: "최재원",
    title: "스타트업 법무",
    rating: 5,
    text: "회사에서 여러 법적 문제가 발생할 때마다 로펌에 의뢰하는 비용이 만만치 않았는데, 월정액 서비스로 바꾸고 비용을 크게 절감할 수 있었습니다."
  },
  {
    name: "서진우",
    title: "소상공인",
    rating: 4,
    text: "사업하면서 계약 불이행으로 피해를 입었는데, 고소장 작성이 생각보다 쉬웠어요. 증거 자료 업로드와 변호사 검수 서비스가 특히 좋았습니다."
  },
  {
    name: "장미영",
    title: "회사원",
    rating: 5,
    text: "처음에는 반신반의했지만, 고소장닷컴을 통해 작성한 고소장으로 실제 수사가 진행되어 피해 금액을 돌려받을 수 있었어요. 정말 감사합니다!"
  }
];

export default Testimonials;
