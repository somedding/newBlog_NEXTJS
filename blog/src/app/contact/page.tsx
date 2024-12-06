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
  SiC,
  SiRust,
  SiPython
} from 'react-icons/si';

// 기술 스택 데이터 정의
const techStack = [
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'TailwindCSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'C', icon: SiC, color: '#A8B9CC' },
  { name: 'Rust', icon: SiRust, color: '#000000' }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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
      
      setTimeout(() => setStatus('idle'), 3000);
    } catch (_error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-8 text-base-content">연락처</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="card bg-base-100 shadow-xl flex-1">
            <div className="card-body">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="w-5 h-5 text-base-content/70" />
                  <a href="mailto:your.email@example.com" className="text-base-content hover:text-base-content/80 no-underline">
                    tycoontom42@gmail.com
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FaPhone className="w-5 h-5 text-base-content/70" />
                  <span className="text-base-content">010-3086-3082</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FaGithub className="w-5 h-5 text-base-content/70" />
                  <a href="https://github.com/somedding" target="_blank" rel="noopener noreferrer" className="text-base-content hover:text-base-content/80 no-underline">
                    GitHub
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <FaInstagram className="w-5 h-5 text-base-content/70" />
                  <a href="https://www.instagram.com/_somedding_/" target="_blank" rel="noopener noreferrer" className="text-base-content hover:text-base-content/80 no-underline">
                    Instagram
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <FaDiscord className="w-5 h-5 text-base-content/70" />
                  <a href="https://discord.gg/u8vqVCnheS" target="_blank" rel="noopener noreferrer" className="text-base-content hover:text-base-content/80 no-underline">
                    Discord
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <FaLinkedin className="w-5 h-5 text-base-content/70" />
                  <a href="https://linkedin.com/in/somedding" target="_blank" rel="noopener noreferrer" className="text-base-content hover:text-base-content/80 no-underline">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl flex-1">
            <div className="card-body">
              <h2 className="card-title text-base-content mb-4">기술 스택</h2>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <div 
                    key={tech.name} 
                    className="flex items-center gap-2 badge badge-lg p-4 font-medium hover:shadow-md transition-shadow"
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

          <div className="card bg-base-100 shadow-xl lg:w-96">
            <div className="card-body items-center text-center">
              <Image
                src="/profile.png"
                alt="Profile"
                width={300}
                height={300}
                className="rounded-xl"
              />
              <h2 className="card-title mt-4 text-primary font-bold text-2xl">썸딩</h2>
              <p className="text-base-content/70">프론트엔드 개발자</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-8 text-base-content">메일 보내기</h2>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className="input input-bordered w-full"
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
                    className="input input-bordered w-full"
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
                  className="input input-bordered w-full"
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
                  className="textarea textarea-bordered h-32"
                  placeholder="내용을 입력하세요"
                  required
                ></textarea>
              </div>

              <div className="form-control mt-6">
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
                  <div className="alert alert-success mt-4">
                    메일이 성공적으로 전송되었습니다.
                  </div>
                )}
                
                {status === 'error' && (
                  <div className="alert alert-error mt-4">
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