/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: false,
    formats: ['image/webp'],
    remotePatterns: [],
    minimumCacheTTL: 60,
  },
};

export default nextConfig; 