import api from "../lib/api";
import Head from "next/head";
import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import {PostOrPage} from "@tryghost/content-api";
import styles from "../styles/Post.module.css";
import Link from "next/link";
import {DateTime} from "luxon";

const BLOG_URL = process.env.BLOG_URL!;

export type PostProps = {
  post: PostOrPage;
};

export type PostParams = {
  slug: string;
};

function Post({post}: InferGetStaticPropsType<typeof getStaticProps>) {
  const title = post.title ?? "(Untitled)";
  const url = `${BLOG_URL}/${post.slug}`;
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
    <div>
      <Head>
        <title>{post.meta_title ?? title}</title>
        {metaDescription && (
          <meta name="description" content={metaDescription} />
        )}
        <link rel="canonical" href={post.canonical_url ?? url} />
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
      <header className={styles.header}>
        <Link href="/">
          <a className={styles.blogTitle}>Notsnitsa</a>
        </Link>
      </header>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <h1 className={styles.title}>{title}</h1>
          <time className="small mute" dateTime={createdAt.toISODate()}>
            {createdAt.toFormat("LLLL d, yyyy")}
          </time>
        </div>
        {post.html && (
          <main
            className={styles.body}
            dangerouslySetInnerHTML={{__html: post.html}}
          />
        )}
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async function () {
  const posts = await api.posts.browse({limit: "all"});
  const paths = posts.map((post) => ({
    params: {slug: post.slug},
  }));
  return {paths, fallback: "blocking"}; // FIXME
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
