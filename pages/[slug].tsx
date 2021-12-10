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
  return (
    <div>
      <Head>
        <title>{post.title}</title>
      </Head>

      <header className={styles.header}>
        <h1 className={styles.blogTitle}>
          <Link href="/">Notsnitsa</Link>
        </h1>
      </header>

      <article className={styles.wrapper}>
        <div className={styles.info}>
          <h2 className={styles.title}>{post.title}</h2>
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
    const post = await api.posts.read({slug: context.params!.slug});
    if (!post) {
      return {
        notFound: true,
      };
    }
    return {
      props: {post},
    };
  };

export default Post;
