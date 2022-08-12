import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import blogPostObjInterface from '../../shared/interfaces/blogPostObj.interface';

const StandardArticleShowcase = ({
  mid,
  post,
}: {
  mid: boolean;
  post: blogPostObjInterface;
}) => {
  const maxWidth = mid ? '18rem' : '12rem';
  const maxImageHeight = mid ? '12rem' : '6rem';
  const minHeight = mid ? '366px' : 'min-content';
  const fontSize = mid ? 'text-xl' : 'text-md';
  const contentPaddingTop = mid ? '0.7rem' : '0.3rem';
  const contentPaddingBottom = mid ? '1rem' : '0.3rem';

  return (
    <Link href={post.url}>
      <div
        className={`mb-6 md:mb-0 md:mr-4 group cursor-pointer flex flex-col justify-between items-start`}
        style={{
          minHeight: minHeight,
          maxWidth: maxWidth,
        }}
      >
        <div
          className={` mb-4 border-2 dark:border-0 bg-black dark:bg-white rounded-xl relative`}
          style={{
            minHeight: maxImageHeight,
            width: maxWidth,
          }}
        >
          <Image
            loader={() => post.image}
            src={post.image}
            layout="fill"
            objectFit="cover"
            alt="article image"
            className="rounded-xl group-hover:brightness-[70%]"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between w-full">
          <h4
            className={`${fontSize} font-bold dark:text-slate-100 dark:group-hover:text-slate-300 group-hover:text-slate-700 `}
          >
            {post.title}
          </h4>
          <div
            className="published-paragraph-container  text-sm dark:text-slate-400 dark:group-hover:text-slate-500 group-hover:text-slate-600"
            style={{
              WebkitLineClamp: 3,
              paddingTop: contentPaddingTop,
              paddingBottom: contentPaddingBottom,
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
          <div className="flex justify-between mt-1 w-full">
            <span className="dark:text-slate-100 mb-4 block font-normal">
              Written by {post.user.firstName}
            </span>
            <Link href={`/${post.url}#comments`}>
              <div className="flex items-start h-min cursor-pointer dark:text-slate-100 hover:text-blue-500  dark:hover:text-blue-500 ">
                <span className="h-min block">{post.comments?.length}</span>

                <span className="material-symbols-outlined text-xl font-extralight">
                  comment
                </span>
              </div>
            </Link>
          </div>
        </div>
        {mid ? (
          <button className="dark:bg-white border-[1px] border-slate-900 dark:border-0 rounded px-4 py-1 text-slate-900 font-bold">
            <span className="relative group-hover:after:scale-x-100 group-hover:after:origin-bottom-left after:content-{''} after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-slate-900 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out">
              Read Article
            </span>
          </button>
        ) : (
          <a
            className=" text-sm text-slate-900 group-hover:text-slate-500
          dark:text-slate-50 dark:group-hover:text-slate-300 w-max relative after:content-{''} after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 dark:after:bg-slate-50 dark:group-hover:after:bg-slate-300 after:bg-slate-900 group-hover:after:bg-slate-500"
          >
            Read Article
          </a>
        )}
      </div>
    </Link>
  );
};

export default StandardArticleShowcase;
