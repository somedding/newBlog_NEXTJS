import { config } from 'dotenv';
config();

const nextConfig = {
  experimental: {
    serverActions: true,
    typedRoutes: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  typescript: {
    ignoreBuildErrors: true, // 일시적으로 타입 에러 무시
  }
};

export default nextConfig; 