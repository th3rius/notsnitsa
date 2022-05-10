import Head from "next/head";
import styles from "../styles/Home.module.css";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import api from "../lib/api";
import {PostsOrPages} from "@tryghost/content-api";
import {DateTime} from "luxon";

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
      <section className={styles.wrapper}>
        {posts.map((post) => (
          <div key={post.uuid}>
            <h2 className={styles.postTitle}>
              <a className={styles.uUrl}>{post.title}</a>
            </h2>
            <time>{}</time>
          </div>
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
