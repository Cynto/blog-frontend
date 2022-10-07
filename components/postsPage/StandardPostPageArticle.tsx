import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import blogPostObjInterface from '../../shared/interfaces/blogPostObj.interface';
import UserObj from '../../shared/interfaces/userObj.interface';
import ReadEditDeleteButtons from './ReadEditDeleteButtons';

const StandardPostPageArticle = ({
  post,
  userObj,
}: {
  post: blogPostObjInterface;
  userObj: false | UserObj | null;
}) => {
  return (
    <div className="post flex flex-col justify-between">
      <div className="mb-4 h-60 border-2 dark:border-0 bg-black dark:bg-white rounded-xl relative">
        <Image
          
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
        <span className="dark:text-slate-100 mb-4 block font-normal ">
          Written by {post.user.firstName}
        </span>
        <Link href={`/loading/${post.url}#comments`}>
          <div className="flex items-start h-min cursor-pointer  hover:text-blue-500  dark:hover:text-blue-500">
            <span className="h-min block">{post.comments?.length}</span>

            <span className="material-symbols-outlined text-xl font-extralight">
              comment
            </span>
          </div>
        </Link>
      </div>
      <ReadEditDeleteButtons userObj={userObj} post={post} />
    </div>
  );
};

export default StandardPostPageArticle;
