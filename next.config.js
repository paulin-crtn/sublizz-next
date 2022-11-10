/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "unnpkjktcopeemblwjer.supabase.co",
      "picsum.photos",
      "images.unsplash.com",
      "loremflickr.com",
      "cloudflare-ipfs.com",
    ],
  },
};

module.exports = nextConfig;
