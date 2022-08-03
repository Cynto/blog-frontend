import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import blogPostObjInterface from '../../shared/interfaces/blogPostObj.interface';
import UserObj from '../../shared/interfaces/userObj.interface';

const StandardPostPageArticle = ({
  mid,
  post,
  userObj,
}: {
  mid: boolean;
  post: blogPostObjInterface;
  userObj: false | UserObj | null;
}) => {
  return (
    <div className="flex flex-col justify-between">
      <div className="mb-4 h-60 border-2 dark:border-0 bg-black dark:bg-white rounded-xl relative">
        <Image
          loader={() => post.image}
          src={post.image}
          layout="fill"
          objectFit="cover"
          alt="article image"
          className="rounded-xl group-hover:brightness-[70%]"
        />
      </div>
      <h4 className=" font-bold dark:text-slate-100 dark:group-hover:text-slate-300 group-hover:text-slate-700 ">
        {post.title}
      </h4>
      <div
        className=" published-paragraph-container  text-sm dark:text-slate-400 dark:group-hover:text-slate-500 group-hover:text-slate-600"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
      <div className="flex justify-between mt-1">
        <span className="dark:text-slate-100 mb-4 block font-normal">
          Written by {post.user.firstName}
        </span>
        <Link href={`/${post.url}#comments`}>
          <div className="flex items-start h-min cursor-pointer ">
            <span className="h-min">{post.comments?.length}</span>

            <span className="material-symbols-outlined font-extralight">
              comment
            </span>
          </div>
        </Link>
      </div>

      <div className="w-full flex justify-around">
        <Link href={`/${post.url}`}>
          <button className="group dark:bg-white border-[1px] border-slate-900 dark:border-0 rounded px-4 py-1 text-slate-900 font-bold">
            <span className="relative group-hover:after:scale-x-100 group-hover:after:origin-bottom-left after:content-{''} after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-slate-900 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out">
              Read Article
            </span>
          </button>
        </Link>

        {(userObj && userObj.isAdmin) ||
        (userObj && userObj._id === post.user._id) ? (
          <>
            <button className="group  dark:bg-white border-[1px] border-slate-900 dark:border-0 rounded px-4 py-1 text-slate-900 font-bold">
              <span className="relative group-hover:after:scale-x-100 group-hover:after:origin-bottom-left after:content-{''} after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-slate-900 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out">
                Edit Article
              </span>
            </button>
            <button className="group  dark:bg-white border-[1px] border-slate-900 dark:border-0 rounded px-4 py-1 text-slate-900 font-bold">
              <span className="relative group-hover:after:scale-x-100 group-hover:after:origin-bottom-left after:content-{''} after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-slate-900 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out">
                Delete Article
              </span>
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default StandardPostPageArticle;
