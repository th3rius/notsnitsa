import {GetServerSideProps} from "next";
import api from "../lib/api";
import {DateTime} from "luxon";
import xml from "xml";

const BLOG_URL = process.env.BLOG_URL!;

// Generates a dynamic sitemap.xml. A sitemap defines the
// relationship between pages of the site. Search engines
// utilize this file to more accurately index the site.
// See: https://developers.google.com/search/docs/advanced/sitemaps/overview
export const getServerSideProps: GetServerSideProps = async ({res}) => {
  const posts = await api.posts.browse({limit: "all"});
  res.setHeader("Content-Type", "text/xml");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1200, stale-while-revalidate=600"
  );
  res.write(
    xml(
      {
        urlset: [
          {_attr: {xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9"}},
          ...posts.map((post) => ({
            url: [
              {
                loc: `${BLOG_URL}/${post.slug}`,
              },
              {
                lastmod: DateTime.fromISO(post.updated_at!).toISODate(),
              },
            ],
          })),
        ],
      },
      {declaration: true}
    )
  );
  res.end();
  return {
    props: {},
  };
};

function Sitemap() {
  return null;
}

export default Sitemap;
