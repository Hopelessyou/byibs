
import React from 'react';
import FirmLayout from '@/components/firm/FirmLayout';
import { BarChart4, Download, Calendar, ArrowRight, Briefcase, Users, FileText, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const FirmAnalyticsPage: React.FC = () => {
  return (
    <FirmLayout>
      <div className="container px-4 py-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">통계 분석</h1>
            <p className="text-gray-600">로펌 운영 데이터를 분석하고 인사이트를 얻으세요.</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Select defaultValue="2025">
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="연도" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023년</SelectItem>
                <SelectItem value="2024">2024년</SelectItem>
                <SelectItem value="2025">2025년</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-legal-primary text-legal-primary hover:bg-legal-primary/10">
              <Download className="mr-1 h-4 w-4" /> 보고서 다운로드
            </Button>
          </div>
        </div>

        {/* 주요 통계 수치 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-1">
              <CardDescription>사건 통계</CardDescription>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">76건</CardTitle>
                <div className="p-2 rounded-full bg-blue-50">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-sm text-gray-500">
                진행중: 28건 / 종결: 43건 / 신규: 5건
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" className="h-8 px-2 text-xs text-blue-600">
                세부 통계 보기 <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-1">
              <CardDescription>고객 관리</CardDescription>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">122명</CardTitle>
                <div className="p-2 rounded-full bg-green-50">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-sm text-gray-500">
                개인: 94명 / 법인: 28사 / VIP: 15명
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" className="h-8 px-2 text-xs text-green-600">
                세부 통계 보기 <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-1">
              <CardDescription>상담 통계</CardDescription>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">45건</CardTitle>
                <div className="p-2 rounded-full bg-purple-50">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-sm text-gray-500">
                예약: 12건 / 완료: 28건 / 사건화율: 67%
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" className="h-8 px-2 text-xs text-purple-600">
                세부 통계 보기 <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-1">
              <CardDescription>매출 통계</CardDescription>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">2.5억원</CardTitle>
                <div className="p-2 rounded-full bg-amber-50">
                  <DollarSign className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-sm text-gray-500">
                올해 매출: 2.5억원 / 전년대비: +15%
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" className="h-8 px-2 text-xs text-amber-600">
                세부 통계 보기 <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* 탭 기반 상세 통계 */}
        <Tabs defaultValue="cases" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="cases">사건 분석</TabsTrigger>
            <TabsTrigger value="revenue">매출 분석</TabsTrigger>
            <TabsTrigger value="performance">업무 효율성</TabsTrigger>
            <TabsTrigger value="clients">고객 분석</TabsTrigger>
          </TabsList>
          
          {/* 사건 분석 */}
          <TabsContent value="cases">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">사건 유형 분포</CardTitle>
                  <CardDescription>2025년 전체 사건 유형별 비율</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                    <div className="text-center">
                      <BarChart4 className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-gray-500 text-sm">파이 차트 영역</p>
                      <p className="text-xs text-gray-400 mt-1">민사(40%), 형사(15%), 행정(10%), 가사(10%), 기타(25%)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">사건 처리 결과</CardTitle>
                  <CardDescription>종결된 사건의 결과 통계</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                    <div className="text-center">
                      <BarChart4 className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-gray-500 text-sm">수평 막대 차트 영역</p>
                      <p className="text-xs text-gray-400 mt-1">승소(55%), 일부승소(20%), 패소(10%), 조정/합의(15%)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">사건 처리 시간</CardTitle>
                <CardDescription>사건 유형별 평균 처리 기간</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                  <div className="text-center">
                    <BarChart4 className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-gray-500 text-sm">세로 막대 차트 영역</p>
                    <p className="text-xs text-gray-400 mt-1">민사(8개월), 형사(6개월), 행정(10개월), 가사(7개월), 기타(5개월)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* 매출 분석 */}
          <TabsContent value="revenue">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">월별 매출 추이</CardTitle>
                <CardDescription>2025년 월별 매출 및 전년 대비</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                  <div className="text-center">
                    <BarChart4 className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-gray-500 text-sm">꺾은선 그래프 영역</p>
                    <p className="text-xs text-gray-400 mt-1">2025년과 2024년의 월별 매출 비교</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">사건 유형별 매출</CardTitle>
                  <CardDescription>각 사건 유형이 기여하는 매출 비율</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] flex items-center justify-center bg-gray-50 rounded-md">
                    <div className="text-center">
                      <BarChart4 className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-gray-500 text-sm">도넛 차트 영역</p>
                      <p className="text-xs text-gray-400 mt-1">민사(50%), 형사(10%), 행정(15%), 가사(5%), 기타(20%)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">변호사별 매출</CardTitle>
                  <CardDescription>각 변호사의 매출 기여도</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] flex items-center justify-center bg-gray-50 rounded-md">
                    <div className="text-center">
                      <BarChart4 className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-gray-500 text-sm">세로 막대 차트 영역</p>
                      <p className="text-xs text-gray-400 mt-1">이변호(40%), 박변호(30%), 김변호(30%)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* 업무 효율성 */}
          <TabsContent value="performance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">평균 업무 시간</CardTitle>
                  <CardDescription>사건 당 소요되는 평균 시간</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] flex items-center justify-center bg-gray-50 rounded-md">
                    <div className="text-center">
                      <BarChart4 className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-gray-500 text-sm">세로 막대 차트 영역</p>
                      <p className="text-xs text-gray-400 mt-1">사건 유형별 평균 소요 시간(시간)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">변호사 업무 부담</CardTitle>
                  <CardDescription>변호사별 사건 수 및 처리 속도</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] flex items-center justify-center bg-gray-50 rounded-md">
                    <div className="text-center">
                      <BarChart4 className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-gray-500 text-sm">분산형 점 차트 영역</p>
                      <p className="text-xs text-gray-400 mt-1">변호사별 사건 수와 처리 시간 관계</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">문서 작성 효율성</CardTitle>
                <CardDescription>문서 유형별 평균 작성 시간</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center bg-gray-50 rounded-md">
                  <div className="text-center">
                    <BarChart4 className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-gray-500 text-sm">세로 막대 차트 영역</p>
                    <p className="text-xs text-gray-400 mt-1">소장(3.5시간), 준비서면(2.5시간), 항소이유서(4시간), 의견서(1.5시간), 기타(1시간)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* 고객 분석 */}
          <TabsContent value="clients">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">고객 유형 분포</CardTitle>
                  <CardDescription>개인 vs 법인 고객 비율</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] flex items-center justify-center bg-gray-50 rounded-md">
                    <div className="text-center">
                      <BarChart4 className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-gray-500 text-sm">파이 차트 영역</p>
                      <p className="text-xs text-gray-400 mt-1">개인(77%), 법인(23%)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">고객 반복률</CardTitle>
                  <CardDescription>고객당 평균 사건 수</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] flex items-center justify-center bg-gray-50 rounded-md">
                    <div className="text-center">
                      <BarChart4 className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-gray-500 text-sm">원형 차트 영역</p>
                      <p className="text-xs text-gray-400 mt-1">1건(70%), 2건(20%), 3건 이상(10%)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">고객 유입 경로</CardTitle>
                <CardDescription>신규 고객의 유입 채널 분석</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex items-center justify-center bg-gray-50 rounded-md">
                  <div className="text-center">
                    <BarChart4 className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-gray-500 text-sm">세로 막대 차트 영역</p>
                    <p className="text-xs text-gray-400 mt-1">기존 고객 소개(40%), 웹사이트(25%), 소셜 미디어(15%), 광고(10%), 기타(10%)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </FirmLayout>
  );
};

export default FirmAnalyticsPage;
