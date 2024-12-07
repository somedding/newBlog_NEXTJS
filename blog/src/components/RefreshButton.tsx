'use client';

import { useState } from 'react';
import { FaSync } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function RefreshButton() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  const refresh = async () => {
    setIsRefreshing(true);
    try {
      // 현재 페이지 새로고침
      router.refresh();
    } finally {
      // 약간의 딜레이 후 로딩 상태 해제
      setTimeout(() => {
        setIsRefreshing(false);
      }, 500);
    }
  };

  return (
    <button
      onClick={refresh}
      className={`btn btn-primary btn-sm sm:btn-md ${isRefreshing ? 'loading' : ''}`}
      disabled={isRefreshing}
      aria-label="새로고침"
    >
      <FaSync className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
      {isRefreshing ? '새로고침 중...' : '새로고침'}
    </button>
  );
} 