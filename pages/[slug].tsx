import Tag from "components/Tag";
import api from "lib/api";
import cardStyles from "styles/card";
import nordStyles from "styles/nord";
import theme from "styles/theme";

import {PostOrPage} from "@tryghost/content-api";
import {DateTime} from "luxon";
import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import Head from "next/head";
import Link from "next/link";

export type PostProps = {
  post: PostOrPage;
};

export type PostParams = {
  slug: string;
};

function Post({post}: InferGetStaticPropsType<typeof getStaticProps>) {
  const title = post.title ?? "(Untitled)";
  const url = (post.canonical_url ?? post.url)!;
  const description = post.custom_excerpt ?? post.excerpt;
  const metaDescription = post.meta_description ?? description;
  const keywords = post.tags?.map((tag) => tag.name).join(", ");
  const ogDescription = post.og_description ?? description;
  const ogImage = post.og_image ?? post.feature_image ?? undefined;
  const twitterDescription = post.twitter_description ?? description;
  const twitterImage = post.twitter_image ?? post.feature_image ?? undefined;
  const twitterCreator = post.primary_author?.twitter
    ? `@${post.primary_author?.twitter}`
    : undefined;
  const createdAt = DateTime.fromISO(post.created_at!);

  return (
    <div className="line-numbers">
      <Head>
        <title>{post.meta_title ?? title}</title>
        {metaDescription && (
          <meta name="description" content={metaDescription} />
        )}
        <link rel="canonical" href={url} />
        {keywords && <meta name="keywords" content={keywords} />}
        <meta property="og:title" content={post.og_title ?? title} />
        {ogDescription && (
          <meta property="og:description" content={ogDescription} />
        )}
        <meta property="og:url" content={url} />
        {post.og_image && <meta property="og:image" content={ogImage} />}
        <meta name="twitter:title" content={post.twitter_title ?? title} />
        {twitterDescription && (
          <meta name="twitter:description" content={twitterDescription} />
        )}
        {twitterImage && <meta name="twitter:image" content={twitterImage} />}
        <meta
          name="twitter:card"
          content={twitterImage ? "summary_large_image" : "summary"}
        />
        {twitterCreator && (
          <meta name="twitter:creator" content={twitterCreator} />
        )}
      </Head>
      <header className="header">
        <Link href="/">
          <a className="blogTitle">Notsnitsa</a>
        </Link>
      </header>
      <div className="wrapper">
        <div className="info">
          <h1 className="title">{title}</h1>
          <time className="small mute" dateTime={createdAt.toISODate()}>
            {createdAt.toFormat("LLLL d, yyyy")}
          </time>
        </div>
        {post.html && (
          <main
            className="body"
            dangerouslySetInnerHTML={{__html: post.html}}
          />
        )}
      </div>
      {post.tags?.map((tag) => (
        <Tag>{tag.name}</Tag>
      ))}
      <style jsx>
        {`
          .header {
            padding: 8px 1.6rem;
            opacity: 0.4;
            transition: 0.4s opacity;
          }

          .header:hover {
            opacity: 1;
          }

          .blogTitle {
            font-size: 1.6rem;
            font-family: ${theme.fontSerif};
            font-weight: bold;
            color: #111;
          }

          .info {
            text-align: center;
            margin-top: 2.25rem;
            margin-bottom: 3rem;
          }

          .wrapper {
            max-width: 768px;
            padding: 0.5em 1.6rem;
            margin: 0 auto;
          }

          .body {
            margin-bottom: 8rem;
            word-wrap: break-word;
          }
        `}
      </style>
      <style jsx global>
        {cardStyles}
      </style>
      <style jsx global>
        {nordStyles}
      </style>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async function () {
  const posts = await api.posts.browse({limit: "all"});
  const paths = posts.map((post) => ({
    params: {slug: post.slug},
  }));
  return {paths, fallback: "blocking"};
};

export const getStaticProps: GetStaticProps<PostProps, PostParams> =
  async function getStaticProps(context) {
    const post = await api.posts.read(
      {slug: context.params!.slug},
      {include: ["authors", "tags"]}
    );
    if (!post) {
      return {
        notFound: true,
      };
    }
    return {
      props: {post},
      revalidate: 10,
    };
  };

export default Post;
