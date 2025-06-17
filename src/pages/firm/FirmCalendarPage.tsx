
import React, { useState } from 'react';
import FirmLayout from '@/components/firm/FirmLayout';
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Helper function to generate dates for the current month
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

const FirmCalendarPage: React.FC = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Mock events data
  const events = [
    { id: 1, title: '손해배상청구 변론기일', date: '2025-04-05', time: '10:00', type: '변론', court: '서울중앙지방법원', cases: '김민준 vs 주식회사 건설', lawyer: '이변호' },
    { id: 2, title: '계약분쟁 조정회의', date: '2025-04-05', time: '14:30', type: '조정', court: '서울중앙지방법원', cases: '주식회사 테크놀로지 vs 이기술', lawyer: '이변호' },
    { id: 3, title: '지식재산권 판결선고', date: '2025-04-08', time: '11:00', type: '선고', court: '특허법원', cases: '이지훈 vs 주식회사 미디어', lawyer: '박변호' },
    { id: 4, title: '형사 증인신문', date: '2025-04-12', time: '10:30', type: '증인신문', court: '서울중앙지방법원', cases: '박서연 형사', lawyer: '김변호' },
    { id: 5, title: '법인 자문 미팅', date: '2025-04-15', time: '15:00', type: '미팅', location: '고객 사무실', cases: '주식회사 테크놀로지', lawyer: '이변호' },
    { id: 6, title: '소장 제출 기한', date: '2025-04-20', time: '18:00', type: '기한', cases: '최수민 임대차', lawyer: '이변호' },
    { id: 7, title: '감정기일', date: '2025-04-22', time: '14:00', type: '감정', court: '서울서부지방법원', cases: '최수민 vs 강건물', lawyer: '이변호' },
    { id: 8, title: '신규 의뢰인 상담', date: '2025-04-25', time: '16:30', type: '상담', location: '사무실', lawyer: '박변호' },
  ];

  // Event categories with colors
  const eventCategories = {
    '변론': 'bg-blue-100 text-blue-800 border-blue-200',
    '선고': 'bg-purple-100 text-purple-800 border-purple-200',
    '증인신문': 'bg-amber-100 text-amber-800 border-amber-200',
    '조정': 'bg-green-100 text-green-800 border-green-200',
    '미팅': 'bg-cyan-100 text-cyan-800 border-cyan-200',
    '기한': 'bg-red-100 text-red-800 border-red-200',
    '감정': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    '상담': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    '기타': 'bg-gray-100 text-gray-800 border-gray-200'
  };

  type EventCategoryType = keyof typeof eventCategories;

  // Generate calendar days
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  
  // Calendar days including "padding" days for a complete calendar grid
  const calendarDays = [];
  
  // Previous month padding days
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push({ day: 0, isCurrentMonth: false });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ day: i, isCurrentMonth: true });
  }
  
  // Next month padding days to fill out the grid (6 rows of 7 days)
  const remainingDays = 42 - calendarDays.length;
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({ day: i, isCurrentMonth: false });
  }

  // Navigate months
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Get events for specific day
  const getEventsForDay = (day: number) => {
    if (!day) return [];
    
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  // Month names
  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  return (
    <FirmLayout>
      <div className="container px-4 py-6 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">일정 관리</h1>
            <p className="text-gray-600">재판 기일 및 중요 일정을 확인하세요.</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Select defaultValue="month">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="보기" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">월간</SelectItem>
                <SelectItem value="week">주간</SelectItem>
                <SelectItem value="day">일간</SelectItem>
                <SelectItem value="list">목록</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-legal-primary hover:bg-legal-secondary">
              <Plus className="mr-1 h-4 w-4" /> 새 일정
            </Button>
          </div>
        </div>

        {/* 일정 필터링 탭 */}
        <Tabs defaultValue="all" className="w-full mb-4">
          <TabsList>
            <TabsTrigger value="all">모든 일정</TabsTrigger>
            <TabsTrigger value="court">재판 기일</TabsTrigger>
            <TabsTrigger value="meeting">회의/미팅</TabsTrigger>
            <TabsTrigger value="deadline">마감일</TabsTrigger>
            <TabsTrigger value="consultation">상담</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* 월간 달력 헤더 */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-semibold">
            {currentYear}년 {monthNames[currentMonth]}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => {
              setCurrentMonth(today.getMonth());
              setCurrentYear(today.getFullYear());
            }}>
              오늘
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 달력 그리드 */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6">
          {/* 요일 헤더 */}
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
              <div key={i} className="p-2 text-center font-medium bg-gray-100">
                <span className={i === 0 ? 'text-red-500' : i === 6 ? 'text-blue-500' : ''}>
                  {day}
                </span>
              </div>
            ))}
          </div>
          
          {/* 날짜 그리드 */}
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {calendarDays.map((calDay, i) => {
              const dayEvents = getEventsForDay(calDay.day);
              const isToday = calDay.isCurrentMonth && 
                calDay.day === today.getDate() && 
                currentMonth === today.getMonth() && 
                currentYear === today.getFullYear();
              
              return (
                <div 
                  key={i} 
                  className={`min-h-[120px] p-1 bg-white ${
                    calDay.isCurrentMonth ? 'text-gray-800' : 'text-gray-400'
                  } ${isToday ? 'bg-blue-50' : ''}`}
                >
                  <div className="text-right p-1">
                    <span className={`
                      inline-block w-6 h-6 text-center rounded-full
                      ${isToday ? 'bg-blue-500 text-white' : ''}
                      ${!calDay.isCurrentMonth ? 'text-gray-400' : i % 7 === 0 ? 'text-red-500' : i % 7 === 6 ? 'text-blue-500' : ''}
                    `}>
                      {calDay.day || ''}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div 
                        key={event.id} 
                        className={`text-xs p-1 truncate rounded ${eventCategories[event.type as EventCategoryType] || eventCategories['기타']}`}
                      >
                        {event.time.split(':')[0]}:{event.time.split(':')[1]} {event.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs p-1 text-gray-500">
                        +{dayEvents.length - 3} 더보기
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 오늘의 일정 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">오늘 일정</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.filter(event => event.date === `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`).length > 0 ? (
                events.filter(event => event.date === `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`).map((event) => (
                  <div key={event.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                    <div className="flex-shrink-0 w-16 text-center">
                      <div className="text-sm font-medium text-legal-primary">{event.time}</div>
                      <Badge className={eventCategories[event.type as EventCategoryType] || eventCategories['기타']}>
                        {event.type}
                      </Badge>
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-medium">{event.title}</h3>
                      <div className="mt-1 space-y-1 text-sm text-gray-500">
                        {event.court && (
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" /> {event.court}
                          </div>
                        )}
                        {event.location && !event.court && (
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" /> {event.location}
                          </div>
                        )}
                        <div className="flex items-center">
                          <Copy className="h-3 w-3 mr-1" /> {event.cases}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" /> {event.lawyer}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">오늘 예정된 일정이 없습니다.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </FirmLayout>
  );
};

export default FirmCalendarPage;
