import api from "../lib/api";
import Head from "next/head";
import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from "next";
import {PostOrPage} from "@tryghost/content-api";

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

      <h1>{post.title}</h1>
      {post.html && <div dangerouslySetInnerHTML={{__html: post.html}} />}
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
