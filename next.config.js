/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "**",
  //     },
  //   ],
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,

  // dev
  // assetPrefix: "http://localhost:3000/",

  // images: {
  //   domains: ["http://localhost:3000/"],
  //   path: `${"http://localhost:3000"}/_next/image`,
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "**",
  //     },
  //   ],
  // },
 

  // prod heroku

  assetPrefix: "https://powerblog-39d6a2c7be5e.herokuapp.com/",
  images: {
    domains: ["https://powerblog-39d6a2c7be5e.herokuapp.com/"],
    path: `${"https://powerblog-39d6a2c7be5e.herokuapp.com"}/_next/image`,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
