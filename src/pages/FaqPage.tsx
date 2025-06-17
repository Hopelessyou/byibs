
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FaqPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-legal-primary">자주 묻는 질문</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            고소장닷컴 서비스 이용에 관한 궁금증을 해결해 드립니다
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Layout>
  );
};

const faqs = [
  {
    question: "고소장닷컴은 어떤 서비스인가요?",
    answer: "고소장닷컴은 전문 변호사의 검토를 통해 고품질의 고소장을 작성해주는 온라인 법률 서비스입니다. AI 기술을 활용한 문서 작성과 변호사의 전문적인 검토가 결합되어 효율적이고 경제적인 법률 서비스를 제공합니다."
  },
  {
    question: "서비스 이용 비용은 어떻게 되나요?",
    answer: "고소장닷컴은 기본형, 프리미엄, 전문가형 등 다양한 요금제를 제공하고 있습니다. 기본형은 39,000원부터 시작하며, 요금제에 따라 변호사 검토 횟수, 수정 횟수, 추가 서비스 등이 다릅니다. 자세한 내용은 '요금제' 페이지에서 확인하실 수 있습니다."
  },
  {
    question: "작성된 고소장은 법적 효력이 있나요?",
    answer: "네, 고소장닷컴을 통해 작성된 모든 고소장은 법원에 제출 가능한 형식으로 작성되며, 전문 변호사의 검토를 거쳐 법적 효력을 갖춘 문서로 완성됩니다."
  },
  {
    question: "고소장 작성에 얼마나 시간이 걸리나요?",
    answer: "기본적인 고소장 초안 작성은 AI 시스템을 통해 약 30분 내외로 완성되며, 변호사 검토는 3시간 이내에 완료됩니다. 수정 요청이나 복잡한 사안의 경우 추가 시간이 소요될 수 있습니다."
  },
  {
    question: "작성된 고소장을 수정할 수 있나요?",
    answer: "네, 가능합니다. 요금제에 따라 무제한 또는 일정 횟수의 수정이 가능합니다. 고소장 작성 완료 후 추가 정보나 수정 사항이 있으면 검토 요청 단계에서 수정을 요청하실 수 있습니다."
  },
  {
    question: "내 정보는 안전하게 보호되나요?",
    answer: "고소장닷컴은 고객의 개인정보 보호를 최우선으로 생각합니다. SSL 보안 인증과 256비트 암호화 기술을 적용하여 모든 정보를 안전하게 보호하고 있으며, 정보보호 관리체계 인증을 획득하였습니다."
  },
  {
    question: "어떤 종류의 고소장을 작성할 수 있나요?",
    answer: "사기, 명예훼손, 모욕죄, 협박, 강요, 성범죄, 스토킹, 업무방해 등 다양한 형사 사건에 대한 고소장을 작성할 수 있습니다. 더 자세한 사건 유형은 '사건유형' 페이지에서 확인하실 수 있습니다."
  },
  {
    question: "직접 상담도 가능한가요?",
    answer: "네, 전화 상담(02-598-5818)을 통해 변호사와 직접 상담이 가능합니다. 또한 프리미엄 이상의 요금제를 선택하시면 1:1 화상 상담 서비스도 제공됩니다."
  },
  {
    question: "작성된 고소장은 어떻게 받을 수 있나요?",
    answer: "작성이 완료된 고소장은 PDF 형식으로 다운로드 받으실 수 있으며, 선택에 따라 등기우편을 통한 출력본 발송 서비스도 제공됩니다."
  },
  {
    question: "환불 정책은 어떻게 되나요?",
    answer: "서비스 시작 전에는 100% 환불이 가능합니다. 서비스 진행 중에는 진행 단계에 따라 환불 금액이 달라지며, 완료 후에는 환불이 불가능합니다. 자세한 환불 정책은 '이용약관'에서 확인하실 수 있습니다."
  }
];

export default FaqPage;
