import { readFile, readdir } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { markdownToHtml } from '@/app/lib/markdown';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
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

export default async function PostPage({ params }: PageProps) {
  const post = await getPost(params.slug);
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-error">Post not found</h1>
        <p className="mt-4 text-base-content/70">The requested post could not be found.</p>
        <Link href="/posts" className="btn btn-primary mt-8">
          Back to Posts
        </Link>
      </div>
    );
  }

  const { frontmatter, htmlContent } = post;

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <nav className="mb-8">
          <Link href="/posts" className="btn btn-ghost btn-sm">
            ← Back to Posts
          </Link>
        </nav>
        
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-base-content">{frontmatter.title}</h1>
          {frontmatter.date && (
            <p className="text-base-content/70">{frontmatter.date}</p>
          )}
          {frontmatter.description && (
            <p className="text-xl text-base-content/80 mt-4">
              {frontmatter.description}
            </p>
          )}
          {frontmatter.tags && (
            <div className="flex gap-2 mt-4">
              {frontmatter.tags.map((tag: string) => (
                <span key={tag} className="badge badge-outline">{tag}</span>
              ))}
            </div>
          )}
        </header>

        <div 
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }} 
        />
      </div>
    </article>
  );
}