import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/utils/mdUtils';
import { getFiles, formatFileSize, formatDate } from '@/utils/fileUtils';
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
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'TailwindCSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'C', icon: SiC, color: '#A8B9CC' },
  { name: 'Rust', icon: SiRust, color: '#000000' }
];

export default async function Home() {
    const posts = getAllPosts().slice(0, 3);
    const files = (await getFiles()).slice(0, 5); // 최근 5개 파일만 가져오기
  
    return (
      <div className="container mx-auto p-4 space-y-8">
        {/* 프로필 섹션 */}
        <div className="hero bg-base-200 rounded-box">
          <div className="hero-content flex-col lg:flex-row">
            <Image
              src="/profile.png"
              alt="Profile"
              width={200}
              height={200}
              className="mask mask-squircle shadow-2xl"
            />
            <div>
              <h1 className="text-4xl font-bold text-base-content">안녕하세요!</h1>
              <p className="py-2 text-base-content text-lg">
                프론트엔드 개발자 <span className="text-primary font-bold">썸딩</span> 입니다. 
              </p>
              <Link href="/about" className="text-primary">더 알아보기</Link>
            </div>
          </div>
        </div>
  
        {/* 최근 포스트 섹션 */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-base-content">최근 포스트</h2>
            <Link href="/posts" className="btn btn-ghost text-primary">
              모든 포스트 보기 →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts.map((post) => (
              <div key={post.slug} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-base-content">{post.title}</h2>
                  <p className="text-sm text-base-content/80">{post.date}</p>
                  <p className="text-base-content">{post.description}</p>
                  <div className="card-actions justify-end">
                    <Link href={`/posts/${post.slug}`} className="btn btn-primary btn-sm">
                      읽기
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* 공유 파일 섹션 */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-base-content">공유 파일</h2>
            <Link href="/resources" className="btn btn-ghost text-primary">
              모든 파일 보기 →
            </Link>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th className="text-base-content">파일명</th>
                      <th className="text-base-content">크기</th>
                      <th className="text-base-content">수정일</th>
                      <th className="text-base-content">다운로드</th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((file) => (
                      <tr key={file.id}>
                        <td className="text-base-content">
                          <div className="flex items-center space-x-2">
                            <svg className="w-5 h-5 text-base-content/70" viewBox="0 0 16 16" fill="currentColor">
                              <path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5z"/>
                            </svg>
                            <span>{file.name}</span>
                          </div>
                        </td>
                        <td className="text-base-content/70">{formatFileSize(file.size)}</td>
                        <td className="text-base-content/70">{formatDate(file.updatedAt)}</td>
                        <td>
                          <a
                            href={file.url}
                            download
                            className="btn btn-primary btn-sm"
                          >
                            <svg 
                              className="w-4 h-4 mr-1" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              />
                            </svg>
                            다운로드
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
  
        {/* 기술 스택 섹션 */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-base-content">기술 스택</h2>
          </div>
          
          {/* 단일 카드로 통합된 기술 스택 */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
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
        </div>
      </div>
    );
  }