import Head from "next/head";
import styles from "../styles/Home.module.css";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import api from "../lib/api";
import {PostOrPage, PostsOrPages} from "@tryghost/content-api";
import Link from "next/link";
import {DateTime} from "luxon";

export interface PostPreviewProps {
  post: PostOrPage;
}

function PostPreview({post}: PostPreviewProps) {
  const createdAt = DateTime.fromISO(post.created_at!);

  return (
    <div key={post.id}>
      <h2>
        <Link href={post.url!}>
          <a>{post.title}</a>
        </Link>
      </h2>
      <time dateTime={createdAt.toISODate()} className="mute">
        {createdAt.toFormat("LLLL d, yyyy")}
      </time>
      <div>{post.custom_excerpt ?? post.excerpt}</div>
    </div>
  );
}

export type HomeProps = {
  posts: PostsOrPages;
};

function Home({posts}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Notsnitsa</title>
        <meta name="description" content="black magic code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1>Notsnitsa</h1>
        <p className={styles.description}>black magic code</p>
      </header>
      <section>
        {posts.map((post) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async function () {
  const posts = await api.posts.browse({limit: "all"});
  return {
    props: {posts},
    revalidate: 10,
  };
};

export default Home;
