import { readFile, readdir } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { markdownToHtml } from '@/app/lib/markdown';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorState from '@/components/ErrorState';
import dynamic from 'next/dynamic';

// 마크다운 렌더러를 동적으로 임포트
const MarkdownContent = dynamic(
  () => import('@/components/MarkdownContent'),
  {
    loading: () => <LoadingSpinner />,
    ssr: true,
  }
);

// 클라이언트 댓글 컴포넌트 임포트
const ClientComments = dynamic(() => import('@/components/ClientComments'));

// Next.js 13+ 타입 정의
type PageParams = {
  slug: string;
}

type Props = {
  params: PageParams;
}

export async function generateStaticParams(): Promise<PageParams[]> {
  const postsDirectory = path.join(process.cwd(), 'public', 'posts');
  const files = await readdir(postsDirectory);
  
  return files
    .filter(file => file.endsWith('.md'))
    .map((file) => ({
      slug: file.replace('.md', ''),
    }));
}

async function getPost(slug: string) {
  const postsDirectory = path.join(process.cwd(), 'public', 'posts');
  const filePath = path.join(postsDirectory, `${slug}.md`);
  
  try {
    const content = await readFile(filePath, 'utf8');
    const { data: frontmatter, content: markdownContent } = matter(content);
    const htmlContent = await markdownToHtml(markdownContent);
    
    return {
      frontmatter,
      htmlContent,
    };
  } catch (error) {
    console.error(`Error reading file for slug ${slug}:`, error);
    return null;
  }
}

export default async function PostPage({ params }: Props) {
  try {
    const post = await getPost(params.slug);
    
    if (!post) {
      return <ErrorState message="포스트를 찾을 수 없습니다." />;
    }

    return (
      <article className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingSpinner />}>
          <div className="max-w-3xl mx-auto">
            <nav className="mb-8">
              <Link href="/posts" className="btn btn-ghost btn-sm">
                ← Back to Posts
              </Link>
            </nav>
            
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-2 text-base-content">{post.frontmatter.title}</h1>
              {post.frontmatter.date && (
                <p className="text-base-content/70">{post.frontmatter.date}</p>
              )}
              {post.frontmatter.description && (
                <p className="text-xl text-base-content/80 mt-4">
                  {post.frontmatter.description}
                </p>
              )}
              {post.frontmatter.tags && (
                <div className="flex gap-2 mt-4">
                  {post.frontmatter.tags.map((tag: string) => (
                    <span key={tag} className="badge badge-outline">{tag}</span>
                  ))}
                </div>
              )}
            </header>

            <MarkdownContent content={post.htmlContent} />
            
            <ClientComments />
          </div>
        </Suspense>
      </article>
    );
  } catch (error) {
    return (
      <ErrorState 
        message="포스트를 불러오는 중 오류가 발생했습니다." 
        retry={() => window.location.reload()}
      />
    );
  }
}
