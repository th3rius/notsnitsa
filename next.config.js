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
};
