'use client';

import dynamic from 'next/dynamic';

const Comments = dynamic(
  () => import('./Comments'),
  {
    loading: () => <div className="animate-pulse h-32"></div>,
    ssr: false,
  }
);

export default function ClientComments() {
  return <Comments />;
} 