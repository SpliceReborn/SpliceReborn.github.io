/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    formats: ['image/webp'],
    remotePatterns: [],
    minimumCacheTTL: 60,
  },
};

export default nextConfig; 