import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostMetadata } from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'public', 'posts');

export function getAllPosts(): Post[] {
  // 디렉토리가 없으면 생성
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    return [];
  }

  // 파일 목록 읽기
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName): Post => {
      // 파일 이름에서 .md 제거하여 id 생성
      const slug = fileName.replace(/\.md$/, '');

      // 마크다운 파일을 문자열로 읽기
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // gray-matter로 포스트의 메타데이터 파싱
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        ...(data as PostMetadata),
      };
    });

  // 날짜순으로 정렬
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // gray-matter로 포스트의 메타데이터 파싱
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    ...(data as PostMetadata),
  };
}