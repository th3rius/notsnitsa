import api from "lib/api";

import {PostOrPage, PostsOrPages} from "@tryghost/content-api";
import {DateTime} from "luxon";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import Head from "next/head";
import Link from "next/link";

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
    <div className="wrapper">
      <Head>
        <title>Notsnitsa</title>
        <meta name="description" content="black magic code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="header">
        <h1>Notsnitsa</h1>
        <p className="description">black magic code</p>
      </header>
      <section>
        {posts.map((post) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </section>
      <style jsx>{`
        .header {
          padding: 0 1em;
          text-align: center;
          max-width: 50em;
          margin: 3em auto 4em;
        }

        .wrapper {
          max-width: 768px;
          padding: 0.5em 1.6rem;
          margin: 0 auto;
        }

        .description {
          color: #444;
          font-size: 1.1em;
          margin-top: 0.5em;
          line-height: 1.5;
        }

        .post-title {
          color: #333;
        }
      `}</style>
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
