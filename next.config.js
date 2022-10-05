/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["picsum.photos", "images.unsplash.com", "loremflickr.com"],
  },
};

module.exports = nextConfig;
