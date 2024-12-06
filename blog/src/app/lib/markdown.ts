import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';

const options = {
  // 테마를 직접 지정
  theme: 'github-dark',
  // 또는 다크/라이트 모드 모두 지정
  // theme: {
  //   dark: 'github-dark',
  //   light: 'github-light',
  // },
  keepBackground: true,
  defaultLang: 'plaintext',
  // 줄 번호 추가
  showLineNumbers: true,
  // 코드 블록 스타일링
  grid: true,
};

export async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrettyCode, options)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return result.toString();
}