/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/_sitemap",
      },
    ];
  },
  images: {
    domains: ["static.ghost.org"],
  },
};
