'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // 일반 img 태그를 Next.js Image 컴포넌트로 교체
      const images = contentRef.current.getElementsByTagName('img');
      Array.from(images).forEach((img) => {
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt') || '';
        
        if (src?.startsWith('/')) {  // 로컬 이미지인 경우
          const wrapper = document.createElement('div');
          wrapper.style.position = 'relative';
          wrapper.style.width = '100%';
          wrapper.style.aspectRatio = '16/9';
          
          const nextImage = document.createElement('img');
          nextImage.setAttribute('src', src);
          nextImage.setAttribute('alt', alt);
          nextImage.setAttribute('sizes', '(max-width: 768px) 100vw, 800px');
          nextImage.style.objectFit = 'cover';
          
          img.parentNode?.replaceChild(wrapper, img);
          wrapper.appendChild(nextImage);
        }
      });
    }
  }, [content]);

  return (
    <div 
      ref={contentRef}
      className="prose prose-lg dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  );
} 