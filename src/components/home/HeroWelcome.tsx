
import React, { useEffect, useState } from 'react';

const HeroWelcome: React.FC = () => {
  const [welcomeMessage, setWelcomeMessage] = useState('안녕하세요');

  useEffect(() => {
    const hour = new Date().getHours();
    let greeting = '안녕하세요';
    if (hour >= 5 && hour < 12) {
      greeting = '좋은 아침입니다';
    } else if (hour >= 12 && hour < 18) {
      greeting = '좋은 오후입니다';
    } else if (hour >= 18 && hour < 22) {
      greeting = '편안한 저녁입니다';
    } else {
      greeting = '늦은 시간까지 법률 문제로 걱정이시군요';
    }
    setWelcomeMessage(greeting);
  }, []);

  return (
    <div className="text-sm text-legal-accent mb-4 opacity-75 font-medium reveal">
      {welcomeMessage} <span className="text-gray-700">|</span> <span className="font-medium">전문 변호사 작성, 24시간 상담 가능</span>
    </div>
  );
};

export default HeroWelcome;
