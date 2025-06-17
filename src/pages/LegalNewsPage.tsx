import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileText, Gavel, Scale } from 'lucide-react';

const cardNews = [
  {
    icon: <FileText className="h-8 w-8 text-legal-primary" />,
    title: '2024년 주요 법률 개정 한눈에 보기',
    summary: '2024년부터 달라지는 민사·형사·가사 주요 법률 개정사항을 카드뉴스로 정리했습니다.',
    link: '#'
  },
  {
    icon: <Gavel className="h-8 w-8 text-legal-primary" />,
    title: '실생활에 유용한 판례 모음',
    summary: '일상에서 꼭 알아야 할 판례와 해설을 카드 형태로 제공합니다.',
    link: '#'
  },
  {
    icon: <Scale className="h-8 w-8 text-legal-primary" />,
    title: '알기 쉬운 법률 Q&A',
    summary: '자주 묻는 법률 질문을 카드뉴스로 쉽고 빠르게 확인하세요.',
    link: '#'
  }
];

const postList = [
  {
    title: '최신 대법원 판결 요약',
    summary: '최근 선고된 대법원 판결의 핵심 내용을 한눈에 볼 수 있습니다.',
    date: '2024-06-10',
    link: '#'
  },
  {
    title: '2024년 민사소송법 개정 해설',
    summary: '2024년 개정된 민사소송법의 주요 내용을 쉽게 정리했습니다.',
    date: '2024-06-05',
    link: '#'
  },
  {
    title: '형사 절차에서의 피해자 권리',
    summary: '피해자가 형사 절차에서 행사할 수 있는 권리를 안내합니다.',
    date: '2024-05-28',
    link: '#'
  }
];

const LegalNewsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        {/* 카드 뉴스 영역 */}
        <div className="mb-12">
          <div className="flex gap-6 overflow-x-auto pb-2">
            {cardNews.map((news, idx) => (
              <Card key={idx} className="min-w-[320px] w-80 flex-shrink-0 flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center gap-4">
                  {news.icon}
                  <CardTitle className="text-lg">{news.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <p className="text-gray-600 mb-4">{news.summary}</p>
                  <a href={news.link} className="text-legal-accent hover:underline font-medium mt-auto">자세히 보기 &rarr;</a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {/* 게시글 리스트 영역 */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-legal-primary">법률 정보 게시글</h2>
          <div className="divide-y">
            {postList.map((post, idx) => (
              <div key={idx} className="py-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{post.title}</h3>
                  <p className="text-gray-600 mt-1">{post.summary}</p>
                </div>
                <div className="flex items-center mt-2 md:mt-0 gap-4">
                  <span className="text-sm text-gray-400">{post.date}</span>
                  <a href={post.link} className="text-legal-accent hover:underline font-medium">자세히 보기 &rarr;</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LegalNewsPage; 