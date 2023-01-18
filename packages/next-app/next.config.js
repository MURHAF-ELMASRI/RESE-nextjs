/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    externalDir: true,
  },
  pageExtensions: ['page.tsx', 'api.ts'],
};

module.exports = nextConfig;
