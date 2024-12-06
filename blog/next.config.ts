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
  }
}

module.exports = nextConfig
