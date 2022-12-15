/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["unnpkjktcopeemblwjer.supabase.co"],
  },
};

module.exports = nextConfig;
