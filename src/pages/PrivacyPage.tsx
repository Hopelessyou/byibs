
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Separator } from '@/components/ui/separator';

const PrivacyPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-legal-primary">개인정보처리방침</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            고소장닷컴은 개인정보보호법을 준수하며 이용자의 개인정보를 소중하게 보호합니다
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-elegant">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-legal-primary">1. 개인정보의 수집 및 이용 목적</h2>
                <p className="text-gray-700 mb-3">
                  고소장닷컴은 다음의 목적을 위하여 필요한 최소한의 개인정보를 수집하고 있습니다.
                </p>
                <ul className="list-disc ml-6 space-y-2 text-gray-700">
                  <li>서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산</li>
                  <li>회원 관리: 회원제 서비스 이용, 개인식별, 불량회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인</li>
                  <li>고지사항 전달, 서비스 이용에 관한 통계</li>
                </ul>
              </section>
              
              <Separator />
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-legal-primary">2. 수집하는 개인정보 항목</h2>
                <p className="text-gray-700 mb-3">
                  고소장닷컴은 회원가입, 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
                </p>
                <ul className="list-disc ml-6 space-y-2 text-gray-700">
                  <li>수집항목: 이름, 생년월일, 성별, 로그인ID, 비밀번호, 자택 전화번호, 휴대전화번호, 이메일, 주소, 서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보</li>
                  <li>개인정보 수집방법: 홈페이지(회원가입, 서비스 이용), 서면양식</li>
                </ul>
              </section>
              
              <Separator />
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-legal-primary">3. 개인정보의 보유 및 이용기간</h2>
                <p className="text-gray-700 mb-3">
                  원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 상법, 전자상거래 등에서의 소비자보호에 관한 법률 등 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.
                </p>
                <ul className="list-disc ml-6 space-y-2 text-gray-700">
                  <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                  <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                  <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
                </ul>
              </section>
              
              <Separator />
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-legal-primary">4. 개인정보의 파기절차 및 방법</h2>
                <p className="text-gray-700 mb-3">
                  고소장닷컴은 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.
                </p>
                <ul className="list-disc ml-6 space-y-2 text-gray-700">
                  <li>파기절차: 회원님이 회원가입 등을 위해 입력하신 정보는 목적이 달성된 후 별도의 DB로 옮겨져 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다.</li>
                  <li>파기방법: 전자적 파일형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</li>
                </ul>
              </section>
              
              <Separator />
              
              <section>
                <h2 className="text-xl font-semibold mb-3 text-legal-primary">5. 개인정보 보호책임자</h2>
                <p className="text-gray-700 mb-3">
                  고소장닷컴은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                </p>
                <div className="ml-6 text-gray-700">
                  <p>• 개인정보 보호책임자</p>
                  <p className="ml-4">성명: 박정보</p>
                  <p className="ml-4">직책: 정보보호팀장</p>
                  <p className="ml-4">연락처: 02-598-5818, privacy@ibslaw.co.kr</p>
                </div>
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

export default PrivacyPage;
