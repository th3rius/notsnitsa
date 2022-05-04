import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import {GetStaticProps} from "next";
import api from "../lib/api";

export default function Home() {
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
      <section></section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async function () {
  const posts = await api.posts.browse({limit: "all"});
  return {
    props: {posts},
    revalidate: 10,
  };
};
