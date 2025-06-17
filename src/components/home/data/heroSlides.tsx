
import React from 'react';
import { ShieldCheck, Scale, Briefcase, HeartHandshake, CheckCircle, Award, TrendingUp, Landmark, ArrowRight, FileText, Shield, Smartphone } from 'lucide-react';
import { SlideProps } from '../HeroSlide';

export const heroSlides: SlideProps[] = [
  {
    id: 0,
    title: <>
      가장 쉽고 빠른 <br />
      <span className="text-legal-accent">고소장, 소장</span> <br />
      작성 서비스
    </>,
    description: "변호사가 전략적으로 작성하여 정확하고 효과적인 고소장을 간편하게 작성하세요. 변호사가 검토하여 전략적으로 작성하여 고소장의 승소 가능성을 높이고, 시간과 비용을 절약하세요.",
    label: "비용 50% 절감, 시간 80% 단축",
    icon: <ShieldCheck className="h-6 w-6 text-legal-accent" aria-hidden="true" />,
    color: "bg-blue-100 text-legal-accent",
    style: "default" as const
  },
  {
    id: 1,
    title: <>
      고소장 작성, <br />
      <span className="text-navy-700">이렇게 쉽습니다!</span>
    </>,
    description: "단계별 안내만 따르면 전문가 수준의 고소장을 완성할 수 있습니다.",
    label: "간편한 작성 프로세스",
    icon: <FileText className="h-6 w-6 text-white" />,
    color: "bg-navy-600 text-white",
    style: "process" as const,
    accent: "navy",
    steps: [
      { step: 1, title: "양식 선택", icon: <FileText size={24} /> },
      { step: 2, title: "항목 입력", icon: <CheckCircle size={24} /> },
      { step: 3, title: "변호사 검토 및 작성", icon: <Award size={24} /> },
      { step: 4, title: "제출 안내", icon: <ArrowRight size={24} /> }
    ],
    ctaText: "작성 시작하기"
  },
  {
    id: 2,
    title: <>
      <span className="text-legal-primary font-bold">변호사 검토 및 작성</span>
    </>,
    description: "전문변호사가 전략적 소장을 작성합니다. 불안했던 고소장 작성, 이제는 안심하세요.",
    label: "변호사 직접 검수",
    icon: <Scale className="h-6 w-6 text-white" />,
    color: "bg-legal-primary text-white",
    style: "expert" as const,
    accent: "blue",
    ctaText: "전문가 검수 받기"
  },
  {
    id: 3,
    title: <>
      <span className="text-legal-primary font-bold">안전하게</span> 보호되는<br />
      개인정보
    </>,
    description: "최신 암호화 기술을 적용해 소중한 개인정보를 안전하게 보호합니다. 법률 문서 작성에 필요한 모든 데이터는 SSL/TLS로 암호화됩니다.",
    label: "보안 인증 완료",
    icon: <Shield className="h-6 w-6 text-white" />,
    color: "bg-navy-600 text-white",
    style: "security" as const,
    accent: "navy",
    ctaText: "보안 정책 자세히 보기"
  },
  {
    id: 4,
    title: <>
      언제 어디서나,<br />
      <span className="text-legal-accent font-bold">모바일에서도 간편하게</span>
    </>,
    description: "바쁜 일상 속, 스마트폰만 있으면 고소장 작성이 가능합니다. 시간과 장소에 구애받지 않고, 필요한 순간에 바로 준비하세요.",
    label: "모바일 최적화",
    icon: <Smartphone className="h-6 w-6 text-white" />,
    color: "bg-legal-accent text-white",
    style: "mobile" as const,
    accent: "blue",
    ctaText: "모바일로 이용해보기"
  }
];
