import Navbar from '../components/navbar';
import ghost from '../lib/ghost';
import * as React from 'react';
import Share from '../components/share';
import Head from 'next/head';

function Post({ post }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta
          name="description"
          content={post.custom_excerpt ?? post.excerpt}
        />
      </Head>
      <Navbar />
      <Share />
      <div className="wrapper match-braces autolinker">
        <div className="header">
          <p className="tag">{post.tags.map(t => t.name).join(', ')}</p>
          <h1 className="title">{post.title}</h1>
          <p className="excerpt">{post.custom_excerpt ?? post.excerpt}</p>
          <div>
            {/*<p>{readingTime(post)}</p>*/}
            <p>{post.primary_author?.name}</p>
          </div>
        </div>
        <div>
          <img
            src={`https://pixel-e23lyd4foa-rj.a.run.app?src=${encodeURIComponent(
              post.feature_image,
            )}&format=webp&width=1040`}
            className="feature-img"
            alt="Featured"
          />
          <p />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.html }} className="body" />
      </div>

      <style jsx>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 64px;
          text-rendering: optimizeLegibility;
          color: #202124;
        }

        .tag {
          color: #424874;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 0;
        }

        .title {
          font-size: 3rem;
          margin-top: 0;
        }

        .excerpt {
          font-size: 16px;
          line-height: 1.5;
        }

        .header {
          margin-top: 15px;
          padding: 25px;
          width: 100%;
          max-width: 700px;
        }

        .body {
          max-width: 700px;
          font-weight: 200;
          font-size: 18px;
          line-height: 1.5;
          padding: 25px;
        }

        @media (min-width: 1170px) {
          .feature-img {
            max-width: 1040px;
            border-radius: 3px;
          }
        }
      `}</style>

      <style jsx global>{`
        img {
          max-width: 100%;
        }

        ul {
          margin: 0 0 1.5em;
        }

        li {
          margin: 0.5em 0;
        }

        blockquote {
          margin: 0 0 1.5em;
          padding: 0 1.5em;
          border-left: 3px solid #a6b1e1;
        }

        code {
          padding: 0 5px 2px;
          background-color: #f4eeff;
        }
      `}</style>
    </>
  );
}

export async function getStaticProps(context) {
  const slug = context.params.slug;
  const post = await ghost.posts.read(
    { slug },
    { include: ['authors', 'tags'] },
  );
  return { props: { post } };
}

export async function getStaticPaths() {
  const posts = await ghost.posts.browse();
  return {
    paths: posts.map(p => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export default Post;
