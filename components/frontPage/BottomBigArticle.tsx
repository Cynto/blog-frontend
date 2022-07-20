import React from 'react';
import Image from 'next/image';
import blogPostObjInterface from '../../shared/interfaces/blogPostObj.interface';
import Link from 'next/link';

const BottomBigArticle = ({ post }: { post: blogPostObjInterface }) => {
  return (
    <Link href={post.url}>
      <div className="group cursor-pointer max-w-[500px] min-h-[342px]  max-h-[528px]">
        <div className="w-full min-h-[159px] h-[30%] md:h-[70%] relative mb-5">
          <Image
            loader={() => post.image}
            src={post.image}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="rounded-xl group-hover:brightness-[70%]"
          />
        </div>
        <div>
          <h4 className="text-xl font-bold group-hover:text-slate-700  dark:text-slate-100 dark:group-hover:text-slate-300">
            {post.title}
          </h4>
          <div
            className="published-suggestions-paragraph-container pt-3 pb-4 text-sm group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-500"
            style={{ WebkitLineClamp: 3 }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
          <button className="dark:bg-white border-[1px] border-slate-900 dark:border-0 rounded px-4 py-1 text-slate-900 font-bold">
            <span className="relative group-hover:after:scale-x-100 group-hover:after:origin-bottom-left after:content-{''} after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-slate-900 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out">
              Read Article
            </span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default BottomBigArticle;
