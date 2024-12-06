import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode, { Options } from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { Element } from 'hast';

interface CodeNode {
  type: 'text';
  value: string;
}

interface PrettyCodeNode extends Element {
  tagName: string;
  properties: {
    className?: string[];
    'data-rehype-pretty-code-fragment'?: boolean;
    'data-rehype-pretty-code-title'?: boolean;
    code?: string;
  };
  children: Array<PrettyCodeNode | CodeNode>;
}

export async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypePrettyCode, {
      theme: 'github-dark',
      keepBackground: false,
      onVisitLine(node) {
        if ('children' in node && Array.isArray(node.children) && node.children.length === 0) {
          node.children = [{ type: 'text', value: ' ' }];
        }
      },
      onVisitHighlightedLine(node) {
        if ('properties' in node) {
          node.properties.className = node.properties.className || [];
          node.properties.className.push('line--highlighted');
        }
      },
      onVisitHighlightedChars(node) {
        if ('properties' in node) {
          node.properties.className = ['word--highlighted'];
        }
      },
    } as Options)
    .use(() => (tree) => {
      visit(tree, 'element', (node: PrettyCodeNode) => {
        if (
          node.tagName === 'div' &&
          node.properties?.['data-rehype-pretty-code-fragment'] !== undefined
        ) {
          const titleElement = node.children.find(
            (child): child is PrettyCodeNode =>
              'tagName' in child &&
              child.tagName === 'div' &&
              child.properties?.['data-rehype-pretty-code-title'] !== undefined
          );

          if (titleElement) {
            node.children = [titleElement, ...node.children.filter(child => child !== titleElement)];
          }
        }
      });
    })
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}