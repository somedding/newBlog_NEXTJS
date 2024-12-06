import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/utils/mdUtils';

// ... 이전 imports 유지

export default function Home() {
    const posts = getAllPosts().slice(0, 3);
  
    return (
      <div className="container mx-auto p-4 space-y-8">
        {/* 프로필 섹션 */}
        <div className="hero bg-base-200 rounded-box">
          <div className="hero-content flex-col lg:flex-row">
            <Image
              src="/profile.jpg"
              alt="Profile"
              width={200}
              height={200}
              className="mask mask-squircle shadow-2xl"
            />
            <div>
              <h1 className="text-4xl font-bold text-base-content">안녕하세요!</h1>
              <p className="py-6 text-base-content text-lg">
                프론트엔드 개발자 [이름]입니다. 
                웹 개발과 사용자 경험에 대한 깊은 관심을 가지고 있으며, 
                새로운 기술을 배우고 적용하는 것을 좋아합니다.
              </p>
              <Link href="/about" className="btn btn-primary">더 알아보기</Link>
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
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="text-base-content">파일명</th>
                  <th className="text-base-content">설명</th>
                  <th className="text-base-content">크기</th>
                  <th className="text-base-content">액션</th>
                </tr>
              </thead>
              <tbody>
                {/* ... 기존 테이블 내용 ... */}
              </tbody>
            </table>
          </div>
        </div>
  
        {/* 기술 스택 섹션 */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-base-content">기술 스택</h2>
            <div className="flex flex-wrap gap-2">
              {[
                'JavaScript', 'TypeScript', 'React', 'Next.js',
                'Node.js', 'TailwindCSS', 'Git'
              ].map((tech) => (
                <div key={tech} className="badge badge-primary badge-lg font-medium">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }