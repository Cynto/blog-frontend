import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import blogPostObjInterface from '../shared/interfaces/blogPostObj.interface';
import { NextPage } from 'next';
import Header from '../components/Header';
import NoPictureArticleShowcase from '../components/frontPage/NoPictureArticleShowcase';
import useUserObject from '../hooks/useUserObject';

export async function getServerSideProps(context: any) {
  const articleData = await fetch(
    `http://localhost:4000/posts/${context.params.url}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const post = await articleData.json();

  const postsData = await fetch('http://localhost:4000/posts', {
    method: 'GET',
    headers: {
      frontpage: 'true',
    },
  });

  const posts = await postsData.json();

  return {
    props: {
      post,
      posts,
    },
  };
}

const BlogPost: NextPage<{
  post: blogPostObjInterface;
  posts: blogPostObjInterface[];
}> = ({ post, posts }) => {
  const userHookObject = useUserObject();
  const { userObj } = userHookObject;
  return (
    <>
      <Header userObj={userObj} />

      <article className="h-full w-full pt-40">
        <div className="grid grid-cols-1 gap-10  justify-center items-center justify-items-center   pb-16 px-64">
          <h1 className="text-4xl font-header text-center">{post.title}</h1>
          <div className="h-8  flex gap-x-5 justify-around">
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
        </div>
        <div className="px-28">
          <div className="relative w-full h-[350px] ">
            <Image
              loader={() => post.image}
              src={post.image}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              className="rounded-xl"
            />
          </div>
        </div>
        <div className="pl-56 pr-10 pt-16 grid md:grid-cols-[1fr_220px] gap-x-7">
          <div
            className="font-normal"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
          <div className="">
            {posts.map((post, index) => {
              return index < 2 ? (
                <NoPictureArticleShowcase key={index} post={post} mid />
              ) : null;
            })}
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;