import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react"

// 라틴 문자용 폰트
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

// 한글 폰트
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans-kr',
});

export const metadata: Metadata = {
  title: "썸딩의 테크 블로그",
  description: "썸딩의 테크 블로그입니다.",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: { url: '/apple-icon.png' },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" data-theme="light" className={`${inter.variable} ${notoSansKr.variable}`}>
      <head>
        <link 
          rel="preconnect" 
          href="https://cdn.jsdelivr.net" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css" 
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 bg-base-100">
          {children}
        </main>
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}