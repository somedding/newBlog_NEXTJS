'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '../ThemeToggle';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'active' : '';
  };

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
            <li><Link href="/posts" className={isActive('/posts')}>포스트</Link></li>
            <li><Link href="/about" className={isActive('/about')}>자기소개</Link></li>
            <li><Link href="/resources" className={isActive('/resources')}>공유파일</Link></li>
            <li><Link href="/contact" className={isActive('/contact')}>연락처</Link></li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">Blog</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/posts" className={isActive('/posts')}>포스트</Link></li>
          <li><Link href="/about" className={isActive('/about')}>자기소개</Link></li>
          <li><Link href="/resources" className={isActive('/resources')}>공유파일</Link></li>
          <li><Link href="/contact" className={isActive('/contact')}>연락처</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <ThemeToggle />
      </div>
    </div>
  );
}