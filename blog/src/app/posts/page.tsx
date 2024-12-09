import { readdir } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import fs from 'fs/promises';
import { Suspense } from 'react';
import PostSkeleton from '@/components/PostSkeleton';
import ErrorState from '@/components/ErrorState';
import LoadingSpinner from '@/components/LoadingSpinner';
import Image from 'next/image';
import { FaRegFileAlt } from 'react-icons/fa';

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
  // searchParams를 await로 처리
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  try {
    const allPosts = await getPosts();
    const postsPerPage = 9;
    const totalPosts = allPosts.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    // 현재 페이지의 포스트들만 선택
    const posts = allPosts.slice(
      (currentPage - 1) * postsPerPage,
      currentPage * postsPerPage
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
              <div key={post.slug} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow h-[200px]">
                <div className="flex h-full">
                  {post.frontmatter.thumbnail ? (
                    <figure className="relative w-1/3 h-full">
                      <Image
                        src={post.frontmatter.thumbnail}
                        alt={post.frontmatter.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
                      />
                    </figure>
                  ) : (
                    <div className="w-1/3 h-full bg-base-200 flex items-center justify-center">
                      <FaRegFileAlt className="w-12 h-12 text-base-content/50" />
                    </div>
                  )}
                  <div className="card-body flex-1 p-4">
                    <h2 className="card-title text-lg font-bold text-base-content line-clamp-2">{post.frontmatter.title}</h2>
                    {post.frontmatter.date && (
                      <p className="text-xs text-base-content/70">{post.frontmatter.date}</p>
                    )}
                    <p className="text-sm text-base-content/80 line-clamp-2">
                      {post.frontmatter.description || 'No description available'}
                    </p>
                    <div className="card-actions justify-end mt-auto">
                      <Link 
                        href={`/posts/${post.slug}`} 
                        className="btn btn-primary btn-xs"
                      >
                        Read More
                      </Link>
                    </div>
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
    console.error('Error loading posts:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-base-content/70">
          포스트를 불러오는데 실패했습니다.
        </p>
      </div>
    );
  }
}