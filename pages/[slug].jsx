import { DateTime } from 'luxon';
import Head from 'next/head';
import Image from 'next/image';
import Newsletter from '../components/Newsletter';
import Navbar from '../components/Navbar';
import Tag from '../components/Tag';
import ghost from '../lib/ghost';
import globalStyles from '../styles/global';
import utilStyles from '../styles/util';
import ReactHtmlParser from 'react-html-parser';
import React from 'react';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';
import Prism from 'prismjs';
import prisma from '../styles/prisma';

function Post({ post, related }) {
  const router = useRouter();

  function transformContent(node, index) {
    React.useEffect(() => {
      Prism.highlightAll();
    }, []);

    // if (node.type === 'text') {
    //   return Prism.highlight(node.data, Prism.languages.html, 'html');
    // }

    switch (node.name) {
      // Transform normal image tags into next optimized images
      case 'img':
        const { width, height, src } = node.attribs;
        return (
          <Image
            // @ts-expect-error it's okay to use `fill` if the image's height
            // are width are not defined
            layout={height && width ? 'responsive' : 'fill'}
            width={width}
            height={height}
            src={src}
          />
        );
      // TODO: style `hr` tags
      case 'hr':
        return null;
    }
  }

  // If the page is not yet generated, this will be displayed initially until
  // getStaticProps() finishes running
  if (router.isFallback) {
    // TODO: create a loading component
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta
          name='description'
          content={post.custom_excerpt ?? post.excerpt}
        />
        <meta property='og:title' content={post.title} />
        <meta
          property='og:description'
          content={post.custom_excerpt ?? post.excerpt}
        />
        <meta property='og:image' content={post.feature_image} />
      </Head>
      <Navbar />
      <div className='display gutter'>
        <div className='header'>
          <h1 className='title'>{post.title}</h1>
          <p className='excerpt'>{post.custom_excerpt}</p>
          <div className='info'>
            <div className='info-text'>
              <div>
                <span className='secondary small'>by</span>{' '}
                <span className='small'>{post.primary_author.name}</span>
              </div>
              <span className='divider'>—</span>
              <br />
              <span className='small'>
                {DateTime.fromISO(post.published_at).toFormat('MMMM dd, yyyy')}
              </span>
              <br />
                {/*core-js keeps breaking this*/}
                {/*<p>{readingTime(post)}</p>*/}
              <span className='small'>4 minute read</span>
            </div>
            <div className='tags'>
              {post.tags.map(({ url, name }) => (
                <Tag url={url}>{name}</Tag>
              ))}
            </div>
          </div>
        </div>
        {/*TODO: make this overflow*/}
        <div className='feature'>
          <Image
            src={post.feature_image}
            className='feature-img'
            layout='fill'
            objectFit='contain'
            objectPosition='left top'
            priority
          />
        </div>
      </div>
      <div className='content gutter'>
        <div className='body'>
          {ReactHtmlParser(post.html, {
            transform: transformContent,
          })}
        </div>
        <aside>
          <div className='latest'>
            <strong>The Latest</strong>
            <div className='latest-tags'>
              <span className='small secondary'>View more from</span>
              <div className='tags'>
                {related
                  // Get all tags from related posts
                  .flatMap(({ tags }) => tags)
                  // Some tags may appear more than once
                  .filter((tag, index, tags) => tag === tags[0])
                  .map(({ url, name }) => (
                    <Tag url={url}>{name}</Tag>
                  ))}
              </div>
            </div>
          </div>
          <div className='related'>
            {related.map(p => (
              <div className='related-post'>{p.title}</div>
            ))}
          </div>
        </aside>
      </div>
      <Newsletter />
      <Footer />
      <style jsx>{`
        .display {
          gap: 40px;
          margin-bottom: 70px;
          display: flex;
        }

        .header {
          flex: 50%;
        }

        .gutter {
          padding-right: 140px;
          padding-left: 140px;
        }

        .title {
          font-size: 60px;
          line-height: 78px;
          font-weight: normal;
          margin-top: 0;
        }

        .excerpt {
          font-size: 35px;
          margin-top: 40px;
          margin-bottom: 40px;
          line-height: 42px;
        }

        .feature {
          position: relative;
          flex: 50%;
        }

        .info {
          display: flex;
        }

        .info-text {
          width: 50%;
        }

        .content {
          display: flex;
          justify-content: space-between;
          margin-bottom: 60px;
        }

        .related {
          display: flex;
          flex-direction: column;
          width: 375px;
          gap: 2px;
          margin-top: 20px;
        }

        .related-post {
          background-color: #fbfafa;
          padding: 30px;
          font-size: 19px;
        }

        .latest {
          padding: 10px 25px;
        }

        .latest > strong {
          display: inline-block;
          font-size: 20px;
          margin-bottom: 15px;
        }

        .latest-tags {
          display: flex;
          gap: 10px;
        }

        .divider {
          color: rgb(213, 213, 213);
          line-height: 0;
          margin-bottom: -10px;
        }
      `}</style>
      <style jsx>{utilStyles}</style>
      <style jsx global>
        {globalStyles}
      </style>
      <style jsx global>
        {prisma}
      </style>
      <style jsx global>{`
        .body {
          width: 80ch;
        }

        .body p,
        li {
          font-size: 20px;
        }

        figure {
          margin: 60px 0;
        }

        figcaption {
          text-align: center;
          color: rgb(86, 86, 86);
          margin-top: 20px;
          font-size: 16px;
        }
      `}</style>
    </>
  );
}

export async function getStaticProps(context) {
  const slug = context.params.slug;
  // The current post being read including authors and tags
  const post = await ghost.posts.read(
    { slug },
    { include: ['authors', 'tags'] },
  );
  // To get related posts, this will query ghost for 5 posts where its tags
  // match the current post tags
  const tags = post.tags.map(({ slug }) => `tag:${slug}`);
  const current = `id:-${post.id}`; // Exclude itself from the query
  const filter = [tags, current].flat().join('+');
  const related = await ghost.posts.browse({
    filter,
    limit: 5,
    include: ['tags'],
  });
  return {
    props: {
      post,
      related,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const posts = await ghost.posts.browse();
  return {
    paths: posts.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}

export default Post;
