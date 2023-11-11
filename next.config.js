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
  // prod
  assetPrefix: "https://nimble-figolla-41e82f.netlify.app/",
  images: {
    domains: ["https://nimble-figolla-41e82f.netlify.app/"],
    path: `${"https://nimble-figolla-41e82f.netlify.app"}/_next/image`,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // async rewrites() {
  //   return [
  //     // Rewrite assets to use the correct absolute path
  //     {
  //       source: "/_next/:path*",
  //       destination: "https://nimble-figolla-41e82f.netlify.app/_next/:path*",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
