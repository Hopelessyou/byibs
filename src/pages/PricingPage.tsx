import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, HelpCircle, Search, FileText, Gavel, Scale, Scroll, Clock, CheckCircle, PlusCircle, Filter, UserPlus, Upload, Printer, ChevronRight, ArrowRight, Building2, Handshake, Shield } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  price: number;
  category: string;
  preparationTime: string;
  requirements: string[];
  features: string[];
  popular?: boolean;
}

const PricingPage = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [activeCategory, setActiveCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  
  const services: Service[] = [
    // 민사 (일반 민사분쟁) - 소송 전 단계 서비스
    {
      id: 'civil-consultation',
      title: '민사 분쟁 상담',
      description: '1시간 이내 초기 상담, 사건 쟁점, 증거, 절차 검토 및 대응 방향 안내',
      icon: Gavel,
      price: 110000,
      category: '민사',
      preparationTime: '1시간',
      requirements: ['상담 시 사건 개요 정리 자료', '관련 계약서, 영수증, 통장내역 등 증거자료(가능한 경우)'],
      features: [
        '1시간 이내 초기 상담',
        '사건 쟁점 분석',
        '증거 검토',
        '절차 및 대응 방향 안내'
      ]
    },
    {
      id: 'content-certificate',
      title: '내용증명 작성 대행',
      description: '분쟁 상대방에게 발송할 내용증명 문안 작성 및 발송 절차 안내',
      icon: FileText,
      price: 300000,
      category: '민사',
      preparationTime: '2-3일',
      requirements: ['기초 사실관계(계약서, 거래내역, 채권채무 내용 등)', '상대방 주소 및 인적 사항'],
      features: [
        '내용증명 문안 작성',
        '발송 절차 안내',
        '대응방안 안내',
        '자율적 해결 유도'
      ]
    },
    {
      id: 'settlement-negotiation',
      title: '합의 협상 대리',
      description: '변호사가 상대방과 합의금 협상을 직접 대행(전화·공문·이메일 등)',
      icon: Scale,
      price: 500000,
      category: '민사',
      preparationTime: '상대방 대응 속도에 따라 상이',
      requirements: ['사건 관련 자료(계약서, 거래이력 등)', '협상 목표(합의금 범위 등)'],
      features: [
        '합의금 협상 대행',
        '합의 성공 시까지 진행',
        '원만한 분쟁 해결',
        '타협점 도출'
      ]
    },
    {
      id: 'settlement-agreement',
      title: '합의서 작성',
      description: '당사자 간 합의 성립 시 합의서(또는 MOU) 작성',
      icon: FileText,
      price: 300000,
      category: '민사',
      preparationTime: '1-2일',
      requirements: ['합의 주요 조건(금전, 일정, 책임범위 등)', '양측 인적사항'],
      features: [
        '합의서 작성',
        '합의 조건 문서화',
        '추후 분쟁 예방',
        '법적 효력 확보'
      ]
    },
    // 민사 - 소송 단계 서비스
    {
      id: 'civil-petition',
      title: '소장 작성',
      description: '민사소송 제기를 위한 소장 작성 대행',
      icon: FileText,
      price: 1000000,
      category: '민사',
      preparationTime: '3-7일',
      requirements: ['사건 관련 문서(계약서·각종 영수증 등)', '상대방 인적사항·주소', '피해액·손해액 입증자료'],
      features: [
        '소장 작성 대행',
        '사실관계·법률주장 정리',
        '법원 제출',
        '인지대·송달료 등 실비 별도'
      ]
    },
    {
      id: 'answer-sheet',
      title: '답변서 작성',
      description: '피고측에서 소장 내용 반박 및 사실관계·법률적 대응 서면 작성',
      icon: FileText,
      price: 800000,
      category: '민사',
      preparationTime: '3-7일',
      requirements: ['상대방 소장(송달 받은 문서), 증거자료', '의뢰인 진술 및 입증자료'],
      features: [
        '소장 내용 반박',
        '사실관계 정리',
        '법률적 대응',
        '법원 제출'
      ]
    },
    // 형사 (형사사건) - 피해자 측 서비스
    {
      id: 'criminal-consultation',
      title: '형사 사건 법률상담',
      description: '피해 발생(또는 피의자 신분) 형사사건 1시간 이내 초기 상담',
      icon: Gavel,
      price: 110000,
      category: '형사',
      preparationTime: '1시간',
      requirements: ['사건 개요 정리 자료', '관련 증거(녹음, 영상, 서류 등)'],
      features: [
        '1시간 이내 초기 상담',
        '사건 경위·증거 청취',
        '고소 여부 자문',
        '대응 방안 제시'
      ]
    },
    {
      id: 'criminal-petition',
      title: '고소장 작성',
      description: '범죄 피해자의 고소장 작성',
      icon: FileText,
      price: 500000,
      category: '형사',
      preparationTime: '3-7일',
      requirements: ['피해 사실 증거(메시지, 진단서, 사진 등)', '상대방 인적사항(확정 가능한 범위 내)'],
      features: [
        '고소장 작성',
        '사실관계·적용법조 검토',
        '경찰·검찰 제출용 서면 완성',
        '증거 정리'
      ]
    },
    // 형사 (형사사건) - 피의자/피고인 측 서비스 (수사 단계)
    {
      id: 'investigation-attendance',
      title: '피의자 조사 입회',
      description: '경찰·검찰 피의자 조사 시 변호사 동석(회당), 조사과정에서 부당한 압박 방지, 진술 관련 법적 조언',
      icon: Gavel,
      price: 300000,
      category: '형사',
      preparationTime: '2-3시간',
      requirements: ['수사기관 출석 요구서(소환장 등)', '사건 기초 자료'],
      features: [
        '변호사 동석',
        '부당한 압박 방지',
        '진술 관련 법적 조언',
        '조사 과정 보호'
      ]
    },
    {
      id: 'arrest-emergency',
      title: '체포/구속 관련 긴급 대응',
      description: '피의자가 체포·구속영장 청구된 경우 긴급 법률지원, 가족 연락, 초동 자문, 구속적부심·석방 절차 안내',
      icon: Gavel,
      price: 500000,
      category: '형사',
      preparationTime: '즉시-12일',
      requirements: ['사건 개요 파악에 필요한 기본 자료', '체포·구속 관련 서류(영장 등)'],
      features: [
        '긴급 법률지원',
        '가족 연락',
        '초동 자문',
        '구속적부심·석방 절차 안내'
      ]
    },
    {
      id: 'arrest-warrant-defense',
      title: '구속영장 실질심사 변호',
      description: '구속영장심문(영장실질심사)에 변호사 출석, 도주·증거인멸 우려 없음 주장, 불구속 수사 유도',
      icon: Gavel,
      price: 1000000,
      category: '형사',
      preparationTime: '48시간 이내',
      requirements: ['영장심문 기일 통지서', '가족관계, 주거·직장 등 정상 자료'],
      features: [
        '구속영장심문 출석',
        '도주·증거인멸 우려 없음 주장',
        '불구속 수사 유도',
        '법적 권리 보호'
      ]
    },
    {
      id: 'bail-application',
      title: '보석 신청 대행',
      description: '구속된 피고인을 위해 보석 신청서 작성·제출 및 심문 대리, 피고인 정상관계 자료 첨부, 조건부 석방 요청',
      icon: FileText,
      price: 500000,
      category: '형사',
      preparationTime: '1-2주',
      requirements: ['구속 영장/구속사실 통지', '정상관계 증빙자료(주거·직장 등)'],
      features: [
        '보석 신청서 작성·제출',
        '심문 대리',
        '정상관계 자료 첨부',
        '조건부 석방 요청'
      ]
    },
    {
      id: 'criminal-settlement',
      title: '수사 단계 합의 대리',
      description: '피의자와 피해자 간 합의 진행, 합의금 협상 및 합의서 작성, 고소 취하·선처 탄원 확보로 형사처벌 경감',
      icon: Scale,
      price: 500000,
      category: '형사',
      preparationTime: '수주-수개월',
      requirements: ['피해사실 기초자료', '피해자 연락처 (가능한 경우)'],
      features: [
        '합의 진행',
        '합의금 협상',
        '합의서 작성',
        '고소 취하·선처 탄원 확보'
      ]
    },
    // 형사 (형사사건) - 피고인 측 서비스 (재판 단계)
    {
      id: 'trial-preparation',
      title: '형사 공판 준비 및 변론 계획',
      description: '기소 후 사건 기록 검토, 공판 전략 수립, 적용법조·쟁점·증거계획 정리, 피고인 진술 방향 제안',
      icon: Gavel,
      price: 300000,
      category: '형사',
      preparationTime: '1-2주',
      requirements: ['검사측 공소장, 수사기록(열람·복사)'],
      features: [
        '사건 기록 검토',
        '공판 전략 수립',
        '적용법조·쟁점 정리',
        '피고인 진술 방향 제안'
      ]
    },
    {
      id: 'trial-attendance',
      title: '형사 재판 출석 변호(1심)',
      description: '형사재판 기일 출석(회당), 공소사실 인정 여부, 증인신문, 피고인신문, 최후변론 등 수행',
      icon: Gavel,
      price: 300000,
      category: '형사',
      preparationTime: '30분-1시간',
      requirements: ['사건 기록 및 준비서면(필요 시)', '피고인 신분증 등 (출석 확인용)'],
      features: [
        '재판 기일 출석',
        '공소사실 인정 여부 검토',
        '증인신문·피고인신문',
        '최후변론 수행'
      ]
    },
    {
      id: 'plea-letter',
      title: '탄원서/반성문 작성 지도',
      description: '피고인·가족이 제출할 탄원서·반성문 작성 지도, 진정성 있는 내용 작성 위해 첨삭·구성 조언',
      icon: FileText,
      price: 200000,
      category: '형사',
      preparationTime: '1-2일',
      requirements: ['작성자(피고인·가족) 기초 정보', '사건 경위 및 반성 내용'],
      features: [
        '탄원서·반성문 작성 지도',
        '첨삭·구성 조언',
        '진정성 있는 내용 작성',
        '법적 효과 극대화'
      ]
    },
    {
      id: 'sentencing-materials',
      title: '양형자료 수집 및 제출',
      description: '선처를 위한 정상참작 자료(반성문, 치료기록, 탄원서 등) 수집·정리, 재판부에 자료 제출',
      icon: FileText,
      price: 300000,
      category: '형사',
      preparationTime: '1-2주',
      requirements: ['필요 양형자료(치료비 영수증, 진료기록, 가족 탄원 등)', '재판기일 전 준비'],
      features: [
        '정상참작 자료 수집',
        '자료 정리 및 제출',
        '선처를 위한 준비',
        '양형 감면 자료 준비'
      ]
    },
    {
      id: 'appeal-reason',
      title: '형사 항소이유서 작성',
      description: '1심 판결에 불복할 경우 항소이유서 작성, 1심 판단 오류·양형 부당성 지적 후 2심 법원 제출',
      icon: FileText,
      price: 800000,
      category: '형사',
      preparationTime: '7일',
      requirements: ['1심 판결문(판결문 정본)', '1심 증거자료 및 공판조서'],
      features: [
        '항소이유서 작성',
        '1심 판단 오류 지적',
        '양형 부당성 주장',
        '2심 법원 제출'
      ]
    },
    {
      id: 'appeal-trial',
      title: '형사 항소심 변론',
      description: '항소심 공판 출석 변론(회당), 1심 기록 검토 후 추가 주장·증거 제출',
      icon: Gavel,
      price: 300000,
      category: '형사',
      preparationTime: '30분-1시간',
      requirements: ['항소이유서(제출된 경우)', '1심 기록·증거'],
      features: [
        '항소심 공판 출석',
        '1심 기록 검토',
        '추가 주장·증거 제출',
        '변론 수행'
      ]
    },
    {
      id: 'supreme-appeal',
      title: '상고이유서 작성',
      description: '2심 판결 불복, 대법원에 상고할 경우 상고이유서 작성, 법리 오해·절차위반 등 상고사유에 해당하는 부분 논리적으로 구성',
      icon: FileText,
      price: 1000000,
      category: '형사',
      preparationTime: '20일',
      requirements: ['2심 판결문(정본)', '하급심 증거·기록'],
      features: [
        '상고이유서 작성',
        '법리 오해·절차위반 주장',
        '논리적 구성',
        '대법원 제출'
      ]
    },
    // 가사 (이혼·가족·상속) - 혼인·가족 관계 사건
    {
      id: 'family-consultation',
      title: '가사 사건 상담',
      description: '이혼, 양육권, 친권, 입양 등 가족법 전반 1시간 이내 상담, 가정법원 절차, 분쟁 해결 방향 자문',
      icon: Gavel,
      price: 110000,
      category: '가사',
      preparationTime: '1시간',
      requirements: ['혼인관계 서류(가족관계증명서, 혼인관계증명서 등)', '재산·양육 관련 기초자료'],
      features: [
        '1시간 이내 상담',
        '가정법원 절차 안내',
        '분쟁 해결 방향 자문',
        '전문 법률 조언'
      ]
    },
    {
      id: 'divorce-agreement',
      title: '협의이혼 합의서 작성',
      description: '부부가 협의이혼에 합의한 경우, 이혼합의서 및 양육비·재산분할 합의서 작성, 법적 요건 충족 형태로 문서화',
      icon: FileText,
      price: 500000,
      category: '가사',
      preparationTime: '3-5일',
      requirements: ['이혼 협의 내용(재산, 양육, 위자료 여부)', '가족관계증명서'],
      features: [
        '이혼합의서 작성',
        '양육비·재산분할 합의서 작성',
        '법적 요건 충족',
        '문서화'
      ]
    },
    {
      id: 'divorce-mediation',
      title: '이혼 조정신청서 작성',
      description: '조정절차로 갈 때 가정법원 조정신청서 작성, 혼인파탄 경위·양육·재산분할 요구사항 기재',
      icon: FileText,
      price: 800000,
      category: '가사',
      preparationTime: '3-7일',
      requirements: ['혼인관계증명서, 주민등록등본 등', '재산내역, 자녀 상황'],
      features: [
        '조정신청서 작성',
        '혼인파탄 경위 기재',
        '양육·재산분할 요구사항 정리',
        '가정법원 제출'
      ]
    },
    {
      id: 'divorce-petition',
      title: '이혼 소장 작성',
      description: '재판상 이혼을 위해 가정법원에 제출할 소장 작성, 유책사유(부정, 폭력 등), 위자료·재산분할 청구, 증거목록 정리',
      icon: FileText,
      price: 1000000,
      category: '가사',
      preparationTime: '3-7일',
      requirements: ['혼인관계증명서 등 신분관계 서류', '부정행위, 폭력 등 입증자료(사진, 메시지, 진단서 등)'],
      features: [
        '이혼 소장 작성',
        '유책사유 입증',
        '위자료·재산분할 청구',
        '증거목록 정리'
      ]
    },
    {
      id: 'family-court-attendance',
      title: '가사조정/재판 출석 대리',
      description: '조정기일·재판기일에 변호사 출석(회당), 조정위원, 판사 앞에서 진술·조율 / 재판 변론 수행',
      icon: Gavel,
      price: 300000,
      category: '가사',
      preparationTime: '30분-1시간',
      requirements: ['소장·답변서·증거 자료', '합의안(조정 시), 재산분할안'],
      features: [
        '조정·재판 기일 출석',
        '상속분쟁 대리',
        '조정·재판 변론',
        '법적 권리 보호'
      ]
    },
    {
      id: 'custody-application',
      title: '양육권/친권 신청 대행',
      description: '이혼·별거 시 양육권·친권 지정/변경 신청, 자녀 복리를 위한 신청 서류 작성 및 제출',
      icon: FileText,
      price: 600000,
      category: '가사',
      preparationTime: '1-2개월',
      requirements: ['자녀 기본정보, 현재 양육상황', '양육환경 관련 자료(주거, 경제능력 등)'],
      features: [
        '양육권·친권 신청',
        '자녀 복리 고려',
        '신청 서류 작성',
        '법원 제출'
      ]
    },
    {
      id: 'child-support-petition',
      title: '양육비 청구 소장 작성',
      description: '자녀 양육비 미지급 시 상대방 상대 소송 소장 작성, 미지급액 산정, 지급명령 청구',
      icon: FileText,
      price: 800000,
      category: '가사',
      preparationTime: '3-7일',
      requirements: ['미지급 양육비 계산 자료', '상대방 주소 및 인적사항'],
      features: [
        '양육비 청구 소장 작성',
        '미지급액 산정',
        '지급명령 청구',
        '법원 제출'
      ]
    },
    {
      id: 'visitation-application',
      title: '면접교섭 신청서 작성',
      description: '비양육 부모의 자녀 면접교섭권 확보 위한 신청, 면접교섭 횟수, 방법, 시간·장소 등 요구사항 작성',
      icon: FileText,
      price: 500000,
      category: '가사',
      preparationTime: '3-5일',
      requirements: ['기존 판결문·협의이혼 확인서(이혼 시)', '자녀 및 상대방 인적사항'],
      features: [
        '면접교섭 신청서 작성',
        '면접교섭 조건 정리',
        '자녀 복리 고려',
        '법원 제출'
      ]
    },
    {
      id: 'adoption-procedure',
      title: '입양 절차 대행',
      description: '친양자 입양 등 가정법원 심사 필요 절차 대행, 입양신청서, 가정조사 대응, 인용 결정 시까지 진행',
      icon: FileText,
      price: 1500000,
      category: '가사',
      preparationTime: '1-3개월',
      requirements: ['입양 대상 아동 정보, 친권자 동의', '소득·재산·가정환경 자료'],
      features: [
        '입양 절차 대행',
        '입양신청서 작성',
        '가정조사 대응',
        '인용 결정 시까지 진행'
      ]
    },
    // 가사 (이혼·가족·상속) - 상속·유언 등
    {
      id: 'inheritance-consultation',
      title: '상속 상담',
      description: '상속 개시 후 재산 분배, 상속포기, 유류분 등 전반 상담(1시간), 상속인 범위·절차 검토, 대응방안 자문',
      icon: Gavel,
      price: 110000,
      category: '가사',
      preparationTime: '1시간',
      requirements: ['피상속인(망인) 기본정보', '가족관계증명서, 유언장 여부, 재산 목록'],
      features: [
        '1시간 이내 상담',
        '상속인 범위·절차 검토',
        '재산 분배 자문',
        '대응방안 제시'
      ]
    },
    {
      id: 'will-drafting',
      title: '유언장 작성 자문',
      description: '본인 사후 재산처분을 위한 유언장 작성 시 법적 효력 요건 충족 방법 안내, 자필증서유언·공증유언 등 형식 요건 조언 및 문안 작성',
      icon: FileText,
      price: 500000,
      category: '가사',
      preparationTime: '3-5일',
      requirements: ['유언자 신분증(본인 확인)', '재산내역(부동산, 예금 등)', '미성년 자녀, 배우자 존재 여부'],
      features: [
        '유언장 작성 자문',
        '법적 효력 요건 충족',
        '형식 요건 조언',
        '문안 작성'
      ]
    },
    {
      id: 'inheritance-agreement',
      title: '상속재산분할 협의서 작성',
      description: '공동상속인 간 합의 시 상속재산분할 협의서 작성, 부동산, 예금, 동산 등에 대한 분배 내용을 문서화',
      icon: FileText,
      price: 600000,
      category: '가사',
      preparationTime: '2-3일',
      requirements: ['가족관계증명서(상속인 확인)', '재산 목록, 부동산 등기부 등본, 예금 내역'],
      features: [
        '상속재산분할 협의서 작성',
        '재산 분배 내용 문서화',
        '법적 효력 확보',
        '분쟁 예방'
      ]
    },
    {
      id: 'inheritance-renunciation',
      title: '상속포기/한정승인 신청',
      description: '상속인이 채무 부담 회피 위해 상속포기나 한정승인 법원 신청, 기한 내 신청서·관계 서류 제출',
      icon: FileText,
      price: 300000,
      category: '가사',
      preparationTime: '1-2개월',
      requirements: ['피상속인 사망진단서, 가족관계증명서', '부채 및 재산목록(채무 유무 증빙)'],
      features: [
        '상속포기/한정승인 신청',
        '기한 내 신청서 제출',
        '관계 서류 준비',
        '법원 제출'
      ]
    },
    {
      id: 'inheritance-petition',
      title: '상속재산분할 청구 소장 작성',
      description: '상속인 간 합의 불가 시 가정법원 분할심판 청구 소장 작성, 구체적 분할방식·사유 기재',
      icon: FileText,
      price: 1000000,
      category: '가사',
      preparationTime: '3-7일',
      requirements: ['가족관계증명서, 재산 목록', '타 상속인 주소 및 인적사항'],
      features: [
        '분할심판 청구 소장 작성',
        '분할방식·사유 기재',
        '법적 근거 제시',
        '법원 제출'
      ]
    },
    {
      id: 'legitimate-share-petition',
      title: '유류분 반환청구 소장 작성',
      description: '특정 상속인 과다 수증(생전 증여, 유증 등) 시 유류분 부족분 반환청구, 법정상속분 일정비율 확보 목적',
      icon: FileText,
      price: 1000000,
      category: '가사',
      preparationTime: '3-7일',
      requirements: ['피상속인 생전 증여 자료(등기, 통장, 계약서 등)', '가족관계증명서, 상대방 인적사항'],
      features: [
        '유류분 반환청구 소장 작성',
        '과다 수증 입증',
        '법정상속분 확보',
        '법원 제출'
      ]
    },
    {
      id: 'inheritance-court-attendance',
      title: '상속 관련 조정/재판 출석 대리',
      description: '가사조정·재판기일 출석해 상속분쟁 대리(회당), 상속재산분할, 유류분 반환 등 조정·재판 변론',
      icon: Gavel,
      price: 300000,
      category: '가사',
      preparationTime: '30분-1시간',
      requirements: ['소장·답변서·증거 자료', '합의안(조정 시), 재산분할안'],
      features: [
        '조정·재판 기일 출석',
        '상속분쟁 대리',
        '조정·재판 변론',
        '법적 권리 보호'
      ]
    },
    // 부동산 (부동산거래·임대차·건설) - 부동산 거래/계약
    {
      id: 'real-estate-consultation',
      title: '부동산 법률 상담',
      description: '매매, 임대차, 개발사업 등 1시간 이내 초기 상담',
      icon: Gavel,
      price: 110000,
      category: '부동산',
      preparationTime: '1시간',
      requirements: ['등기부등본, 계약서 초안(있는 경우)', '물건 표시(주소 등)'],
      features: [
        '1시간 이내 상담',
        '등기부 확인',
        '계약서 조항 해석',
        '분쟁 소지 사전 점검'
      ]
    },
    {
      id: 'real-estate-contract-review',
      title: '부동산 매매계약서 검토',
      description: '주택·상가 등 부동산 매매계약서 초안 법률 검토',
      icon: FileText,
      price: 500000,
      category: '부동산',
      preparationTime: '2-3일',
      requirements: ['매매계약서 초안', '등기부등본, 부동산 물건 사진(또는 설명)'],
      features: [
        '특약사항 검토',
        '대금 지급일정 확인',
        '위약벌 조항 검토',
        '권리관계(근저당 등) 확인'
      ]
    },
    // 노동 (노무·고용) - 노무 자문 및 문서 지원
    {
      id: 'labor-consultation',
      title: '노동법률 상담',
      description: '해고, 임금체불, 산업재해 등 노동분쟁 전반 1시간 이내 상담',
      icon: Gavel,
      price: 110000,
      category: '노동',
      preparationTime: '1시간',
      requirements: ['사업장/근로자 기본정보', '계약서, 임금 내역, 해고 통보 등 관련자료'],
      features: [
        '1시간 이내 상담',
        '근로기준법, 산재보험법 등 관련 법령 자문',
        '권리관계 검토',
        '대응 방안 안내'
      ]
    },
    {
      id: 'labor-contract',
      title: '근로계약서 작성/검토',
      description: '신규채용·계약 갱신 시 근로계약서 작성 or 기존 계약서 검토',
      icon: FileText,
      price: 300000,
      category: '노동',
      preparationTime: '1-3일',
      requirements: ['사업장 정보(근로조건, 임금 지급방법 등)', '기존 계약서(검토 시)'],
      features: [
        '임금, 근로시간, 직무내용 정리',
        '비밀유지 등 법정 필수사항 충족',
        '계약서 작성/검토',
        '법적 요건 확인'
      ]
    },
    // 행정 (행정처분·행정소송) - 행정심판 및 행정절차 단계
    {
      id: 'administrative-consultation',
      title: '행정 처분 상담',
      description: '허가취소, 과태료 부과 등 행정처분, 인허가 신청 문제 등 초기 상담(1시간), 처분의 위법성 여부, 대응 전략(행정심판 vs 행정소송) 자문',
      icon: Gavel,
      price: 110000,
      category: '행정',
      preparationTime: '1시간',
      requirements: ['행정처분 통지서, 인허가 관련 서류', '사실관계 정리 자료'],
      features: [
        '1시간 이내 상담',
        '처분의 위법성 여부 검토',
        '대응 전략 자문',
        '법적 조언'
      ]
    },
    {
      id: 'administrative-appeal',
      title: '행정심판 청구서 작성',
      description: '부당/위법 처분에 대해 행정심판 청구서 작성, 처분 경위, 위법 사유, 요구 사항 등 법적 근거와 함께 기재',
      icon: FileText,
      price: 800000,
      category: '행정',
      preparationTime: '3-7일',
      requirements: ['처분 통지서', '관련 증거자료(허가 취소 사유 반박자료 등)'],
      features: [
        '행정심판 청구서 작성',
        '처분 경위 정리',
        '위법 사유 분석',
        '법적 근거 제시'
      ]
    },
    {
      id: 'administrative-appeal-representation',
      title: '행정심판 대리',
      description: '행정심판 전 과정 대리(의견서 제출, 구두변론 등), 행정심판위원회 심리기일 출석',
      icon: Gavel,
      price: 700000,
      category: '행정',
      preparationTime: '60-90일',
      requirements: ['행정심판 청구서 초안', '추가 증거자료'],
      features: [
        '행정심판 전 과정 대리',
        '의견서 제출',
        '구두변론 수행',
        '심리기일 출석'
      ]
    },
    {
      id: 'license-appeal',
      title: '운전면허 구제(행정심판)',
      description: '음주운전 등으로 면허 취소/정지된 경우 행정심판으로 구제 노력, 청구서 작성, 경찰 의견진술기회 참석 등',
      icon: FileText,
      price: 500000,
      category: '행정',
      preparationTime: '60-90일',
      requirements: ['면허취소 통지서', '음주측정 결과, 정상참작 사유(생계곤란 등)'],
      features: [
        '면허 구제 청구서 작성',
        '경찰 의견진술기회 참석',
        '정상참작 사유 제시',
        '행정심판 진행'
      ]
    },
    {
      id: 'industrial-accident-appeal',
      title: '산재 신청·이의신청 대행',
      description: '업무상 재해 근로자의 산재보상금 신청(근로복지공단), 승인 거부 시 이의신청 절차 대행',
      icon: FileText,
      price: 800000,
      category: '행정',
      preparationTime: '수개월',
      requirements: ['재해경위서, 진단서 등 의학적 기록', '근로계약서, 출퇴근기록(업무상 재해 입증용)'],
      features: [
        '산재보상금 신청',
        '이의신청 절차 대행',
        '의학적 기록 검토',
        '근로관계 입증'
      ]
    },
    // 행정 (행정처분·행정소송) - 행정소송 단계
    {
      id: 'administrative-litigation-petition',
      title: '행정소송 소장 작성',
      description: '행정심판 결과 불복 or 바로 법원 판단 원하는 경우 행정소송 소장 작성, 취소 대상 처분, 위법 사유, 입증 계획 등을 체계적으로 기재',
      icon: FileText,
      price: 1000000,
      category: '행정',
      preparationTime: '3-7일',
      requirements: ['행정심판 재결서(있는 경우)', '처분 통지서, 증거 자료(사진, 문서 등)'],
      features: [
        '행정소송 소장 작성',
        '취소 대상 처분 정리',
        '위법 사유 분석',
        '입증 계획 수립'
      ]
    },
    {
      id: 'administrative-litigation-representation',
      title: '행정소송 절차 대리',
      description: '행정법원 1심 전체 과정을 대리(소장·준비서면·법정변론 등 일괄), 복잡한 사건은 성공보수 별도 협의',
      icon: Gavel,
      price: 1500000,
      category: '행정',
      preparationTime: '6개월-1년',
      requirements: ['소장·준비서면', '각종 증거자료 및 전문자료(감정서 등 필요 시)'],
      features: [
        '행정소송 전 과정 대리',
        '소장·준비서면 작성',
        '법정변론 수행',
        '증거자료 관리'
      ]
    },
    {
      id: 'administrative-court-attendance',
      title: '행정소송 법원 출석(회당)',
      description: '행정재판 기일에 변호사 출석 변론(회당 비용), 주로 취소소송에서 처분 위법성, 절차 하자 등 주장',
      icon: Gavel,
      price: 300000,
      category: '행정',
      preparationTime: '30분',
      requirements: ['제출된 준비서면', '참고자료(행정처분 법령, 관련 판례 등)'],
      features: [
        '재판 기일 출석',
        '처분 위법성 주장',
        '절차 하자 지적',
        '변론 수행'
      ]
    },
    {
      id: 'suspension-request',
      title: '집행정지 신청',
      description: '행정소송 중 처분 효력을 잠정 중지시키기 위한 신청서 작성, 긴급성(회복 어려운 손해)을 주장해 법원에 임시중지 결정 요청',
      icon: FileText,
      price: 600000,
      category: '행정',
      preparationTime: '3-5일',
      requirements: ['처분 통지서', '긴급성·손해 입증자료(재정 악화 등)'],
      features: [
        '집행정지 신청서 작성',
        '긴급성 주장',
        '손해 입증',
        '임시중지 결정 요청'
      ]
    },
    {
      id: 'administrative-follow-up',
      title: '행정 심판/소송 결과 후속조치',
      description: '인용 결정 후 면허 재발급 신청 등 후속 행정절차 대행, 취소된 처분에 대한 행정청 재처분 대응',
      icon: FileText,
      price: 300000,
      category: '행정',
      preparationTime: '1-2주',
      requirements: ['행정심판 재결서·법원 판결문', '후속 행정 신청 서류'],
      features: [
        '후속 행정절차 대행',
        '면허 재발급 신청',
        '재처분 대응',
        '결과 실행 지원'
      ]
    },
    // 기타 서비스
    {
      id: 'legal-document-review',
      title: '법률 문서 검토',
      description: '계약서 및 법률 문서를 전문가가 꼼꼼히 검토해 드립니다.',
      icon: Scroll,
      price: 120000,
      category: '기타',
      preparationTime: '4일',
      requirements: ['검토할 문서', '주요 관심사항'],
      features: [
        '문서 상세 검토',
        '위험 요소 분석',
        '개선 제안',
        '수정안 제시'
      ]
    },
    // 기업 (상사/기업법무) - 회사 설립·운영 지원
    {
      id: 'company-incorporation',
      title: '회사 설립 대행',
      description: '주식회사 설립 절차 일괄 대행 (정관·주주총회 의사록·임원 선임서류·등기신청), 등록세 등 실비 별도',
      icon: FileText,
      price: 1000000,
      category: '기업',
      preparationTime: '1-2주',
      requirements: ['설립할 회사 정보(회사명, 목적 등)', '발기인/주주 신분증 사본', '자본금 납입 증명(은행확인서)'],
      features: [
        '정관 작성',
        '주주총회 의사록 작성',
        '임원 선임서류 작성',
        '등기신청 대행'
      ]
    },
    {
      id: 'articles-amendment',
      title: '정관 작성·변경',
      description: '신규/기존 정관을 상법·세법 요건에 부합하도록 작성/수정, 회사 목적, 주식, 이사회 규정 등 정비로 분쟁 예방 및 거버넌스 강화',
      icon: FileText,
      price: 500000,
      category: '기업',
      preparationTime: '3-5일',
      requirements: ['회사 현황(주주구성, 목적, 경영방침 등)', '기존 정관(변경 시)'],
      features: [
        '정관 작성/수정',
        '상법·세법 요건 충족',
        '거버넌스 강화',
        '분쟁 예방'
      ]
    },
    {
      id: 'meeting-minutes',
      title: '주주총회·이사회 의사록 작성',
      description: '주주총회·이사회 결의에 필요한 의사록 작성, 의결정족수, 특별결의사항 반영, 분쟁 발생 시 증빙 가능',
      icon: FileText,
      price: 300000,
      category: '기업',
      preparationTime: '1-2일',
      requirements: ['결의하려는 안건(정관 변경, 임원 선임 등)', '회사 등기부등본, 기존 회의록 자료'],
      features: [
        '의사록 작성',
        '의결정족수 반영',
        '특별결의사항 기재',
        '증빙 가능성 확보'
      ]
    },
    {
      id: 'stock-transfer',
      title: '주식양도 계약서 작성',
      description: '비상장 주식 양도/양수 시 계약서 작성, 양도대금, 지급일, 담보책임 등 명확히 규정하여 분쟁 예방',
      icon: FileText,
      price: 500000,
      category: '기업',
      preparationTime: '2-3일',
      requirements: ['대상 주식 정보(발행주식 수, 액면가 등)', '양도인·양수인 인적사항, 대금 산정 근거'],
      features: [
        '주식양도 계약서 작성',
        '양도대금·지급일 명시',
        '담보책임 규정',
        '분쟁 예방'
      ]
    },
    {
      id: 'corporate-legal-advice',
      title: '회사 법무 관리 자문',
      description: '중소기업 대상 인사·총무 규정 정비, 각종 신고의무 이행 자문 (1회성), 내부 통제·컴플라이언스 점검',
      icon: Gavel,
      price: 300000,
      category: '기업',
      preparationTime: '1-2주',
      requirements: ['회사 조직도, 기존 규정(취업규칙 등)', '최근 법령 준수 여부 현황'],
      features: [
        '인사·총무 규정 정비',
        '신고의무 이행 자문',
        '내부 통제 점검',
        '컴플라이언스 점검'
      ]
    },
    // 기업 (상사/기업법무) - 계약 및 거래 문서 서비스
    {
      id: 'nda-drafting',
      title: '비밀유지계약(NDA) 작성·검토',
      description: '거래 전 기밀정보 보호 위한 비밀유지계약서 작성/검토, 정보 범위, 예외사항, 위반 시 제재조항 등 명확화',
      icon: FileText,
      price: 300000,
      category: '기업',
      preparationTime: '1-2일',
      requirements: ['NDA 목적(프로젝트 개요)', '기존 NDA 초안(검토 시)'],
      features: [
        'NDA 작성/검토',
        '정보 범위 명확화',
        '예외사항 규정',
        '제재조항 설정'
      ]
    },
    {
      id: 'mou-drafting',
      title: '양해각서(MOU) 작성',
      description: '사업 협력·투자 논의 단계 잠정 합의사항 정리, 법적 구속력 범위 명확화, 추후 본계약 체결 전 단계 문서',
      icon: FileText,
      price: 500000,
      category: '기업',
      preparationTime: '2-3일',
      requirements: ['MOU 체결 목적, 각자 역할', '기본 합의 내용(투자금, 일정 등)'],
      features: [
        'MOU 작성',
        '합의사항 정리',
        '법적 구속력 명확화',
        '본계약 준비'
      ]
    },
    {
      id: 'supply-contract',
      title: '제품·용역 공급계약서 작성',
      description: '기업 간 물품공급·용역계약 체결 시 계약서 작성, 대금, 납품일정, 품질보증, 손해배상 등 상거래 핵심 조항 분쟁 없이 명시',
      icon: FileText,
      price: 800000,
      category: '기업',
      preparationTime: '3-5일',
      requirements: ['공급 대상 물품/용역 내용(스펙, 단가 등)', '거래 조건(대금지급 방식, 기한 등)'],
      features: [
        '공급계약서 작성',
        '대금·납품일정 명시',
        '품질보증 규정',
        '손해배상 조항'
      ]
    },
    {
      id: 'subcontract-review',
      title: '하도급 계약서 검토',
      description: '제조·건설 등 하도급 계약서 법률 검토, 하도급법 및 관련 법령 위반 여부, 불공정 조항 여부, 수정 권고',
      icon: FileText,
      price: 500000,
      category: '기업',
      preparationTime: '2-3일',
      requirements: ['하도급 계약서 초안', '사업 내용(공사 범위, 단가, 납기 등)'],
      features: [
        '하도급 계약서 검토',
        '법령 위반 여부 확인',
        '불공정 조항 점검',
        '수정 권고'
      ]
    },
    {
      id: 'franchise-review',
      title: '프랜차이즈 가맹계약서 검토',
      description: '가맹본부·가맹점 간 가맹계약서 검토, 가맹비, 로열티, 영업지역 제한, 계약해지 조항 등 불리한 조항 여부 점검',
      icon: FileText,
      price: 600000,
      category: '기업',
      preparationTime: '3-5일',
      requirements: ['가맹계약서 초안', '본부 제시 FDD(Disclosure Document)'],
      features: [
        '가맹계약서 검토',
        '가맹비·로열티 검토',
        '영업지역 제한 검토',
        '계약해지 조항 점검'
      ]
    },
    // 기업 (상사/기업법무) - 기업 자문 및 기타
    {
      id: 'legal-counsel',
      title: '정기 법률고문 계약',
      description: '월 1,000,000원 정액 고문료, 매월 일정 시간 법률상담, 간단 계약서 검토, 사내 의사결정 자문, 별도 사건 발생 시 우대료 적용 가능',
      icon: Gavel,
      price: 1000000,
      category: '기업',
      preparationTime: '매월',
      requirements: ['회사 기본 현황(규모, 업종 등)', '필요 자문 범위(인사, 계약, 분쟁 등)'],
      features: [
        '정기 법률상담',
        '계약서 검토',
        '사내 의사결정 자문',
        '우대료 적용'
      ]
    },
    {
      id: 'mna-advice',
      title: '인수합병(M&A) 법률자문',
      description: '기업 인수·합병 거래 법률실사 및 계약 자문, 주식매매계약(SPA) 검토, Due Diligence(재무·법적 리스크 조사), 계약 체결 지원 등 일괄 수행',
      icon: Gavel,
      price: 5000000,
      category: '기업',
      preparationTime: '수주-수개월',
      requirements: ['회사 재무제표, 계약관계, 지분구조 등', '매도·매수 측 협상 자료'],
      features: [
        '법률실사 수행',
        'SPA 검토',
        'Due Diligence',
        '계약 체결 지원'
      ]
    },
    {
      id: 'official-letter',
      title: '각종 공문·통지 작성',
      description: '거래처·협력사에 발송할 내용증명이나 통지서 초안 작성, 계약 해지 통보, 시정요청 등 대외 공식서신을 법률적으로 타당하게 작성',
      icon: FileText,
      price: 200000,
      category: '기업',
      preparationTime: '2-3일',
      requirements: ['발송 목적(계약 해지, 시정요청 등)', '상대방 정보, 거래 내역'],
      features: [
        '공문·통지 작성',
        '법률적 타당성 검토',
        '계약 해지 통보',
        '시정요청 작성'
      ]
    },
    {
      id: 'dispute-advice',
      title: '분쟁 발생 시 대응 자문',
      description: '거래 분쟁·클레임 발생 시 초기 법률자문, 상대방 주장 타당성 검토, 중재·소송 등 대응 방안 안내',
      icon: Gavel,
      price: 300000,
      category: '기업',
      preparationTime: '1-2일',
      requirements: ['분쟁 관련 계약서, 서신, 거래내역', '상대방 주장의 요지'],
      features: [
        '초기 법률자문',
        '주장 타당성 검토',
        '대응 방안 안내',
        '분쟁 해결 지원'
      ]
    },
    // 지식재산권 (IP) - 권리 취득/등록
    {
      id: 'trademark-application',
      title: '상표 출원 대행',
      description: '브랜드명·로고 상표권 출원, 등록 가능성 사전검토 후 특허청 전자출원, 출원~등록 결정 시까지 진행상황 관리 (1건 기준, 관청 수수료 별도)',
      icon: FileText,
      price: 500000,
      category: '지식재산권',
      preparationTime: '6-12개월',
      requirements: ['상표 도안, 명칭(워딩)', '사용 상품/서비스 분류 정보'],
      features: [
        '상표권 출원',
        '등록 가능성 검토',
        '전자출원 대행',
        '진행상황 관리'
      ]
    },
    {
      id: 'copyright-registration',
      title: '저작권 등록 대행',
      description: '창작물(문서, 프로그램, 영상 등)에 대한 저작권 등록 신청, 한국저작권위원회 등록, 등록증 발급 안내',
      icon: FileText,
      price: 300000,
      category: '지식재산권',
      preparationTime: '1-2개월',
      requirements: ['저작물 원본 또는 견본', '저작자 신분증(개인) 또는 사업자등록증(법인)'],
      features: [
        '저작권 등록 신청',
        '등록증 발급 안내',
        '창작물 보호',
        '법적 권리 확보'
      ]
    },
    {
      id: 'design-application',
      title: '디자인권 출원 대행',
      description: '제품 디자인 보호 위한 디자인등록 출원, 도면 작성 자문, 디자인 설명서, 특허청 출원 대행',
      icon: FileText,
      price: 600000,
      category: '지식재산권',
      preparationTime: '6-12개월',
      requirements: ['디자인 도안(6면도 등)', '디자인 설명 자료, 적용 물품 사진'],
      features: [
        '디자인등록 출원',
        '도면 작성 자문',
        '디자인 설명서 작성',
        '출원 대행'
      ]
    },
    // 지식재산권 (IP) - 침해 대응 및 분쟁 해결
    {
      id: 'ip-warning',
      title: '지재권 침해 경고장 작성',
      description: '특허·상표·저작권 등 침해행위 중단 요청 내용증명 작성, 발송, 침해 행위 및 권리 보유 사실, 손해배상 청구 가능성 고지',
      icon: FileText,
      price: 500000,
      category: '지식재산권',
      preparationTime: '2-3일',
      requirements: ['권리등록증(특허등록증, 상표등록증 등) 또는 저작권 증빙', '침해 사실 입증자료(제품 사진, 인터넷 캡처 등)'],
      features: [
        '경고장 작성',
        '침해행위 중단 요청',
        '권리 보유 사실 고지',
        '손해배상 청구 가능성 고지'
      ]
    },
    {
      id: 'ip-injunction',
      title: '침해 금지 가처분 신청서 작성',
      description: '시급한 지재권 침해(불법 복제·도용 등)에 대해 제품 생산·판매 중지 가처분 신청, 권리 범위, 침해 사실, 긴급성·회복 어려운 손해 주장',
      icon: FileText,
      price: 1000000,
      category: '지식재산권',
      preparationTime: '5-7일',
      requirements: ['권리등록증', '침해 제품/서비스 증거'],
      features: [
        '가처분 신청서 작성',
        '생산·판매 중지 요청',
        '권리 범위 주장',
        '침해 사실 입증'
      ]
    },
    {
      id: 'ip-lawsuit',
      title: '지재권 침해 소송 소장 작성',
      description: '특허·상표·저작권 침해 손해배상 청구소송 제기 시 소장 작성, 권리 존재, 침해 사실, 손해액 산정, 청구원인 구성',
      icon: FileText,
      price: 1000000,
      category: '지식재산권',
      preparationTime: '7-10일',
      requirements: ['권리등록증', '침해행위 관련 증거(매출 규모, 유통경로 등)', '손해액 추산 자료'],
      features: [
        '소장 작성',
        '권리 존재 입증',
        '침해 사실 주장',
        '손해액 산정'
      ]
    },
    {
      id: 'ip-mediation',
      title: 'IP 분쟁 조정 신청 대행',
      description: '한국저작권위원회 등에서 운영하는 분쟁조정 제도 활용, 조정신청서 작성, 상대방과 합의 도출 지원',
      icon: Gavel,
      price: 700000,
      category: '지식재산권',
      preparationTime: '12개월',
      requirements: ['분쟁 대상 저작권/상표/특허 증빙', '상대방 정보, 피해 규모'],
      features: [
        '조정 신청 대행',
        '조정신청서 작성',
        '합의 도출 지원',
        '분쟁 해결 지원'
      ]
    },
    // 지식재산권 (IP) - 라이선스 및 기타 계약
    {
      id: 'license-agreement',
      title: '라이선스 계약서 작성·검토',
      description: '특허, 상표, 저작권 등 사용권(라이선스) 계약서 작성/검토, 범위, 로열티, 기간, 해지 조항 등 권리자·사용자 간 이해관계 균형',
      icon: FileText,
      price: 800000,
      category: '지식재산권',
      preparationTime: '3-5일',
      requirements: ['라이선스 대상 IP 권리증(특허증 등)', '사용 범위, 로열티 조건'],
      features: [
        '라이선스 계약서 작성/검토',
        '사용 범위 명확화',
        '로열티 조건 설정',
        '해지 조항 정리'
      ]
    },
    {
      id: 'tech-transfer',
      title: '공동개발/기술이전 계약 자문',
      description: '기업 간 공동기술개발, 산학협력, 기술이전 등 계약 자문, 지재권 귀속, 비밀유지, 개발 성과 공유 등 핵심조항 협의',
      icon: Gavel,
      price: 800000,
      category: '지식재산권',
      preparationTime: '1-2주',
      requirements: ['공동개발 또는 기술이전 개요', '기존 개발 성과 자료, 지분·이익분배 방안'],
      features: [
        '계약 자문',
        '지재권 귀속 협의',
        '비밀유지 조항 검토',
        '성과 공유 방안 수립'
      ]
    },
    {
      id: 'publicity-rights',
      title: '퍼블리시티권/초상권 사용 동의서 작성',
      description: '연예인·유명인·일반인 초상, 성명 사용 동의서 작성, 사용 범위·기간·대가·2차 활용 여부 등 구체적 명시',
      icon: FileText,
      price: 300000,
      category: '지식재산권',
      preparationTime: '1-2일',
      requirements: ['초상권·성명권 주체(모델) 인적사항', '사용하려는 매체(광고, 홈페이지 등)'],
      features: [
        '사용 동의서 작성',
        '사용 범위 명시',
        '기간·대가 설정',
        '2차 활용 조건 정리'
      ]
    }
  ];
  
  const categories = ['전체', '민사', '형사', '가사', '부동산', '노동', '행정', '기타'];
  
  const filteredServices = services.filter(service => {
    const matchCategory = activeCategory === '전체' || service.category === activeCategory;
    const matchSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });
  
  const addToCart = (service: Service) => {
    toast.success(`${service.title}이(가) 장바구니에 추가되었습니다.`);
  };
  
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);
  };

  const steps = [
    {
      title: '회원가입 및 요금제 선택',
      description: '간단한 회원가입 후, 단일/패키지/월정액 요금제 중 선택',
      icon: <UserPlus className="w-6 h-6" />,
      details: [
        '간단한 회원가입 절차',
        '단일/패키지/월정액 요금제 선택',
        '다양한 결제 수단 지원'
      ]
    },
    {
      title: '사건 정보 입력',
      description: '사건 유형 선택 및 당사자 정보, 사건 내용 입력',
      icon: <FileText className="w-6 h-6" />,
      details: [
        '사건 유형 선택 (사기, 명예훼손, 폭행 등)',
        '당사자 정보 입력',
        '사건 내용 상세 설명'
      ]
    },
    {
      title: '증거자료 업로드',
      description: '사진, 문서, 영상, 음성 등 다양한 증거자료 업로드',
      icon: <Upload className="w-6 h-6" />,
      details: [
        '다양한 파일 형식 지원',
        '증거자료 설명 추가',
        '클라우드 보안 저장'
      ]
    },
    {
      title: '전문변호사 소장 작성',
      description: '사건 유형에 맞춘 최적화된 소장 작성',
      icon: <Gavel className="w-6 h-6" />,
      details: [
        '사건 유형별 최적화 작성',
        '변호사 직접 작성',
        '요금제별 수정 횟수 제공'
      ]
    },
    {
      title: '문서 출력 및 제출',
      description: '완성된 소장 PDF 다운로드 및 제출 서비스',
      icon: <Printer className="w-6 h-6" />,
      details: [
        'PDF 형식 다운로드/인쇄',
        '제출 서비스 제공',
        '사건 진행 상황 추적'
      ]
    }
  ];

  const legalProcesses = {
    '형사': {
      steps: [
        {
          title: '경찰 조사 단계',
          description: '초동수사 및 혐의 인정여부 결정',
          subSteps: [
            {
              title: '고소/고발 접수',
              description: '피해자, 제3자, 기관 등이 고소·고발서 제출',
              services: [
                { name: '형사 사건 상담', price: '110,000원', duration: '1시간' },
                { name: '고소장 작성', price: '500,000원', duration: '2-3일' },
                { name: '고소장 접수 대행', price: '200,000원', duration: '1일' }
              ]
            },
            {
              title: '수사 개시 및 피의자 신분 전환',
              description: '혐의가 특정되면 해당 인물을 피의자로 입건',
              services: [
                { name: '피의자 조사 입회', price: '300,000원', duration: '1회당' },
                { name: '체포/구속 긴급대응', price: '500,000원', duration: '1회' }
              ]
            },
            {
              title: '수사 종결',
              description: '송치 또는 불송치 결정',
              services: [
                { name: '합의금 협상', price: '500,000원', duration: '1-2일' },
                { name: '합의서 작성', price: '300,000원', duration: '1일' }
              ]
            }
          ]
        },
        {
          title: '검찰 조사 단계',
          description: '보완수사 및 기소 여부 최종 결정',
          subSteps: [
            {
              title: '사건 송치',
              description: '경찰 수사 후 검찰 송치',
              services: [
                { name: '검찰 조사 입회', price: '300,000원', duration: '1회당' },
                { name: '구속영장실질심사 변호', price: '1,000,000원', duration: '1회' }
              ]
            },
            {
              title: '검찰 보완수사',
              description: '필요 시 검사 직접조사, 추가 증거수집',
              services: [
                { name: '보석 신청', price: '500,000원', duration: '1-2일' },
                { name: '피해자와 합의 대리', price: '500,000원', duration: '1-2일' }
              ]
            }
          ]
        },
        {
          title: '공판(법원) 단계',
          description: '유무죄 및 형량 판단',
          subSteps: [
            {
              title: '공판 준비',
              description: '기소 후 재판부가 첫 기일 지정',
              services: [
                { name: '형사 공판 준비', price: '300,000원', duration: '1-2일' },
                { name: '탄원서/반성문 작성', price: '200,000원', duration: '1일' }
              ]
            },
            {
              title: '공판 절차',
              description: '법정에서 증거조사, 증인신문 등 실시',
              services: [
                { name: '형사 재판 출석 변호', price: '300,000원', duration: '1회당' },
                { name: '양형자료 수집·제출', price: '300,000원', duration: '1-2일' }
              ]
            },
            {
              title: '판결 및 상소',
              description: '유죄·무죄 및 형량 결정, 항소·상고 가능',
              services: [
                { name: '항소이유서 작성', price: '800,000원', duration: '3-5일' },
                { name: '상고이유서 작성', price: '1,000,000원', duration: '5-7일' }
              ]
            }
          ]
        }
      ]
    },
    '민사': {
      steps: [
        {
          title: '소송 전 단계',
          description: '분쟁 발생 시 초기 협의·조정',
          subSteps: [
            {
              title: '초기 협의',
              description: '자율합의 모색',
              services: [
                { name: '민사 분쟁 상담', price: '110,000원', duration: '1시간' },
                { name: '내용증명 작성', price: '300,000원', duration: '1-2일' }
              ]
            },
            {
              title: '조정·중재',
              description: '조정위원회나 중재원 활용',
              services: [
                { name: '합의 협상 대리', price: '500,000원', duration: '1-2일' },
                { name: '합의서 작성', price: '300,000원', duration: '1일' }
              ]
            }
          ]
        },
        {
          title: '소송 단계',
          description: '소장 작성부터 판결까지',
          subSteps: [
            {
              title: '소장 작성 및 접수',
              description: '청구원인·청구취지 기재',
              services: [
                { name: '소장 작성', price: '1,000,000원', duration: '3-5일' },
                { name: '답변서 작성', price: '800,000원', duration: '3-5일' }
              ]
            },
            {
              title: '변론 준비',
              description: '쟁점·증거 정리',
              services: [
                { name: '준비서면 작성', price: '500,000원', duration: '2-3일' },
                { name: '가처분 신청', price: '700,000원', duration: '2-3일' }
              ]
            },
            {
              title: '증거조사',
              description: '증인신문, 감정 등',
              services: [
                { name: '민사 재판 출석', price: '300,000원', duration: '1회당' },
                { name: '증인신문 대비', price: '500,000원', duration: '1-2일' }
              ]
            }
          ]
        }
      ]
    }
  };

  const categoryIcons = {
    '형사': <Gavel className="w-6 h-6" />,
    '민사': <Scale className="w-6 h-6" />,
    '행정': <Building2 className="w-6 h-6" />,
    '가사': <Handshake className="w-6 h-6" />,
    '지재권': <FileText className="w-6 h-6" />,
    '기업': <Shield className="w-6 h-6" />
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        
        {/* 맞춤 서비스 문의 */}
        <div className="bg-legal-light rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-legal-primary mb-4">맞춤 서비스가 필요하신가요?</h2>
          <p className="text-lg text-gray-600 mb-6">
            특별한 요구사항이 있으시다면 전문 법률팀이 귀하의 상황에 맞는 맞춤형 서비스를 설계해 드립니다.
          </p>
          <Button size="lg" className="bg-legal-primary hover:bg-legal-secondary text-white shadow-elegant hover:shadow-premium transition-all">
            견적 문의하기
          </Button>
        </div>

        <Tabs defaultValue="individual" className="w-full">
          <TabsList className="h-14 grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="individual" className="text-base py-3">단건 결제</TabsTrigger>
            <TabsTrigger value="subscription" className="text-base py-3">월간 결제</TabsTrigger>
          </TabsList>
          
          {/* 단건 결제 탭 - 카드형 서비스 목록 */}
          <TabsContent value="individual" className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="서비스 검색..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button 
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    className={activeCategory === category ? "bg-legal-primary text-white" : ""}
                    onClick={() => setActiveCategory(category)}
                    size="sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service) => (
                <Card key={service.id} className={`h-full flex flex-col overflow-hidden border-2 ${service.popular ? 'border-legal-accent' : 'border-gray-200'} transition-all hover:shadow-lg`}>
                  {service.popular && (
                    <div className="bg-legal-accent text-white text-center py-1 text-sm font-medium">
                      인기 서비스
                    </div>
                  )}
                  <CardHeader className={`${service.popular ? 'bg-legal-light' : 'bg-gray-50'}`}>
                    <div className="flex items-center justify-between">
                      <service.icon className="h-8 w-8 text-legal-primary" />
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-2">{service.category}</span>
                        <span className="text-lg font-bold text-legal-primary">{formatPrice(service.price)}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl mt-4">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 flex-grow">
                    <div className="space-y-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold">{formatPrice(service.price)}</span>
                        <span className="text-gray-500">원</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <p>소요시간: {service.preparationTime}</p>
                        <p>필요서류: {service.requirements.join(', ')}</p>
                      </div>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-legal-success" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4 border-t">
                    <div className="flex gap-4 w-full">
                      <Button 
                        variant="outline" 
                        className="w-1/2 border-legal-primary text-legal-primary hover:bg-legal-primary hover:text-white"
                        onClick={() => {}}
                      >
                        상세 보기
                      </Button>
                      <Button 
                        className="w-1/2 bg-legal-primary hover:bg-legal-secondary text-white"
                        onClick={() => addToCart(service)}
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        담기
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* 월간 결제 탭 - 기존 Pricing 콘텐츠 */}
          <TabsContent value="subscription">
            <div className="mb-8 inline-flex bg-gray-100 p-1 rounded-full">
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  billingPeriod === 'monthly'
                    ? 'bg-white shadow-sm text-legal-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setBillingPeriod('monthly')}
              >
                월간 결제
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  billingPeriod === 'yearly'
                    ? 'bg-white shadow-sm text-legal-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setBillingPeriod('yearly')}
              >
                연간 결제 (10% 할인)
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => {
                const price = billingPeriod === 'yearly' 
                  ? Math.round(plan.price * 12 * 0.9) 
                  : plan.price;
                
                return (
                  <div 
                    key={index} 
                    className={`border rounded-xl overflow-hidden transition-all ${
                      plan.popular 
                        ? 'border-legal-accent shadow-lg transform md:-translate-y-4' 
                        : 'border-gray-200 hover:shadow-md'
                    }`}
                  >
                    {plan.popular && (
                      <div className="bg-legal-accent text-white text-center py-2 text-sm font-medium">
                        가장 인기 있는 요금제
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                      <div className="text-gray-500 mb-4 h-12">{plan.description}</div>
                      
                      <div className="flex items-baseline mb-6">
                        <span className="text-3xl font-bold">{price.toLocaleString()}</span>
                        <span className="text-gray-500 ml-1">원</span>
                        {plan.unit && <span className="text-gray-500 ml-1">/{billingPeriod === 'monthly' ? plan.unit : '년'}</span>}
                      </div>
                      
                      <div className="space-y-3 mb-8">
                        {plan.features.map((feature, i) => (
                          <div key={i} className="flex items-start">
                            <Check className="h-5 w-5 text-legal-success mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Link to="/register">
                        <Button 
                          className={`w-full ${
                            plan.popular 
                              ? 'bg-legal-accent hover:bg-legal-primary' 
                              : 'bg-legal-primary hover:bg-legal-secondary'
                          } text-white`}
                        >
                          선택하기
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-center mb-8">요금제 비교</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-4 px-6 text-left text-gray-600 font-medium border-b">기능</th>
                      {plans.map((plan, index) => (
                        <th key={index} className="py-4 px-6 text-center border-b">
                          <span className="text-legal-primary font-bold">{plan.name}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((feature, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="py-3 px-6 border-b">
                          <div className="flex items-center">
                            <span>{feature.name}</span>
                            {feature.tooltip && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <HelpCircle className="h-4 w-4 text-gray-400 ml-1" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">{feature.tooltip}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </td>
                        {plans.map((plan, planIndex) => (
                          <td key={planIndex} className="py-3 px-6 text-center border-b">
                            {feature.availability[planIndex] === true ? (
                              <Check className="h-5 w-5 text-legal-success mx-auto" />
                            ) : feature.availability[planIndex] === false ? (
                              <span className="text-gray-300">-</span>
                            ) : (
                              <span>{feature.availability[planIndex]}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* FAQ / 환불정책 / 기업고객 */}
        <div className="mt-12 max-w-3xl mx-auto">
          <Tabs defaultValue="faq">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="faq">자주 묻는 질문</TabsTrigger>
              <TabsTrigger value="refund">환불 정책</TabsTrigger>
              <TabsTrigger value="enterprise">기업 고객</TabsTrigger>
            </TabsList>
            
            <TabsContent value="faq" className="mt-6 space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="refund" className="mt-6">
              <div className="bg-white border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">환불 정책</h3>
                <ul className="space-y-3 list-disc pl-5">
                  <li>단건 요금제: 소장 검수 전 100% 환불, 검수 후 환불 불가</li>
                  <li>패키지 요금제: 첫 소장 검수 전 100% 환불, 첫 검수 후 50% 환불, 두 번째 검수 후 환불 불가</li>
                  <li>월정액 요금제: 서비스 이용 7일 이내 전액 환불 가능 (단, 소장 작성 이력이 없는 경우에 한함)</li>
                  <li>모든 환불 요청은 고객센터를 통해 접수해주시기 바랍니다.</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="enterprise" className="mt-6">
              <div className="bg-white border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">기업 고객을 위한 맞춤형 요금제</h3>
                <p className="mb-4">
                  법무법인, 기업 법무팀, 공공기관 등을 위한 맞춤형 요금제를 제공합니다. 
                  대량 사용 할인, API 연동, 전용 고객 관리자 지정 등의 혜택을 받아보세요.
                </p>
                <Button className="bg-legal-primary hover:bg-legal-secondary">기업 문의하기</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

const plans = [
  {
    name: "단건",
    description: "개인 사용자를 위한 기본 플랜",
    price: 500000,
    popular: false,
    features: [
      "자동화된 소장 작성",
      "기본 변호사 검수 1회",
      "최대 1회 수정 가능",
      "PDF 다운로드/인쇄",
      "14일 문서 보관"
    ]
  },
  {
    name: "패키지",
    description: "복잡한 사건을 위한 프리미엄 플랜",
    price: 700000,
    popular: true,
    features: [
      "자동화된 소장 작성",
      "심층 변호사 검수",
      "최대 2회 수정 가능",
      "제출 대행 서비스 포함",
      "변호사 전화 상담 (30분)",
      "30일 문서 보관"
    ]
  },
  {
    name: "월정액",
    description: "기업 및 단체를 위한 멤버십",
    price: 800000,
    unit: "월",
    popular: false,
    features: [
      "자동화된 소장 작성",
      "기본 변호사 검수",
      "건당 최대 5회 수정 가능",
      "월 고소장 3건 작성",
      "변호사 자문 1시간/월",
      "90일 문서 보관"
    ]
  }
];

const features = [
  {
    name: "자동화된 소장 작성",
    availability: [true, true, true],
    tooltip: "사건 유형별 맞춤 질문으로 간편하게 소장을 작성합니다."
  },
  {
    name: "변호사 검수",
    availability: ["기본 검수", "심층 검수", "기본 검수"],
    tooltip: "심층 검수는 법리 검토 및 보강 의견을 포함합니다."
  },
  {
    name: "수정 횟수",
    availability: ["1회", "2회", "건당 5회"],
  },
  {
    name: "제출 대행",
    availability: [false, true, "별도 요금"],
    tooltip: "경찰서/검찰청에 소장을 대신 제출해드립니다."
  },
  {
    name: "변호사 상담",
    availability: [false, "30분", "60분/월"],
  },
  {
    name: "문서 보관 기간",
    availability: ["14일", "30일", "90일"],
  },
  {
    name: "월 작성 가능 건수",
    availability: ["1건", "1건", "3건"],
  },
  {
    name: "추가 작성 비용",
    availability: ["50만원/건", "50만원/건", "20만원/건"],
  }
];

const faqs = [
  {
    question: "서비스 이용 후 얼마나 빨리 소장을 받을 수 있나요?",
    answer: "기본 검수는 24시간 이내, 심층 검수는 48시간 이내에 완료됩니다. 급한 경우 긴급 검수 옵션(추가 비용)을 선택하시면 6시간 이내에 검수가 완료됩니다."
  },
  {
    question: "변호사 검수는 어떤 방식으로 이루어지나요?",
    answer: "기본 검수는 형식적 요건과 기본적인 법률 검토를, 심층 검수는 법리 검토 및 보강 의견을 함께 제공합니다. 패키지 요금제의 경우 변호사와의 유선 상담도 포함됩니다."
  },
  {
    question: "추가 수정이 필요한 경우 어떻게 하나요?",
    answer: "요금제별 기본 제공 수정 횟수를 초과할 경우, 건당 추가 비용(10만원)이 발생합니다. 수정 요청은 마이페이지에서 가능합니다."
  },
  {
    question: "제출 대행 서비스는 어떻게 이용하나요?",
    answer: "패키지 요금제에 포함되어 있으며, 작성된 소장을 출력하여 관할 경찰서나 검찰청에 대신 제출해드립니다. 진행 상황은 마이페이지에서 확인 가능합니다."
  }
];

export default PricingPage;

