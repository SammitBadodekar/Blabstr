/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "upload.wikimedia.org",
      "utfs.io",
      "images.pexels.com",
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
