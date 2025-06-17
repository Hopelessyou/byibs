
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Shield } from 'lucide-react';

const LegalNoticePage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-legal-primary">법적 고지사항</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            고소장닷컴 서비스 이용에 관한 법적 고지사항입니다
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-elegant">
            <div className="flex justify-center mb-8">
              <Shield className="h-16 w-16 text-legal-primary" />
            </div>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-legal-primary">면책조항</h2>
                <p className="mb-3">
                  고소장닷컴에서 제공하는 모든 정보와 서비스는 일반적인 정보 제공과 편의를 목적으로 하며, 법률적 조언을 대체하지 않습니다. 특정 법률 문제에 대해서는 반드시 자격을 갖춘 변호사와 상담하시기 바랍니다.
                </p>
                <p>
                  고소장닷컴은 서비스를 통해 제공된 정보의 정확성, 완전성, 유용성에 대해 보증하지 않으며, 이로 인해 발생하는 어떠한 손해에 대해서도 책임을 지지 않습니다.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-legal-primary">저작권 정보</h2>
                <p className="mb-3">
                  고소장닷컴에 포함된 모든 콘텐츠(텍스트, 그래픽, 로고, 버튼 아이콘, 이미지, 오디오 클립, 디지털 다운로드, 데이터 편집물, 소프트웨어 등)는 IBS법률사무소 또는 콘텐츠 제공자의 재산이며 국내 및 국제 저작권법의 보호를 받습니다.
                </p>
                <p>
                  고소장닷컴의 명시적인 서면 허가 없이 사이트의 콘텐츠를 복제, 수정, 배포, 전송, 재사용, 재출판 또는 다른 방식으로 사용하는 것은 엄격히 금지됩니다.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-legal-primary">제3자 웹사이트 링크</h2>
                <p>
                  고소장닷컴은 편의를 위해 제3자 웹사이트 링크를 제공할 수 있습니다. 이러한 링크는 정보 제공의 목적으로만 제공되며, 해당 웹사이트의 내용이나 정확성에 대한 보증이나 승인을 의미하지 않습니다. 제3자 웹사이트 방문 시 발생하는 위험은 사용자 본인의 책임입니다.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-legal-primary">준거법 및 관할</h2>
                <p>
                  고소장닷컴 이용과 관련된 모든 법적 문제는 대한민국 법률에 따르며, 분쟁 발생 시 서울중앙지방법원을 제1심 전속관할 법원으로 합니다.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-legal-primary">법률 서비스 제공에 관한 고지</h2>
                <p>
                  고소장닷컴은 IBS법률사무소에서 운영하는 서비스로, 변호사 자격을 갖춘 전문가들이 참여하고 있습니다. 그러나 고소장닷컴을 통한 고소장 작성 서비스는 변호사 대리를 의미하지 않으며, 법원 제출 및 소송 진행은 사용자 본인의 책임하에 이루어져야 합니다.
                </p>
              </section>
              
              <p className="mt-8 text-sm text-gray-500 text-center">
                최종 수정일: 2023년 12월 1일
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LegalNoticePage;
