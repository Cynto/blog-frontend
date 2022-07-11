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
  console.log(post);
  return (
    <Link href={post.url}>
      <div className="min-h-[366px]  md:mr-4 max-w-[18rem] group cursor-pointer">
        <div className="h-48 w-72 mb-4 border-2 dark:border-0 bg-black dark:bg-white rounded-xl relative">
          <Image
            loader={() => post.image}
            src={post.image}
            layout="fill"
            objectFit="cover"
            alt="article image"
            className="rounded-xl group-hover:brightness-[70%]"
          />
        </div>
        <h3 className="text-xl font-bold dark:text-slate-100 dark:group-hover:text-slate-300 group-hover:text-slate-700 ">
          {post.title}
        </h3>
        <div
          className="published-paragraph-container pt-3 pb-4 text-sm dark:text-slate-400 dark:group-hover:text-slate-500 group-hover:text-slate-600"
          style={{ WebkitLineClamp: 3 }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
        {mid ? (
          <button className="dark:bg-white border-[1px] border-slate-900 dark:border-0 rounded px-4 py-1 text-slate-900 font-bold">
            <span className="relative group-hover:after:scale-x-100 group-hover:after:origin-bottom-left after:content-{''} after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-slate-900 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out">
              Read Article
            </span>
          </button>
        ) : (
          <a></a>
        )}
      </div>
    </Link>
  );
};

export default StandardArticleShowcase;
