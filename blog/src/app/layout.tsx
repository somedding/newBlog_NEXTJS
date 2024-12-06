import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="ko" data-theme="light">
      <body className={inter.className}>
        <Navigation />
        <main className="flex-1 bg-base-100">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}