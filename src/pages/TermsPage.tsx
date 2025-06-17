
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Separator } from '@/components/ui/separator';

const TermsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-legal-primary">이용약관</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            고소장닷컴 서비스 이용에 관한 약관입니다
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-elegant">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-legal-primary">제1조 (목적)</h2>
                <p className="text-gray-700">
                  이 약관은 IBS법률사무소(이하 "회사")가 운영하는 웹사이트(이하 "고소장닷컴")에서 제공하는 온라인 서비스(이하 "서비스")를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                </p>
              </section>
              
              <Separator />
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-legal-primary">제2조 (정의)</h2>
                <ol className="list-decimal ml-6 space-y-2 text-gray-700">
                  <li>"서비스"란 구현되는 단말기(PC, TV, 휴대형단말기 등의 각종 유무선 장치를 포함)와 상관없이 이용자가 이용할 수 있는 고소장닷컴 관련 제반 서비스를 의미합니다.</li>
                  <li>"이용자"란 고소장닷컴에 접속하여 이 약관에 따라 고소장닷컴이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</li>
                  <li>"회원"이라 함은 고소장닷컴에 회원등록을 한 자로서, 계속적으로 고소장닷컴이 제공하는 서비스를 이용할 수 있는 자를 말합니다.</li>
                  <li>"비회원"이라 함은 회원에 가입하지 않고 고소장닷컴이 제공하는 서비스를 이용하는 자를 말합니다.</li>
                </ol>
              </section>
              
              <Separator />
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-legal-primary">제3조 (약관 등의 명시와 설명 및 개정)</h2>
                <ol className="list-decimal ml-6 space-y-2 text-gray-700">
                  <li>회사는 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소(소비자의 불만을 처리할 수 있는 곳의 주소를 포함), 전화번호, 전자우편주소, 사업자등록번호, 통신판매업 신고번호, 개인정보관리책임자 등을 이용자가 쉽게 알 수 있도록 고소장닷컴의 초기 서비스화면(전면)에 게시합니다.</li>
                  <li>회사는 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에 관한 법률」, 「전자문서 및 전자거래기본법」, 「전자금융거래법」, 「전자서명법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」, 「방문판매 등에 관한 법률」, 「소비자기본법」 등 관련 법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</li>
                </ol>
              </section>
              
              <Separator />
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-legal-primary">제4조 (서비스의 제공 및 변경)</h2>
                <ol className="list-decimal ml-6 space-y-2 text-gray-700">
                  <li>회사는 다음과 같은 업무를 수행합니다.
                    <ol className="list-disc ml-6 mt-2 space-y-1">
                      <li>고소장 등 법률 문서 작성 서비스</li>
                      <li>법률 상담 및 자문</li>
                      <li>기타 회사가 정하는 업무</li>
                    </ol>
                  </li>
                  <li>회사는 서비스의 내용, 이용방법, 이용시간에 대하여 변경이 있는 경우에는, 변경사유, 변경될 서비스의 내용 및 제공일자 등을 그 변경 전 7일 이상 해당 서비스 초기화면에 게시합니다.</li>
                </ol>
              </section>
              
              <Separator />
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-legal-primary">제5조 (서비스 이용계약의 성립)</h2>
                <ol className="list-decimal ml-6 space-y-2 text-gray-700">
                  <li>서비스 이용계약은 이용자의 서비스 이용 신청에 대한 회사의 승낙으로 성립됩니다.</li>
                  <li>서비스 이용계약은 서비스 별로 회사가 정한 절차에 따라 이용자가 서비스 이용 신청을 하고, 회사가 이에 대해 승낙함으로써 성립합니다.</li>
                </ol>
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

export default TermsPage;
