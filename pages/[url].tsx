import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import blogPostObjInterface from '../shared/interfaces/blogPostObj.interface';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import CommentSection from '../components/articlePage/CommentSection';
import UserObjectComponent from '../components/UserObjectComponent';
const Header = dynamic(() => import('../components/Header'), { ssr: false });
import NoPictureArticleShowcase from '../components/frontPage/NoPictureArticleShowcase';
import { useSelector } from 'react-redux';
import LoadingPostComponent from '../components/LoadingPostComponent';
import Head from 'next/head';

export async function getServerSideProps(context: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${context.params.url}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await res.json();
  if (!data.post) {
    return {
      notFound: true,
    };
  }

  const postsData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/published`
  );

  const posts = await postsData.json();

  return {
    props: {
      postData: data.post.published || data.authorized ? data.post : null,
      posts,
      url: context.params.url,
    },
  };
}

const BlogPost: NextPage<{
  postData: blogPostObjInterface | null;
  posts: blogPostObjInterface[];
  url: string;
}> = ({ postData, posts, url }) => {
  const router = useRouter();
  const userObj = useSelector((state: any) => state.userObj);

  const [post, setPost] = React.useState<blogPostObjInterface | null>(null);

  useEffect(() => {
    if (!postData && userObj && userObj.isAdmin) {
      const res = fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      res
        .then((data) => data.json())
        .then((data) => {
          if (data.post) {
            setPost(data.post);
          }
        });
    } else if (
      !postData &&
      (!userObj || (userObj && !userObj.isAdmin && !userObj.initial))
    ) {
      router.push('/404');
    } else if (postData) {
      setPost(postData);
    }
    
  }, [postData, userObj]);

  

  return post ? (
    <>
    <Head>
      <title>{post.title}</title>
    </Head>
      <Header />

      <article className="h-full w-full pt-40 pb-0 dark:bg-gray-900 flex flex-col justify-center items-center">
        <div className="max-w-[300px] md:max-w-[500px] grid grid-cols-1 gap-10  justify-center items-center justify-items-center   pb-16 break-words">
          <h1
            className="text-4xl w-full font-header text-center dark:text-slate-100 break-words"
            data-testid="post-heading"
          >
            {post.title}
          </h1>
          <div
            className="h-8  flex gap-x-5 justify-around"
            data-testid="post-socials"
          >
            <div className="w-8">
              <svg viewBox="0 0 128 128" className="cursor-pointer">
                <rect
                  fill="#3d5a98"
                  x="4.83"
                  y="4.83"
                  width="118.35"
                  height="118.35"
                  rx="6.53"
                  ry="6.53"
                ></rect>
                <path
                  fill="#fff"
                  d="M86.48 123.17V77.34h15.38l2.3-17.86H86.48v-11.4c0-5.17 1.44-8.7 8.85-8.7h9.46v-16A126.56 126.56 0 0091 22.7c-13.62 0-23 8.3-23 23.61v13.17H52.62v17.86H68v45.83z"
                ></path>
              </svg>
            </div>
            <div className="w-8">
              <svg viewBox="0 0 128 128" className="cursor-pointer">
                <path
                  d="M40.254 127.637c48.305 0 74.719-48.957 74.719-91.403 0-1.39 0-2.777-.075-4.156 5.141-4.547 9.579-10.18 13.102-16.633-4.79 2.602-9.871 4.305-15.078 5.063 5.48-4.02 9.582-10.336 11.539-17.774-5.156 3.743-10.797 6.38-16.68 7.801-8.136-10.586-21.07-13.18-31.547-6.32-10.472 6.86-15.882 21.46-13.199 35.617C41.922 38.539 22.246 26.336 8.915 6.27 1.933 20.94 5.487 39.723 17.022 49.16c-4.148-.172-8.207-1.555-11.832-4.031v.41c0 15.273 8.786 28.438 21.02 31.492a21.596 21.596 0 01-11.863.543c3.437 13.094 13.297 22.07 24.535 22.328-9.305 8.918-20.793 13.75-32.617 13.72-2.094 0-4.188-.15-6.266-.446 12.008 9.433 25.98 14.441 40.254 14.422"
                  fill="#1da1f2"
                ></path>
              </svg>
            </div>
            <div className="w-8">
              <svg viewBox="0 0 128 128" className="cursor-pointer">
                <path
                  fill="#0076b2"
                  d="M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3z"
                ></path>
                <path
                  fill="#fff"
                  d="M21.06 48.73h18.11V107H21.06zm9.06-29a10.5 10.5 0 11-10.5 10.49 10.5 10.5 0 0110.5-10.49M50.53 48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75v32H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53z"
                ></path>
              </svg>
            </div>
          </div>
          <div className="grid justify-items-center">
            <span
              className="dark:text-slate-100 font-normal"
              data-testid="post-user"
            >
              Article written by: {post.user.firstName}
              <span className="ml-3" data-testid="post-date">
                ~{new Date(post.createdAt).toLocaleDateString('en-GB')}
              </span>
            </span>
            {post.createdAt !== post.updatedAt && (
              <span className="dark:text-slate-300 font-normal">
                Updated ~{new Date(post.updatedAt).toLocaleDateString('en-GB')}
              </span>
            )}
          </div>
        </div>
        <div className=" flex justify-center">
          <div className="relative w-[300px] md:w-[600px] h-[180px] max-w[300px] lg:max-w-[600px] md:h-[350px] ">
            <Image
              src={post.image}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              priority
              className="rounded-xl"
              data-testid="post-image"
            />
          </div>
        </div>
        <div className="px-12 lg:pl-56 md:pr-10 pt-10 md:pt-16 grid justify-center content-center justify-items-center lg:grid-cols-[600px_220px] gap-x-7">
          <div
            className="article-content-container font-normal dark:text-slate-400 max-w-[300px] md:max-w-[500px] break-words [&>*:not(p)]:text-2xl [&>*:not(p)]:font-header [&>*:not(p)]:mb-4 [&>*:not(p)]:dark:text-slate-100 [&>p]:mb-8 "
            dangerouslySetInnerHTML={{ __html: post.content }}
            data-testid="post-content"
          ></div>
          <div className="post-suggestions hidden lg:grid auto-rows-min gap-y-5 w-full ">
            {posts
              ? posts.map((post, index) => {
                  return index < 3 ? (
                    <NoPictureArticleShowcase key={index} post={post} mid />
                  ) : null;
                })
              : null}
          </div>
        </div>
      </article>
      <CommentSection post={post} userObj={userObj} />
    </>
  ) : (
    <>
      <Header />
      <LoadingPostComponent />
    </>
  );
};

export default BlogPost;
