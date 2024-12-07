import { readdir } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import fs from 'fs/promises';
import { Suspense } from 'react';
import PostSkeleton from '@/components/PostSkeleton';
import ErrorState from '@/components/ErrorState';
import LoadingSpinner from '@/components/LoadingSpinner';

const POSTS_PER_PAGE = 9;

async function getPosts() {
  const postsDirectory = path.join(process.cwd(), 'public', 'posts');
  
  try {
    // 디렉토리가 없으면 생성
    try {
      await fs.mkdir(postsDirectory, { recursive: true });
    } catch (error) {
      console.error('Error creating directory:', error);
    }

    const files = await readdir(postsDirectory);
    const posts = await Promise.all(
      files
        .filter(file => file.endsWith('.md'))
        .map(async (file) => {
          const filePath = path.join(postsDirectory, file);
          const content = await fs.readFile(filePath, 'utf8');
          const { data: frontmatter } = matter(content);
          
          return {
            slug: file.replace('.md', ''),
            frontmatter,
          };
        })
    );

    // 날짜를 기준으로 정렬 (최신순)
    return posts.sort((a, b) => {
      const dateA = new Date(a.frontmatter.date);
      const dateB = new Date(b.frontmatter.date);
      return dateB.getTime() - dateA.getTime();
    });

  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const currentPage = Number(searchParams.page) || 1;
  
  try {
    const allPosts = await getPosts();
    const totalPosts = allPosts.length;
    
    if (totalPosts === 0) {
      return (
        <ErrorState 
          message="포스트를 찾을 수 없습니다." 
        />
      );
    }

    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
    const posts = allPosts.slice(
      (currentPage - 1) * POSTS_PER_PAGE,
      currentPage * POSTS_PER_PAGE
    );

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-base-content">Blog Posts</h1>
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(POSTS_PER_PAGE)].map((_, i) => (
              <PostSkeleton key={i} />
            ))}
          </div>
        }>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.slug} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="card-body">
                  <h2 className="card-title text-xl font-bold text-base-content">{post.frontmatter.title}</h2>
                  {post.frontmatter.date && (
                    <p className="text-sm text-base-content/70">{post.frontmatter.date}</p>
                  )}
                  <p className="text-base-content/80">
                    {post.frontmatter.description || 'No description available'}
                  </p>
                  <div className="card-actions justify-end mt-4">
                    <Link 
                      href={`/posts/${post.slug}`} 
                      className="btn btn-primary btn-sm"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Suspense>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {currentPage > 1 && (
              <Link
                href={`/posts?page=${currentPage - 1}`}
                className="btn btn-ghost"
              >
                ←
              </Link>
            )}
            
            <div className="join">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Link
                  key={pageNum}
                  href={`/posts?page=${pageNum}`}
                  className={`btn join-item ${pageNum === currentPage ? 'btn-active' : ''}`}
                >
                  {pageNum}
                </Link>
              ))}
            </div>

            {currentPage < totalPages && (
              <Link
                href={`/posts?page=${currentPage + 1}`}
                className="btn btn-ghost"
              >
                →
              </Link>
            )}
          </div>
        )}
      </div>
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