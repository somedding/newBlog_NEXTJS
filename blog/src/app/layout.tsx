import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog",
  description: "My personal blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${inter.className} min-h-screen bg-base-100`}>
        <Navigation />
        <main className="min-h-screen bg-base-100">
          {children}
        </main>
      </body>
    </html>
  );
}