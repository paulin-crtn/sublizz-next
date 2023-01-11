/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      `${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.eu-west-3.amazonaws.com`,
    ],
  },
};

module.exports = nextConfig;
