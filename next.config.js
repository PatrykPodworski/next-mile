/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "naszsklep-api.vercel.app",
        pathname: "/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
