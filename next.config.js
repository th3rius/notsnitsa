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
      {
        source: "/:slug/amp",
        destination: "/:slug?amp=1",
      },
    ];
  },
};
