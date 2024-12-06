import Link from 'next/link';
import { FaGithub, FaEnvelope, FaPhone, FaInstagram, FaDiscord, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="p-10 rounded footer footer-center bg-base-200 text-base-content">
      <nav className="grid grid-flow-col gap-4">
        <Link href="/about" className="link link-hover">자기소개</Link>
        <Link href="/posts" className="link link-hover">포스트</Link>
        <Link href="/resources" className="link link-hover">공유파일</Link>
        <Link href="/contact" className="link link-hover">연락처</Link>
      </nav> 
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="mailto:tycoontom42@gmail.com" className="transition-colors hover:text-primary">
            <FaEnvelope className="w-6 h-6" />
          </a>
          <a href="https://github.com/somedding" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
            <FaGithub className="w-6 h-6" />
          </a>
          <a href="https://www.instagram.com/_somedding_/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
            <FaInstagram className="w-6 h-6" />
          </a>
          <a href="https://www.discordapp.com/users/526269311996657667" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
            <FaDiscord className="w-6 h-6" />
          </a>
          <a href="https://linkedin.com/in/somedding" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
            <FaLinkedin className="w-6 h-6" />
          </a>
        </div>
      </nav> 
      <aside>
        <p>Copyright © 2024 - All rights reserved by 썸딩의 테크 블로그</p>
      </aside>
    </footer>
  );
} 