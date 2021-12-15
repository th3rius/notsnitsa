import api from "../lib/api";
import Head from "next/head";
import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import {PostOrPage} from "@tryghost/content-api";
import styles from "../styles/Post.module.css";
import Link from "next/link";
import {DateTime} from "luxon";
import Footer from "../components/Footer";

export type PostProps = {
  post: PostOrPage;
};

export type PostParams = {
  slug: string;
};

function Post({post}: InferGetStaticPropsType<typeof getStaticProps>) {
  const title = post.title ?? "(Untitled)";
  const description = post.custom_excerpt ?? post.excerpt;
  const metaDescription = post.meta_description ?? description;
  const tags = post.tags?.map((tag) => tag.name).join(", ");
  const ogDescription = post.og_description ?? description;
  const ogImage = post.og_image ?? post.feature_image ?? undefined;
  const twitterDescription = post.twitter_description ?? description;
  const twitterImage = post.twitter_image ?? post.feature_image ?? undefined;
  const twitterCreator = post.primary_author?.twitter
    ? `@${post.primary_author?.twitter}`
    : undefined;

  return (
    <div>
      <Head>
        <title>{post.meta_title ?? title}</title>
        {metaDescription && (
          <meta name="description" content={metaDescription} />
        )}
        <link rel="canonical" href={post.canonical_url ?? post.url} />
        {tags ?? <meta name="keywords" content={tags} />}
        <meta property="og:title" content={post.og_title ?? title} />
        {ogDescription && (
          <meta property="og:description" content={ogDescription} />
        )}
        <meta property="og:url" content={post.url} />
        {post.og_image && <meta property="og:image" content={ogImage} />}
        <meta name="twitter:title" content={post.twitter_title ?? title} />
        {twitterDescription ?? (
          <meta name="twitter:description" content={twitterDescription} />
        )}
        {twitterImage && <meta name="twitter:image" content={twitterImage} />}
        <meta
          name="twitter:card"
          content={twitterImage ? "summary_large_image" : "summary"}
        />
        <meta name="twitter:creator" content={twitterCreator} />
      </Head>
      <header className={styles.header}>
        <h1 className={styles.blogTitle}>
          <Link href="/">Notsnitsa</Link>
        </h1>
      </header>
      <article className={styles.wrapper}>
        <div className={styles.info}>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.date}>
            {DateTime.fromISO(post.created_at!).toFormat("LLLL d, yyyy")}
          </span>
        </div>
        {post.html && (
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{__html: post.html}}
          />
        )}
      </article>
      <Footer />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async function () {
  const posts = await api.posts.browse({limit: "all"});
  const paths = posts.map((post) => ({
    params: {slug: post.slug},
  }));
  return {paths, fallback: false};
};

export const getStaticProps: GetStaticProps<PostProps, PostParams> =
  async function getStaticProps(context) {
    const post = await api.posts.read(
      {slug: context.params!.slug},
      {include: "authors"}
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
