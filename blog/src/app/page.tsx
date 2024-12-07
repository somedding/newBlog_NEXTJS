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
    const files = (await getFiles()).slice(0, 5);
  
    return (
      <div className="container p-2 mx-auto space-y-6 sm:p-4 sm:space-y-8">
        {/* 프로필 섹션 */}
        <div className="p-2 hero bg-base-200 rounded-box sm:p-4">
          <div className="flex-col gap-4 hero-content lg:flex-row">
            <Image
              src="/profile.png"
              alt="Profile"
              width={150}
              height={150}
              priority
              sizes="(max-width: 640px) 128px, (max-width: 768px) 192px, 150px"
              className="w-32 h-32 shadow-2xl mask mask-squircle sm:w-48 sm:h-48"
            />
            <div className="text-center lg:text-left">
              <h1 className="text-2xl font-bold sm:text-4xl text-base-content">안녕하세요!</h1>
              <p className="py-2 text-base sm:text-lg text-base-content">
                프론트엔드 개발자 <span className="font-bold text-primary">썸딩</span> 입니다. 
              </p>
              <Link href="/about" className="text-sm text-primary sm:text-base">더 알아보기</Link>
            </div>
          </div>
        </div>
  
        {/* 최근 포스트 섹션 */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-2xl font-bold sm:text-3xl text-base-content">최근 포스트</h2>
            <Link href="/posts" className="btn btn-ghost btn-sm sm:btn-md text-primary">
              모든 포스트 보기 →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 sm:gap-4">
            {posts.map((post) => (
              <div key={post.slug} className="shadow-xl card bg-base-100">
                <div className="p-4 card-body sm:p-6">
                  <h2 className="text-base card-title sm:text-lg text-base-content">{post.title}</h2>
                  <p className="text-xs sm:text-sm text-base-content/80">{post.date}</p>
                  <p className="text-sm sm:text-base text-base-content line-clamp-2">{post.description}</p>
                  <div className="justify-end card-actions">
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
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-2xl font-bold sm:text-3xl text-base-content">공유 파일</h2>
            <Link href="/resources" className="btn btn-ghost btn-sm sm:btn-md text-primary">
              모든 파일 보기 →
            </Link>
          </div>
          <div className="shadow-xl card bg-base-100">
            <div className="p-2 card-body sm:p-6">
              <div className="-mx-2 overflow-x-auto sm:mx-0">
                {files.length > 0 ? (
                  <table className="table w-full text-sm table-zebra sm:text-base">
                    <thead>
                      <tr>
                        <th className="text-base-content">파일명</th>
                        <th className="hidden text-base-content sm:table-cell">크기</th>
                        <th className="hidden text-base-content sm:table-cell">수정일</th>
                        <th className="text-base-content">다운로드</th>
                      </tr>
                    </thead>
                    <tbody>
                      {files.map((file) => (
                        <tr key={file.id}>
                          <td className="text-base-content">
                            <div className="flex items-center space-x-2">
                              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-base-content/70" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5z"/>
                              </svg>
                              <span className="truncate max-w-[120px] sm:max-w-none">{file.name}</span>
                            </div>
                          </td>
                          <td className="hidden text-base-content/70 sm:table-cell">{formatFileSize(file.size)}</td>
                          <td className="hidden text-base-content/70 sm:table-cell">{formatDate(file.updatedAt)}</td>
                          <td>
                            <a
                              href={file.url}
                              download
                              className="btn btn-primary btn-xs sm:btn-sm"
                            >
                              <svg 
                                className="w-3 h-3 mr-1 sm:w-4 sm:h-4" 
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
                              <span className="hidden sm:inline">다운로드</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="py-6 text-center sm:py-8">
                    <p className="text-sm text-base-content/50 sm:text-base">공유된 파일이 없습니다.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
  
        {/* 기술 스택 섹션 */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-2xl font-bold sm:text-3xl text-base-content">기술 스택</h2>
          </div>
          <div className="shadow-xl card bg-base-100">
            <div className="p-3 card-body sm:p-6">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {techStack.map((tech) => (
                  <div 
                    key={tech.name} 
                    className="flex items-center gap-1 p-3 text-xs font-medium transition-shadow sm:gap-2 badge badge-lg sm:p-4 hover:shadow-md sm:text-sm"
                    style={{ backgroundColor: `${tech.color}20` }}
                  >
                    <tech.icon 
                      className="text-lg sm:text-xl"
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