import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';

export async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(() => (tree) => {
      visit(tree, 'element', (node) => {
        // img 태그를 찾아서 Next.js Image 컴포넌트 형식으로 변환
        if (node.tagName === 'img') {
          const src = node.properties?.src as string;
          const alt = node.properties?.alt as string;
          
          // img 태그를 Next.js Image 컴포넌트 형식으로 변환
          node.tagName = 'img';
          node.properties = {
            ...node.properties,
            width: 800,  // 기본 너비
            height: 400, // 기본 높이
            loading: 'lazy',
            decoding: 'async',
            sizes: '(max-width: 768px) 100vw, 800px',
          };
        }
      });
    })
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
} 