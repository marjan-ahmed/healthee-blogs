import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'plus.unsplash.com',
        protocol: 'https'
      },
      {
        hostname: 'images.unsplash.com',
        protocol: 'https'
      },
      {
        hostname: 'via.placeholder.com',
        protocol: 'https'
      },
      {
        hostname: 'cdn.sanity.io',
        protocol: 'https'
      }
    ]
  }
};

export default nextConfig;
