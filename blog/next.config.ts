/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    // 빌드 시 ESLint 오류를 무시하고 진행하도록 설정
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig
