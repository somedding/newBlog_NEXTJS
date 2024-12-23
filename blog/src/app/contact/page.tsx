'use client';

import { useState } from 'react';
import { FaGithub, FaEnvelope, FaPhone, FaInstagram, FaDiscord, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import { 
  SiJavascript, 
  SiTypescript, 
  SiReact, 
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiGit,
  SiRust,
  SiPython,
  SiMongodb,
  SiMysql,
  SiDocker,
  SiReact as SiReactNative,
  SiSwift,
  SiHtml5,
  SiCss3,
  SiSpring,
} from 'react-icons/si';
import { TbBrandChrome } from 'react-icons/tb';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import RefreshButton from '@/components/RefreshButton';

// 기술 스택 데이터 정의
const techStack = [
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
  { name: 'TailwindCSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Chrome Extension', icon: TbBrandChrome, color: '#4285F4' },
  { name: 'React Native', icon: SiReactNative, color: '#61DAFB' },
  { name: 'Swift', icon: SiSwift, color: '#F05138' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Rust', icon: SiRust, color: '#000000' },
  { name: 'Spring', icon: SiSpring, color: '#6DB33D' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
];

interface CalendarProps {
  calendarData: {
    googleCalendarApiKey: string;
    googleCalendarId: string;
  };
}

export default function ContactPage({ calendarData }: CalendarProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showCopyMessage, setShowCopyMessage] = useState({
    email: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // 3초 후 상태 초기화
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText('tycoontom42@gmail.com');
      setShowCopyMessage(prev => ({ ...prev, email: true }));
      setTimeout(() => setShowCopyMessage(prev => ({ ...prev, email: false })), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  // 캘린더 이벤트 핸들러
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    // 날짜 선택 시 처리
    console.log('Selected date:', selectInfo.startStr);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    // 이벤트 클릭 시 처리
    console.log('Clicked event:', clickInfo.event.title);
  };

  return (
    <div className="container px-4 py-8 mx-auto space-y-8">
      <div>
        <h1 className="mb-8 text-3xl font-bold text-base-content">연락처</h1>
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 shadow-xl card bg-base-100">
            <div className="card-body">
              <div className="space-y-4">
                <div className="relative flex items-center space-x-3">
                  <FaEnvelope className="w-5 h-5 text-base-content/70" />
                  <button
                    onClick={handleEmailClick}
                    className="cursor-pointer text-base-content hover:text-base-content/80"
                  >
                    tycoontom42@gmail.com
                  </button>
                  {showCopyMessage.email && (
                    <div className="absolute flex items-center justify-center px-6 py-1.5 text-sm transform -translate-x-1/2 rounded-full shadow-lg -top-8 left-1/2 bg-success/80 text-success-content backdrop-blur-sm min-w-[140px]">
                      복사되었습니다!
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <FaGithub className="w-5 h-5 text-base-content/70" />
                  <a href="https://github.com/somedding" target="_blank" rel="noopener noreferrer" className="no-underline text-base-content hover:text-base-content/80">
                    GitHub
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <FaInstagram className="w-5 h-5 text-base-content/70" />
                  <a href="https://www.instagram.com/_somedding_/" target="_blank" rel="noopener noreferrer" className="no-underline text-base-content hover:text-base-content/80">
                    Instagram
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <FaDiscord className="w-5 h-5 text-base-content/70" />
                  <a href="https://www.discordapp.com/users/526269311996657667" target="_blank" rel="noopener noreferrer" className="no-underline text-base-content hover:text-base-content/80">
                    Discord
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <FaLinkedin className="w-5 h-5 text-base-content/70" />
                  <a href="https://linkedin.com/in/somedding" target="_blank" rel="noopener noreferrer" className="no-underline text-base-content hover:text-base-content/80">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 shadow-xl card bg-base-100">
            <div className="card-body">
              <h2 className="mb-4 card-title text-base-content">기술 스택</h2>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <div 
                    key={tech.name} 
                    className="flex items-center gap-2 p-4 font-medium transition-shadow badge badge-lg hover:shadow-md"
                    style={{ backgroundColor: `${tech.color}20` }}
                  >
                    <tech.icon 
                      className="text-xl"
                      style={{ color: tech.color }}
                    />
                    <span className="text-base-content">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="shadow-xl card bg-base-100 lg:w-96">
            <div className="items-center text-center card-body">
              <Image
                src="/profile.png"
                alt="Profile"
                width={300}
                height={300}
                className="rounded-xl"
              />
              <h2 className="mt-4 text-2xl font-bold card-title text-primary">썸딩</h2>
              <p className="text-base-content/70">프론트엔드 개발자</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-base-content">일정</h2>
          <RefreshButton />
        </div>
        <div className="shadow-xl card bg-base-100">
          <div className="card-body">
            <FullCalendar
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                googleCalendarPlugin
              ]}
              initialView="dayGridMonth"
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              select={handleDateSelect}
              eventClick={handleEventClick}
              timeZone='Asia/Seoul'
              googleCalendarApiKey={calendarData.googleCalendarApiKey}
              eventSources={[
                {
                  googleCalendarId: calendarData.googleCalendarId,
                  className: 'gcal-event'
                }
              ]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek'
              }}
              locale="ko"
              height="auto"
              slotMinTime="00:00:00"
              slotMaxTime="24:00:00"
              views={{
                dayGridMonth: {
                  dayMaxEvents: true
                },
                timeGridWeek: {
                  slotDuration: '01:00:00',
                  slotLabelFormat: {
                    hour: 'numeric',
                    minute: '2-digit',
                    omitZeroMinute: true,
                    meridiem: 'short'
                  },
                  allDaySlot: false,
                  nowIndicator: true,
                  dayHeaderFormat: { weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true }
                }
              }}
              eventDisplay="block"
              displayEventEnd={true}
              nowIndicator={true}
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-8 text-3xl font-bold text-base-content">메일 보내기</h2>
        <div className="shadow-xl card bg-base-100">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content">이름</span>
                  </label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="이름을 입력하세요"
                    className="w-full input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content">이메일</span>
                  </label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="이메일을 입력하세요"
                    className="w-full input input-bordered"
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content">제목</span>
                </label>
                <input 
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="제목을 입력하세요"
                  className="w-full input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content">내용</span>
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="h-32 textarea textarea-bordered"
                  placeholder="내용을 입력하세요"
                  required
                ></textarea>
              </div>

              <div className="mt-6 form-control">
                <button 
                  type="submit" 
                  className={`btn btn-primary ${status === 'loading' ? 'loading' : ''}`}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    '전송 중...'
                  ) : (
                    <>
                      <FaEnvelope className="w-4 h-4 mr-2" />
                      보내기
                    </>
                  )}
                </button>
                
                {status === 'success' && (
                  <div className="mt-4 alert alert-success">
                    메일이 성공적으로 전송되었습니다.
                  </div>
                )}
                
                {status === 'error' && (
                  <div className="mt-4 alert alert-error">
                    메일 전송에 실패했습니다. 다시 시도해주세요.
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}