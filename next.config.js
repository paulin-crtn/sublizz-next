/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "lacartedeslogements-user-profile-pictures.s3.eu-west-3.amazonaws.com",
      "lacartedeslogements-lease-images.s3.eu-west-3.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
