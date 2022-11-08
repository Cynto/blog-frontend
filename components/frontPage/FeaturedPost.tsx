import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import blogPostObjInterface from '../../shared/interfaces/blogPostObj.interface';

const FeaturedPost = ({ posts }: { posts: blogPostObjInterface[] }) => {
  const post = posts[0];

  return (
    <div className=" w-full relative h-[40%] lg:h-[300px] flex justify-center">
      <div
        className="relative w-full h-full flex justify-center items-center pb-5 lg:pb-14 xl:pb-5 px-14"
        data-testid="featured-post"
      >
        <div className="absolute w-full h-full">
          <Image
            src={post.image}
            className="blur-sm"
            alt={post.title}
            objectFit="cover"
            objectPosition="top"
            priority
            layout="fill"
          />
        </div>

        <div className="z-10 max-w-[400px] overflow-hidden">
          <h1 className=" text-slate-900 text-xl md:text-4xl font-bold m-0  break-words">
            {post.title}
          </h1>
          <div
            className="featured-paragraph-container"
            style={{ WebkitLineClamp: 3 }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
          <Link href={`/loading/${post.url}`}>
            <button className="group   font-bold p-1.5 md:px-5 text-slate-900  dark:text-slate-100 bg-white  dark:bg-gray-900  rounded">
              <span className="relative group-hover:after:scale-x-100 group-hover:after:origin-bottom-left after:content-{''} after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 dark:after:bg-slate-50 after:bg-slate-900 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out">
                Read Article
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
