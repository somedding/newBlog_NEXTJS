import { readdir } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import fs from 'fs/promises';

async function getPosts() {
  const postsDirectory = path.join(process.cwd(), 'content', 'posts');
  
  try {
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

    return posts;
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}

export default async function PostsPage() {
  const posts = await getPosts();

  if (posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-base-content">No posts found</h1>
        <p className="mt-4 text-base-content/70">Could not load blog posts.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-base-content">Blog Posts</h1>
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
    </div>
  );
}