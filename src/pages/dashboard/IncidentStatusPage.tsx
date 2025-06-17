import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Gavel, Scale, FileText, CheckCircle, AlertTriangle, User, HelpCircle, FileSearch } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const criminalVictimSteps = [
  {
    icon: <AlertTriangle className="h-6 w-6 text-legal-accent" />, 
    title: '경찰 단계',
    description: '고소장·신고서 제출, 수사 담당자 지정 요청, 피해자 조사 참여, 영장 청구 의견 제출, 보강 수사 요청 등 경찰 단계에서의 대응 절차를 진행합니다.'
  },
  {
    icon: <Scale className="h-6 w-6 text-legal-accent" />, 
    title: '검찰 단계',
    description: '사건 송치 통지 확인, 의견서·보강 수사 요청, 재정신청 고려 등 검찰 단계에서의 대응 절차를 진행합니다.'
  },
  {
    icon: <Gavel className="h-6 w-6 text-legal-primary" />, 
    title: '공판 단계',
    description: '공판 준비절차 참여, 피해자 의견 진술, 증거 조사 및 증인 신청 등 공판 단계에서의 대응 절차를 진행합니다.'
  }
];

const criminalSuspectSteps = [
  {
    icon: <User className="h-6 w-6 text-legal-primary" />, 
    title: '경찰 단계',
    description: '변호인 선임 및 접견권 확보, 진술거부권 행사, 영장실질심사 준비, 압수수색 영장 집행에 이의 제기, 수사기록 열람·등사 청구 등 경찰 단계에서의 대응 절차를 진행합니다.'
  },
  {
    icon: <FileText className="h-6 w-6 text-legal-primary" />, 
    title: '검찰 단계',
    description: '불기소 의견서 제출, 수사기록 재열람·이의신청, 약식명령·검찰조정 신청, 검찰 기소 여부 결정 후 대응 등 검찰 단계에서의 대응 절차를 진행합니다.'
  },
  {
    icon: <Gavel className="h-6 w-6 text-legal-primary" />, 
    title: '공판 단계',
    description: '변호인 선임·준비서면 제출, 보석 신청, 공판 변론 참여, 판결 선고 후 절차 등 공판 단계에서의 대응 절차를 진행합니다.'
  }
];

const civilPlaintiffStageSteps = {
  '소 제기': [
    {
      icon: <FileText className="h-6 w-6 text-legal-primary" />,
      title: '소장 작성 및 접수 (민사소송법 제225조)',
      description: '청구취지·청구원인 명확히 기재, 필요한 증거자료(계약서, 영수증, 사진 등) 목록화 후 첨부, 관할 법원·당사자 표시 정확히 작성'
    },
    {
      icon: <Scale className="h-6 w-6 text-legal-accent" />,
      title: '소장 송달 확인',
      description: '법원에서 피고에게 소장·준비서면 정식 송달 여부 확인, 상대방 불응 시 공시송달(제236조) 신청 검토'
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-legal-accent" />,
      title: '증거보전·가처분·가압류 신청',
      description: '본안 판결 전 권리 보전 필요 시 증거보전(제292조), 가처분(제282조), 가압류(제273조) 절차 준비, 긴급성·보전 필요성 입증을 위한 준비서면·담보 제공 계획'
    },
    {
      icon: <User className="h-6 w-6 text-legal-primary" />,
      title: '소액사건절차·조정절차 검토',
      description: '분쟁 금액이 2천만 원 이하인 경우 소액사건절차 활용, 상대와 합의 여지 있으면 법원 조정절차(제478조) 신청 고려'
    }
  ],
  '변론': [
    {
      icon: <Scale className="h-6 w-6 text-legal-accent" />,
      title: '변론준비기일 참여 (민사소송법 제238조)',
      description: '쟁점·증거목록 확정, 준비서면 제출, 증인·감정인 명단 및 의견서 미리 마련'
    },
    {
      icon: <FileText className="h-6 w-6 text-legal-primary" />,
      title: '증거보완 신청',
      description: '공정증서·감정·검증·녹취자료 등 추가 증거신청(제309조), 상대측 증거에 대한 이의(제304조) 제기'
    },
    {
      icon: <Gavel className="h-6 w-6 text-legal-primary" />,
      title: '변론기일 출석 및 진술 (제244조)',
      description: '법정에서 주요 사실관계·법리 반복 강조, 증인신문 시 부탁 사항 확인'
    }
  ],
  '판결/집행': [
    {
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
      title: '판결 선고 확인 및 이행권고 (민사소송법 제246조)',
      description: '선고 당일 판결문 열람, 피고에 대한 이행권고 신청 검토'
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-legal-accent" />,
      title: '항소·상고 준비',
      description: '판결 불복 시 1심 판결 선고일로부터 2주 이내 항소(제400조), 항소이유서에 사실·법률 다툼 요지 구체화, 상고심(제430조) 전략 수립'
    },
    {
      icon: <Scale className="h-6 w-6 text-legal-accent" />,
      title: '집행문 발급 및 강제집행 (민사집행법)',
      description: '확정판결문에 집행문 부여 신청, 부동산 강제경매·채권압류·급여압류 등 집행 조치'
    }
  ]
};

const civilDefendantStageSteps = {
  '소 제기': [
    {
      icon: <User className="h-6 w-6 text-legal-primary" />,
      title: '답변서(반소 포함) 제출 (민사소송법 제231조)',
      description: '원고 청구 인용·기각 여부 및 이유 기재, 반소(역청구) 필요 시 반소청구 취지·이유 명확히 작성'
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-legal-accent" />,
      title: '불응·지정 기일 불출석 시 대리인 활용',
      description: '답변서 미제출 또는 불출석 시 불리하므로 변호인 선임 검토, 긴급한 증거 목록·이의 신청 준비'
    },
    {
      icon: <Scale className="h-6 w-6 text-legal-accent" />,
      title: '가처분·가압류 이의 신청',
      description: '원고의 보전조치 신청에 대해 이의신청서(제284조, 제274조) 제출, 사안 반박 논리(담보 제공, 권리 존재 부인) 제시'
    },
    {
      icon: <FileText className="h-6 w-6 text-legal-primary" />,
      title: '공시송달·긴급조치 대응',
      description: '법원이 공시송달을 결정할 때, 이의 신청(제236조 제3항) 또는 가처분 이의, 사전 통지권 확보 방안 모색'
    }
  ],
  '변론': [
    {
      icon: <FileText className="h-6 w-6 text-legal-primary" />,
      title: '준비서면 제출 및 쟁점 정리',
      description: '원고 준비서면에 대한 반박 논리·별도 증거 제출, 핵심 쟁점(권리 부존재·면책 사유 등) 명확화'
    },
    {
      icon: <Scale className="h-6 w-6 text-legal-accent" />,
      title: '증거목록 이의신청 (제304조)',
      description: '원고 측 증거가 부적법·무관하다고 판단되면 이의 제기, 반대신문을 위한 질문·증인 준비'
    },
    {
      icon: <Gavel className="h-6 w-6 text-legal-primary" />,
      title: '변론기일 출석 및 반대신문 (제244조)',
      description: '원고 측 증언·감정결과에 대한 반대신문 수행, 법원에 사실 오인·법리 오해 지적'
    }
  ],
  '판결/집행': [
    {
      icon: <AlertTriangle className="h-6 w-6 text-legal-accent" />,
      title: '항소·상고 대응',
      description: '원고의 항소 제기에 대한 답변서(항소이유 반박) 제출, 상고이유 부당함 지적'
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
      title: '집행 이의 및 집행항변 (민사집행법 제74조·제120조)',
      description: '강제집행 통지를 받은 후 2주 이내 집행이의 신청, 권리관계·채무 변제 여부 등 집행항변'
    },
    {
      icon: <Scale className="h-6 w-6 text-legal-accent" />,
      title: '화해권고·조정 절차 활용',
      description: '판결 확정 전 법원 권유 시 화해권고 동의 여부 검토, 조정(제478조)으로 분쟁 종결 유도'
    }
  ]
};

// 형사 단계별 상세 절차(피해자)
const criminalVictimStageSteps = {
  '경찰': [
    {
      icon: <FileText className="h-6 w-6 text-legal-primary" />,
      title: '고소장·신고서 제출',
      description: `
- 경찰서 민원실 또는 형사과에 고소장(또는 피해신고서) 정식 접수
- 고소장에는 반드시 "언제, 어디서, 누가, 무슨 행위로"에 대한 구체적 사실 기재
- 피고소인 인적사항, 피해 경위, 청구 취지(처벌 의사) 명확히 작성
- 증거자료(사진, 영상, 진료기록, 문자·카톡, 녹취, 증인 연락처 등) 목록화 후 첨부
- 접수증 수령 및 사건번호 확인, 담당 수사관 배정 여부 체크
- 고소장 접수 후 수사 진행 상황을 주기적으로 문의(전화·방문)
      `
    },
    {
      icon: <User className="h-6 w-6 text-legal-primary" />,
      title: '수사 담당자 지정 요청 및 진행 상황 확인',
      description: `
- 담당 수사관 이름, 연락처 반드시 확보
- 수사 일정(피해자 조사, 참고인 조사, 현장검증 등) 미리 안내받기
- 압수수색·체포·구속 등 주요 수사 조치 여부 수시 확인
- 수사관과의 소통은 문자·카톡 등 기록 남기기(분쟁 대비)
- 수사 지연 시 신속 처리 요청, 필요시 변호사 통해 진정·민원 제기
      `
    },
    {
      icon: <Scale className="h-6 w-6 text-legal-accent" />,
      title: '피해자 조사 참여 및 진술권 행사',
      description: `
- 피해자 진술 시 사실관계 일관성 유지, 불필요한 추측·과장 피하기
- 참고인·증인 신청: 사건 입증에 유리한 인물은 반드시 증인으로 신청
- 조사 일정은 사전에 조율, 필요시 변호인 동석 요청 가능
- 진술서·조서 내용은 반드시 직접 확인 후 서명(오류 시 정정 요구)
      `
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-legal-accent" />,
      title: '영장 청구 의견 제출 및 보강 수사 요청',
      description: `
- 체포·구속·압수수색 영장 청구 시 "영장신청 찬성 의견서" 제출 가능
- 피의자 도주·증거인멸 우려 등 강조, 필요시 의견서 별도 제출
- 수사 중 추가 증거(감정, 현장검증 등) 필요시 보강 수사 요청
- 절차상 위법·부당한 수사 발견 시 즉시 이의 제기
      `
    }
  ],
  '검찰': [
    {
      icon: <FileText className="h-6 w-6 text-legal-primary" />,
      title: '사건 송치 통지 확인',
      description: '경찰 송치 후 검사 배당 여부 및 담당 검사 확인. 송치된 수사기록 및 증거목록 열람 요청.'
    },
    {
      icon: <User className="h-6 w-6 text-legal-primary" />,
      title: '의견서·보강 수사 요청',
      description: '기소·불기소 판단 전 "공소제기 의견서" 제출. 수사가 미흡하다 판단되면 "보강 수사 지휘 요청".'
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-legal-accent" />,
      title: '재정신청 고려',
      description: '검찰이 불기소 처분할 경우 "재정신청"(공소제기 명령 청구) 검토. 재정신청서 제출 기한 및 절차 엄수.'
    }
  ],
  '공판': [
    {
      icon: <Scale className="h-6 w-6 text-legal-accent" />,
      title: '공판 준비절차 참여',
      description: '공판준비기일(형사소송법 제314조의2) 참석하여 증거목록 확정. 증인·감정인 명단 제출 및 필요한 증거 보강.'
    },
    {
      icon: <User className="h-6 w-6 text-legal-primary" />,
      title: '피해자 의견 진술 및 손해배상명령 신청',
      description: '재판부 앞에서 피해자 직접 진술("의견진술권") 행사. 손해배상명령·배상명령(민사절차 간이 병합 신청) 요청.'
    },
    {
      icon: <Gavel className="h-6 w-6 text-legal-primary" />,
      title: '증거 조사 및 증인 신청',
      description: '공판 중 추가 증거 제출 신청. 증인신문을 통해 사실관계 입증 강화.'
    }
  ]
};

// 형사 단계별 상세 절차(피의자)
const criminalSuspectStageSteps = {
  '경찰': [
    {
      icon: <User className="h-6 w-6 text-legal-primary" />,
      title: '변호인 선임 및 접견권 확보',
      description: '수사 초기부터 형사 전문 변호인 선임. 피의자 신문(형사소송법 제200조)에 변호인 동석 요구.'
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-legal-accent" />,
      title: '진술거부권 행사·혐의 부인',
      description: '스스로 불리한 진술은 거부(자백 강요 방지). 수사 단계에서 허위 자백 위험 방지.'
    },
    {
      icon: <Gavel className="h-6 w-6 text-legal-primary" />,
      title: '영장실질심사 준비',
      description: '구속영장 청구 시 법원 출석(영장실질심사)에 변호인과 함께 출석. 구속 필요성 반박 의견서 제출(주거지 보증·증거인멸 방지 방안 등).'
    },
    {
      icon: <Scale className="h-6 w-6 text-legal-accent" />,
      title: '압수수색 영장 집행에 이의 제기',
      description: '영장 집행 당시 장소·대상·범위를 벗어난 조치 확인. 부당영장 집행에 대해 법원에 집행정지·무효확인 신청.'
    },
    {
      icon: <FileText className="h-6 w-6 text-legal-primary" />,
      title: '수사기록 열람·등사 청구',
      description: '영장청구서·수사결과통지 등을 포함한 수사기록 열람·등사(형사소송법 제243조). 수사기관의 불투명한 수사행위 파악 및 방어전략 수립.'
    }
  ],
  '검찰': [
    {
      icon: <FileText className="h-6 w-6 text-legal-primary" />,
      title: '불기소 의견서 제출',
      description: '검사에 "불기소(기소유예·혐의없음) 의견서" 제출. 증거부족·정당방위 등 혐의 부인 논리 제시.'
    },
    {
      icon: <Scale className="h-6 w-6 text-legal-accent" />,
      title: '수사기록 재열람·이의신청',
      description: '경찰 단계에서 이미 열람한 기록 재검토. 부당한 수사 절차 발견 시 "이의신청".'
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-legal-accent" />,
      title: '약식명령·검찰조정 신청',
      description: '경미 사건 시 약식명령(벌금형)으로 유리한 처분 유도. 피해자와 합의가 가능한 경우 "검찰 조정 제도" 활용.'
    },
    {
      icon: <Gavel className="h-6 w-6 text-legal-primary" />,
      title: '검찰 기소 여부 결정 후 대응',
      description: '불기소 시: 재정신청 또는 다시 수사기관에 보강 요청. 기소 시: 즉시 변호인에게 공판준비서면 요청.'
    }
  ],
  '공판': [
    {
      icon: <FileText className="h-6 w-6 text-legal-primary" />,
      title: '변호인 선임·준비서면 제출',
      description: '공판준비절차서면(증거 이견·법리 다툼 요지) 제출. 방어이론(무죄·감형 사유) 정교화.'
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-legal-accent" />,
      title: '보석 신청',
      description: '1심 선고 전 불구속 상태 유지를 위해 "보석 청구". 보석 조건(보증금·출석보증 등) 협의.'
    },
    {
      icon: <Gavel className="h-6 w-6 text-legal-primary" />,
      title: '공판 변론 참여',
      description: '검사·변호인·피고인 질의응답. 증인신문 시 "반대신문" 통해 증언 신빙성 흠집.'
    },
    {
      icon: <Scale className="h-6 w-6 text-legal-accent" />,
      title: '판결 선고 후 절차',
      description: '1심 유·무죄 판결 직후 "항소·항소이유서" 준비(7일 이내). 2심·상고심 전략 수립.'
    }
  ]
};

// 사건 리스트 mock 데이터 예시
const myCases = [
  {
    id: 1,
    name: '2024-형사-고소(사기)',
    type: 'criminal-victim', // 형사(피해자)
    status: '검찰 단계',
    currentDetail: '의견서·보강 수사 요청',
    updated: '2024-06-10'
  },
  {
    id: 2,
    name: '2024-민사-손해배상',
    type: 'civil-plaintiff', // 민사(원고)
    status: '변론',
    currentDetail: '증거보완 신청',
    updated: '2024-06-08'
  },
  {
    id: 3,
    name: '2024-형사-피의자(폭행)',
    type: 'criminal-suspect', // 형사(피의자)
    status: '경찰 단계',
    currentDetail: '진술거부권 행사·혐의 부인',
    updated: '2024-06-01'
  }
];

const typeLabel = {
  'criminal-victim': '형사(피해자)',
  'criminal-suspect': '형사(피의자)',
  'civil-plaintiff': '민사(원고)',
  'civil-defendant': '민사(피고)'
};

// 카드 상세 팝오버 컴포넌트
const DetailPopover: React.FC<{ description: string }> = ({ description }) => {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative ml-2 align-top">
      <button
        type="button"
        className="ml-auto text-gray-400 hover:text-legal-primary focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-label="상세 설명 보기"
      >
        <HelpCircle className="w-5 h-5" />
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-2 w-72 p-3 bg-white border border-gray-200 rounded shadow-xl text-xs text-gray-600 leading-relaxed animate-fade-in">
          {description}
          <button
            className="block ml-auto mt-2 text-xs text-legal-accent hover:underline"
            onClick={() => setOpen(false)}
          >닫기</button>
        </div>
      )}
    </span>
  );
};

// 사건 상세 정보 타입 정의
interface CaseDetail {
  id: number;
  name: string;
  type: string;
  status: string;
  currentDetail: string;
  updated: string;
  documents: {
    title: string;
    date: string;
    status: 'pending' | 'completed' | 'in_progress';
    description: string;
    fileUrl?: string;
  }[];
  notes: string[];
  nextSteps: string[];
}

// 사건 상세 정보 mock 데이터
const caseDetails: Record<number, CaseDetail> = {
  1: {
    id: 1,
    name: '2024-형사-고소(사기)',
    type: 'criminal-victim',
    status: '검찰 단계',
    currentDetail: '의견서·보강 수사 요청',
    updated: '2024-06-10',
    documents: [
      {
        title: '고소장',
        date: '2024-05-15',
        status: 'completed',
        description: '사기 혐의 고소장 제출',
        fileUrl: '/files/complaint.pdf'
      },
      {
        title: '피해자 진술서',
        date: '2024-05-20',
        status: 'completed',
        description: '경찰서에서 작성한 피해자 진술서',
        fileUrl: '/files/complaint.pdf'
      },
      {
        title: '의견서',
        date: '2024-06-10',
        status: 'in_progress',
        description: '검찰에 제출할 의견서 작성 중'
      }
    ],
    notes: [
      '피의자 측에서 합의를 제안했으나 거절함',
      '추가 증거자료 수집 필요'
    ],
    nextSteps: [
      '의견서 작성 완료 후 검찰 제출',
      '추가 증거자료 수집',
      '피해자 진술 보강'
    ]
  },
  // ... 다른 사건들의 상세 정보도 추가
};

const IncidentStatusPage: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<number>(myCases[0]?.id ?? null);
  const selectedCase = myCases.find(c => c.id === selectedCaseId);
  const [tab, setTab] = useState(selectedCase ? selectedCase.type : 'criminal-victim');
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedCaseDetail, setSelectedCaseDetail] = useState<CaseDetail | null>(null);

  const handleStepClick = (stepTitle: string) => {
    setSelectedStep(stepTitle);
  };

  // 현재 진행 중인 단계인지 확인하는 함수
  const isCurrentStep = (stepTitle: string) => {
    return selectedCase?.currentDetail === stepTitle;
  };

  const handleViewDetails = (caseId: number) => {
    setSelectedCaseDetail(caseDetails[caseId]);
    setIsDetailModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'in_progress':
        return 'text-blue-600';
      case 'pending':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-2 md:px-8">
      <h1 className="text-2xl font-bold mb-8 text-legal-primary">내 사건 현황</h1>
      {/* 사건 리스트 표 */}
      <div className="mb-8 overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg bg-white">
          <thead>
            <tr className="bg-gray-50 text-gray-700 text-sm">
              <th className="px-4 py-2 border-b">사건명</th>
              <th className="px-4 py-2 border-b">유형</th>
              <th className="px-4 py-2 border-b">현재 단계</th>
              <th className="px-4 py-2 border-b">진행 세부 단계</th>
              <th className="px-4 py-2 border-b">최근 업데이트</th>
              <th className="px-4 py-2 border-b">자세히 보기</th>
            </tr>
          </thead>
          <tbody>
            {myCases.map(c => (
              <tr
                key={c.id}
                className={`cursor-pointer hover:bg-blue-50 transition ${selectedCaseId === c.id ? 'bg-blue-100 font-bold' : ''}`}
                onClick={() => {
                  setSelectedCaseId(c.id);
                  setTab(c.type);
                }}
              >
                <td className="px-4 py-2 border-b whitespace-nowrap">{c.name}</td>
                <td className="px-4 py-2 border-b whitespace-nowrap">{typeLabel[c.type]}</td>
                <td className="px-4 py-2 border-b whitespace-nowrap">{c.status}</td>
                <td className="px-4 py-2 border-b whitespace-nowrap">{c.currentDetail}</td>
                <td className="px-4 py-2 border-b whitespace-nowrap">{c.updated}</td>
                <td className="px-4 py-2 border-b whitespace-nowrap">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(c.id);
                    }}
                    className="inline-flex items-center px-3 py-1 text-sm text-legal-primary hover:text-legal-primary/80 transition-colors"
                  >
                    <FileSearch className="w-4 h-4 mr-1" />
                    자세히 보기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 사건 상세 모달 */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto fixed left-1/2 -translate-x-1/2 -translate-y-2/3">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-legal-primary">
              {selectedCaseDetail?.name}
            </DialogTitle>
            <DialogDescription>
              {typeLabel[selectedCaseDetail?.type || '']} | {selectedCaseDetail?.status}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            {/* 서류 현황 */}
            <div>
              <h3 className="text-lg font-semibold mb-3">서류 현황</h3>
              <div className="space-y-2">
                {selectedCaseDetail?.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium">{doc.title}</span>
                      <p className="text-sm text-gray-600">{doc.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">{doc.date}</span>
                      <span className={`text-sm font-medium ${getStatusColor(doc.status)}`}>
                        {doc.status === 'completed' ? '완료' : 
                         doc.status === 'in_progress' ? '진행중' : '대기중'}
                      </span>
                      {doc.fileUrl && (
                        <a
                          href={doc.fileUrl}
                          download
                          className="ml-2 px-2 py-1 text-xs rounded bg-legal-primary text-white hover:bg-legal-primary/80 transition"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          다운로드
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 특이사항 */}
            <div>
              <h3 className="text-lg font-semibold mb-3">특이사항</h3>
              <ul className="list-disc list-inside space-y-2">
                {selectedCaseDetail?.notes.map((note, idx) => (
                  <li key={idx} className="text-gray-700">{note}</li>
                ))}
              </ul>
            </div>

            {/* 다음 단계 */}
            <div>
              <h3 className="text-lg font-semibold mb-3">다음 단계</h3>
              <ul className="list-disc list-inside space-y-2">
                {selectedCaseDetail?.nextSteps.map((step, idx) => (
                  <li key={idx} className="text-gray-700">{step}</li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 하위 맞춤형 단계별 현황 */}
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsContent value="criminal-victim">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {(['경찰', '검찰', '공판'] as const).map((stage) => (
              <div key={stage} className="bg-white rounded-lg shadow p-6 flex flex-col min-w-0">
                <h2 className="text-xl font-bold mb-4 text-legal-primary text-center">{stage} 단계</h2>
                <div className="flex flex-col gap-3">
                  {criminalVictimStageSteps[stage].map((step, idx) => (
                    <div 
                      key={idx} 
                      className={`rounded-lg border p-4 shadow-none transition flex items-center gap-2 ${
                        isCurrentStep(step.title) 
                          ? 'border-legal-primary bg-legal-primary/10 shadow-md ring-2 ring-legal-primary/20 font-semibold' 
                          : 'border-gray-200 bg-gray-50 hover:border-legal-primary'
                      }`}
                    >
                      <span className={`w-5 h-5 flex-shrink-0 ${isCurrentStep(step.title) ? 'text-legal-primary scale-110' : 'text-legal-primary'}`}>{step.icon}</span>
                      <span className={`text-base flex items-center gap-2 ${isCurrentStep(step.title) ? 'text-legal-primary' : ''}`}>{step.title}</span>
                      <DetailPopover description={step.description} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="criminal-suspect">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {(['경찰', '검찰', '공판'] as const).map((stage) => (
              <div key={stage} className="bg-white rounded-lg shadow p-6 flex flex-col min-w-0">
                <h2 className="text-xl font-bold mb-4 text-legal-primary text-center">{stage} 단계</h2>
                <div className="flex flex-col gap-3">
                  {criminalSuspectStageSteps[stage].map((step, idx) => (
                    <div 
                      key={idx} 
                      className={`rounded-lg border p-4 shadow-none transition flex items-center gap-2 ${
                        isCurrentStep(step.title) 
                          ? 'border-legal-primary bg-legal-primary/10 shadow-md ring-2 ring-legal-primary/20 font-semibold' 
                          : 'border-gray-200 bg-gray-50 hover:border-legal-primary'
                      }`}
                    >
                      <span className={`w-5 h-5 flex-shrink-0 ${isCurrentStep(step.title) ? 'text-legal-primary scale-110' : 'text-legal-primary'}`}>{step.icon}</span>
                      <span className={`text-base flex items-center gap-2 ${isCurrentStep(step.title) ? 'text-legal-primary' : ''}`}>{step.title}</span>
                      <DetailPopover description={step.description} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="civil-plaintiff">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {(['소 제기', '변론', '판결/집행'] as const).map((stage) => (
              <div key={stage} className="bg-white rounded-lg shadow p-6 flex flex-col min-w-0">
                <h2 className="text-xl font-bold mb-4 text-legal-primary text-center">{stage} 단계</h2>
                <div className="flex flex-col gap-3">
                  {civilPlaintiffStageSteps[stage].map((step, idx) => (
                    <div 
                      key={idx} 
                      className={`rounded-lg border p-4 shadow-none transition flex items-center gap-2 ${
                        isCurrentStep(step.title) 
                          ? 'border-legal-primary bg-legal-primary/10 shadow-md ring-2 ring-legal-primary/20 font-semibold' 
                          : 'border-gray-200 bg-gray-50 hover:border-legal-primary'
                      }`}
                    >
                      <span className={`w-5 h-5 flex-shrink-0 ${isCurrentStep(step.title) ? 'text-legal-primary scale-110' : 'text-legal-primary'}`}>{step.icon}</span>
                      <span className={`text-base flex items-center gap-2 ${isCurrentStep(step.title) ? 'text-legal-primary' : ''}`}>{step.title}</span>
                      <DetailPopover description={step.description} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="civil-defendant">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {(['소 제기', '변론', '판결/집행'] as const).map((stage) => (
              <div key={stage} className="bg-white rounded-lg shadow p-6 flex flex-col min-w-0">
                <h2 className="text-xl font-bold mb-4 text-legal-primary text-center">{stage} 단계</h2>
                <div className="flex flex-col gap-3">
                  {civilDefendantStageSteps[stage].map((step, idx) => (
                    <div 
                      key={idx} 
                      className={`rounded-lg border p-4 shadow-none transition flex items-center gap-2 ${
                        isCurrentStep(step.title) 
                          ? 'border-legal-primary bg-legal-primary/10 shadow-md ring-2 ring-legal-primary/20 font-semibold' 
                          : 'border-gray-200 bg-gray-50 hover:border-legal-primary'
                      }`}
                    >
                      <span className={`w-5 h-5 flex-shrink-0 ${isCurrentStep(step.title) ? 'text-legal-primary scale-110' : 'text-legal-primary'}`}>{step.icon}</span>
                      <span className={`text-base flex items-center gap-2 ${isCurrentStep(step.title) ? 'text-legal-primary' : ''}`}>{step.title}</span>
                      <DetailPopover description={step.description} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IncidentStatusPage; 