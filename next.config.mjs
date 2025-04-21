/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/SpliceReborn.github.io' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig; 