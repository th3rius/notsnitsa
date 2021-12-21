/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  rewrites: function () {
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
