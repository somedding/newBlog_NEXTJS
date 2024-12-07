/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    // 타입 체크 에러가 있어도 빌드 진행
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLint 에러가 있어도 빌드 진행
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000']
    }
  },
  images: {
    domains: ['avatars.githubusercontent.com'], // GitHub 프로필 이미지를 위한 설정
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com',
        pathname: '/images/**',
      },
    ],
  },
  env: {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_TO: process.env.EMAIL_TO,
  }
}

module.exports = nextConfig