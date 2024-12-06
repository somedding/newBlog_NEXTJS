'use client';

import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from '../ThemeToggle';

export default function Navigation() {
  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link href="/posts">포스트</Link></li>
            <li><Link href="/about">자기소개</Link></li>
            <li><Link href="/resources">공유파일</Link></li>
            <li><Link href="/contact">연락처</Link></li>
          </ul>
        </div>
        <Link href="/" className="flex items-center gap-0 text-xl px-9 py-2">
          <Image
            src="/profile.png"
            alt="Profile"
            width={55}
            height={55}
            className="rounded-full"
          />
          <span className="font-bold font-jalnan">썸딩의 테크 블로그</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/posts">포스트</Link></li>
          <li><Link href="/about">자기소개</Link></li>
          <li><Link href="/resources">공유파일</Link></li>
          <li><Link href="/contact">연락처</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <ThemeToggle />
      </div>
    </div>
  );
}