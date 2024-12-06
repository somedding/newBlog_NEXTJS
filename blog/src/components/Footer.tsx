import Link from 'next/link';
import { FaGithub, FaEnvelope, FaPhone, FaInstagram, FaDiscord, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <nav className="grid grid-flow-col gap-4">
        <Link href="/about" className="link link-hover">자기소개</Link>
        <Link href="/posts" className="link link-hover">포스트</Link>
        <Link href="/resources" className="link link-hover">공유파일</Link>
        <Link href="/contact" className="link link-hover">연락처</Link>
      </nav> 
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="mailto:tycoontom42@gmail.com" className="hover:text-primary transition-colors">
            <FaEnvelope className="w-6 h-6" />
          </a>
          <a href="https://github.com/somedding" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <FaGithub className="w-6 h-6" />
          </a>
          <a href="https://www.instagram.com/_somedding_/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <FaInstagram className="w-6 h-6" />
          </a>
          <a href="https://discord.gg/u8vqVCnheS" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <FaDiscord className="w-6 h-6" />
          </a>
          <a href="https://linkedin.com/in/somedding" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
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