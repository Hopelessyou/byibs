
import React from 'react';
import { TeamMember } from './AboutTypes';

const TeamSection: React.FC = () => {
  return (
    <section className="py-16 bg-legal-light rounded-lg mb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-legal-primary">핵심 팀</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            법률과 기술의 전문성을 겸비한 팀이 고소장닷컴을 만들어갑니다
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-6">
                <div className="bg-gray-100 w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-legal-primary">{member.initial}</span>
                </div>
                <h3 className="text-xl font-bold text-center mb-1">{member.name}</h3>
                <p className="text-legal-accent text-center mb-4">{member.position}</p>
                <p className="text-gray-600 text-center text-sm">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const team: TeamMember[] = [
  {
    name: "유변호",
    position: "대표 / 법률 총괄",
    initial: "YBH",
    description: "10년 경력의 변호사로 형사법 전문. 리걸테크 분야에서의 경험을 바탕으로 서비스를 기획 및 총괄."
  },
  {
    name: "박개발",
    position: "CTO / 개발 총괄",
    initial: "PGB",
    description: "AI 및 자동화 시스템 개발 전문가. 다수의 리걸테크 서비스 개발 경험을 보유."
  },
  {
    name: "이마케팅",
    position: "CMO / 마케팅 총괄",
    initial: "LMK",
    description: "법률 서비스 분야 마케팅 전문가. 사용자 경험 최적화와 고객 확보 전략 담당."
  }
];

export default TeamSection;
