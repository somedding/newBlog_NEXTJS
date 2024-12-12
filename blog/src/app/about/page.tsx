'use client';

import { useState } from 'react';
import { FaGithub, FaEnvelope, FaInstagram, FaDiscord, FaLinkedin, FaBriefcase, FaCode, FaHeart, FaLanguage, FaLaptopCode, FaCamera, FaGlassMartini, FaRobot, FaBrain, FaTrophy, FaRust } from 'react-icons/fa';
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

// 기술 스택 데이터 정의
const techStack = {
  frontend: [
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
    { name: 'TailwindCSS', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Chrome Extension', icon: TbBrandChrome, color: '#4285F4' },
  ],
  mobile: [
    { name: 'React Native', icon: SiReactNative, color: '#61DAFB' },
    { name: 'Swift', icon: SiSwift, color: '#F05138' },
  ],
  backend: [
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'Python', icon: SiPython, color: '#3776AB' },
    { name: 'Rust', icon: SiRust, color: '#000000' },
    { name: 'Spring', icon: SiSpring, color: '#6DB33D' },
  ],
  database: [
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
  ],
  etc: [
    { name: 'Git', icon: SiGit, color: '#F05032' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { name: 'ChatGPT', icon: FaRobot, color: '#00A67E' },
    { name: 'Claude', icon: FaBrain, color: '#000000' },
  ]
};

// 경력 사항 데이터
const experiences = [
  {
    period: '2023.03 ~ 2024.02',
    company: '멋쟁이사자들',
    position: '프론트엔드 개발자',
    description: '중앙 해커톤 참여 , 웹 개발 및 유지보수'
  },
  {
    period: '2023 - 현재',
    company: '한국교통대학교',
    position: '컴퓨터공학과',
    description: '컴퓨터공학 / 자동차학과 전공 재학중'
  },
  // 더 많은 경력 추가 가능
];

// 소개 텍스트 추가
const introduction = {
  title: "안녕하세요, 프론트엔드 개발자 썸딩입니다.",
  description: `새로운 기술을 배우고 적용하는 것을 좋아하며, 
  사용자 경험을 개선하는 것에 큰 관심을 가지고 있습니다. 
  현재는 React와 Next.js를 주로 사용하여 웹 애플리케이션을 개발하고 있습니다.
  
  클린 코드와 성능 최적화에 대해 항상 고민하며, 
  팀원들과의 협업을 통해 더 나은 결과물을 만들어내는 것을 목표로 하고 있습니다.`
};

// 데이터 정의 추가
const projects = [
  {
    title: "개인 블로그",
    icon: FaCode,
    period: "2024.12.07 - 현재",
    role: "개인 프로젝트",
    description: "Next.js와 TypeScript를 사용한 개인 블로그 개발",
    skills: [
      { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'TailwindCSS', icon: SiTailwindcss, color: '#06B6D4' }
    ],
    link: "https://www.somedding.kr/"
  },
  {
    title: "PokerCounterApp",
    icon: FaCode,
    period: "2024.11 - 현재",
    role: "개인 프로젝트",
    description: "포커 카운터 앱 개발",
    skills: [
      { name: 'React Native', icon: SiReact, color: '#61DAFB' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    ],
    link: "https://github.com/somedding/PokerCounterApp"
  },
  {
    title: "IFU",
    icon: FaCode,
    period: "2024.07 - 2024.08",
    role: "프론트엔드",
    description: "크롬익스텐션 , 프론트엔드 개발",
    skills: [
      { name: 'HTML', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS', icon: SiCss3, color: '#1572B6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'Spring', icon: SiSpring, color: '#6DB33D' },
      { name: 'Chrome Extension', icon: TbBrandChrome, color: '#4285F4' },
    ],
    link: "https://github.com/somedding/TwoS"
  },
  {
    title: "PIC Simple Selector",
    icon: FaCode,
    period: "2024.12.07 - 현재",
    role: "개인 사이드프로젝트",
    description: "사진 셀렉을 위한 GUI 프로그램, 업데이트중",
    skills: [
      { name: 'Rust', icon: FaRust, color: '#000000' },
    ],
    link: "https://github.com/somedding/PIC_Simple_Selector"
  } //PIC_Simple_Selector
];

const hobbies = [
  {
    name: "코딩",
    description: "새로운 기술 학습 및 사이드 프로젝트 개발 , 알고리즘 공부",
    icon: FaCode
  },
  {
    name: "사진촬영",
    description: "사진 촬영 및 보정",
    icon: FaCamera
  },
  {
    name: "바텐딩",
    description: "칵테일 만들기",
    icon: FaGlassMartini
  }
];

const languages = [
  {
    name: "한국어",
    level: "원어민"
  },
  {
    name: "영어",
    level: "비즈니스 회화"
  }
];

// 대회/수상 데이터 추가
const awards = [
  {
    title: "2023 멋쟁이사자들처럼 중앙 해커톤",
    date: "2023.07",
    organization: "멋쟁이사자들",
    description: "참여"
  }
];

export default function AboutPage() {
  const [showCopyMessage, setShowCopyMessage] = useState({
    email: false
  });

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText('tycoontom42@gmail.com');
      setShowCopyMessage(prev => ({ ...prev, email: true }));
      setTimeout(() => setShowCopyMessage(prev => ({ ...prev, email: false })), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto space-y-8">
      {/* 상단 프로필 섹션 */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* 프로필 이미지 */}
        <div className="shadow-xl card bg-base-100 lg:w-72">
          <div className="items-center text-center card-body">
            <Image
              src="/profile.png"
              alt="Profile"
              width={240}
              height={240}
              className="rounded-xl"
            />
            <h2 className="mt-4 text-2xl font-bold card-title text-primary">썸딩</h2>
            <p className="text-base-content/70">프론트엔드 개발자</p>
          </div>
        </div>

        {/* 자기소개 섹션 */}
        <div className="flex-1 shadow-xl card bg-base-100">
          <div className="card-body">
            <h2 className="mb-4 text-2xl font-bold card-title text-base-content">
              {introduction.title}
            </h2>
            <div className="prose text-base-content/80">
              {introduction.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* 연락처 정보 */}
        <div className="shadow-xl card bg-base-100 lg:w-80">
          <div className="card-body">
            <h2 className="mb-4 text-xl font-bold card-title text-base-content">연락처</h2>
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
      </div>

      {/* 기술 스택 섹션 */}
      <div className="shadow-xl card bg-base-100">
        <div className="card-body">
          <h2 className="mb-6 text-xl font-bold card-title text-base-content">
            <FaLaptopCode className="w-5 h-5 mr-2" />
            기술 스택
          </h2>
          <div className="space-y-6">
            {/* 프론트엔드 */}
            <div>
              <h3 className="mb-3 text-lg font-semibold text-primary">Frontend</h3>
              <div className="flex flex-wrap gap-3">
                {techStack.frontend.map((tech) => (
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

            {/* 모바일 개발 */}
            <div>
              <h3 className="mb-3 text-lg font-semibold text-primary">Mobile</h3>
              <div className="flex flex-wrap gap-3">
                {techStack.mobile.map((tech) => (
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

            {/* 백엔드 */}
            <div>
              <h3 className="mb-3 text-lg font-semibold text-primary">Backend</h3>
              <div className="flex flex-wrap gap-3">
                {techStack.backend.map((tech) => (
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

            {/* 데이터베이스 */}
            <div>
              <h3 className="mb-3 text-lg font-semibold text-primary">Database</h3>
              <div className="flex flex-wrap gap-3">
                {techStack.database.map((tech) => (
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

            {/* 기타 */}
            <div>
              <h3 className="mb-3 text-lg font-semibold text-primary">Etc</h3>
              <div className="flex flex-wrap gap-3">
                {techStack.etc.map((tech) => (
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
        </div>
      </div>

      {/* 경력 사항 섹션 */}
      <div className="shadow-xl card bg-base-100">
        <div className="card-body">
          <h2 className="mb-6 text-xl font-bold card-title text-base-content">
            <FaBriefcase className="w-5 h-5 mr-2" />
            경력 사항
          </h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div key={index} className="p-4 transition-shadow rounded-lg hover:shadow-md bg-base-200">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-primary">{exp.company}</h3>
                  <span className="text-sm badge badge-primary">{exp.period}</span>
                </div>
                <p className="mb-1 font-medium text-base-content">{exp.position}</p>
                <p className="text-sm text-base-content/70">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 프로젝트 섹션 */}
      <div className="shadow-xl card bg-base-100">
        <div className="card-body">
          <h2 className="mb-6 text-xl font-bold card-title text-base-content">
            <FaCode className="w-5 h-5 mr-2" />
            프로젝트
          </h2>
          <div className="space-y-6">
            {projects.map((project, index) => (
              <div key={index} className="p-4 transition-shadow rounded-lg hover:shadow-md bg-base-200">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <project.icon className="w-4 h-4 text-primary" />
                    <h3 className="text-lg font-semibold text-primary">{project.title}</h3>
                  </div>
                  <span className="text-sm badge badge-primary">{project.period}</span>
                </div>
                <p className="mb-2 text-sm font-medium text-base-content/80 italic">
                  ▸ {project.role}
                </p>
                <p className="mb-2 text-sm text-base-content/70">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-2 p-2 font-medium transition-shadow badge badge-sm hover:shadow-md"
                      style={{ backgroundColor: `${skill.color}20` }}
                    >
                      <skill.icon 
                        className="text-base"
                        style={{ color: skill.color }}
                      />
                      <span className="text-base-content">{skill.name}</span>
                    </div>
                  ))}
                </div>
                {project.link && (
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-sm text-primary hover:underline"
                  >
                    GitHub 보기 →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 취미 & 대회 & 언어 섹션 */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* 취미 */}
        <div className="shadow-xl card bg-base-100">
          <div className="card-body">
            <h2 className="mb-6 text-xl font-bold card-title text-base-content">
              <FaHeart className="w-5 h-5 mr-2" />
              취미
            </h2>
            <div className="space-y-4">
              {hobbies.map((hobby, index) => (
                <div key={index} className="p-4 transition-shadow rounded-lg hover:shadow-md bg-base-200">
                  <div className="flex items-center gap-2 mb-2">
                    <hobby.icon className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-primary">{hobby.name}</h3>
                  </div>
                  <p className="text-sm text-base-content/70">{hobby.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 대회/수상 */}
        <div className="shadow-xl card bg-base-100">
          <div className="card-body">
            <h2 className="mb-6 text-xl font-bold card-title text-base-content">
              <FaTrophy className="w-5 h-5 mr-2" />
              대회/수상
            </h2>
            <div className="space-y-4">
              {awards.map((award, index) => (
                <div key={index} className="p-4 transition-shadow rounded-lg hover:shadow-md bg-base-200">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-primary">{award.title}</h3>
                    <span className="text-sm badge badge-primary">{award.date}</span>
                  </div>
                  <p className="mb-1 text-sm text-base-content/70">{award.organization}</p>
                  <p className="text-sm font-medium text-base-content">{award.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 언어 */}
        <div className="shadow-xl card bg-base-100">
          <div className="card-body">
            <h2 className="mb-6 text-xl font-bold card-title text-base-content">
              <FaLanguage className="w-5 h-5 mr-2" />
              언어
            </h2>
            <div className="space-y-4">
              {languages.map((lang, index) => (
                <div key={index} className="p-4 transition-shadow rounded-lg hover:shadow-md bg-base-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-primary">{lang.name}</h3>
                    <span className="text-sm badge badge-primary">{lang.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
