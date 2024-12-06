/** @type {import('next').NextConfig} */
const nextConfig = {
  // distDir 설정 제거 (기본값인 .next 사용)
  output: 'standalone', // Vercel 배포를 위한 output 설정
}

module.exports = nextConfig
