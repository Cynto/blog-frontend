import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface Props {
  posts: [
    {
      _id: string;
      title: string;
      content: string;
      image: string;
      user: {
        _id: string;
        firstName: string;
        lastName: string;
      };
      featured: boolean;
      tags: string[];
      published: boolean;
      createdAt: string;
      updatedAt: string;
    }
  ];
}

const FeaturedPost = ({ posts }: Props) => {
  const router = useRouter();
  return (
    <div className=" w-full relative sm:h-[40%] lg:h-[300px]">
      {posts
        ? posts.map((post, index) => {
            return post.featured ? (
              <div
                className="relative w-full h-full grid lg:justify-center items-end pb-5 lg:pb-14 xl:pb-5 px-14"
                key={index}
              >
                <div className="absolute w-full h-full">
                  <Image
                    loader={() => post.image}
                    src={post.image}
                    className="blur-sm"
                    alt={post.title}
                    objectFit="cover"
                    objectPosition="top"
                    layout="fill"
                  />
                </div>

                <div className=" xl:max-w-[37%] lg:max-w-[50%] md:max-w-[60%]     -translate-x-0  overflow-hidden">
                  <h1 className=" text-slate-900 text-xl md:text-4xl font-bold m-0  break-words">
                    {post.title}
                  </h1>
                  <div
                    className="featured-paragraph-container"
                    style={{ WebkitLineClamp: 3 }}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></div>
                  <button
                    className="   font-bold p-1.5 md:px-5 text-slate-900  dark:text-slate-100 bg-white hover:bg-slate-100 dark:bg-gray-900 dark:hover:bg-gray-800 rounded"
                    onClick={() => router.push(`/${post.title}`)}
                  >
                    Read Article
                  </button>
                </div>
              </div>
            ) : null;
          })
        : null}
    </div>
  );
};

export default FeaturedPost;
