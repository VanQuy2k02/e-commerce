import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'images.unsplash.com',
      'cdn.your-backend.com',
      'cloudflare-ipfs.com',
    ],
  },
};

export default nextConfig;
