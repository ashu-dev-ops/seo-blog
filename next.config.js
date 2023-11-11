/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // basePath: "https://nimble-figolla-41e82f.netlify.app/",
  assetPrefix: "https://nimble-figolla-41e82f.netlify.app/",
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
