import React from 'react';
import Link from 'next/link';
import blogPostObjInterface from '../../shared/interfaces/blogPostObj.interface';

const NoPictureArticleShowcase = ({
  post,
  mid,
}: {
  post: blogPostObjInterface;
  mid: boolean;
}) => {
  const titleFontSize = mid ? '0.9rem' : '1.2rem';
  return (
    <Link href={post.url}>
      <div
        className="mid-right-suggestion grid w-max max-w-[220px] min-w-[180px] h-min overflow-hidden cursor-pointer group"
        title={post.title}
      >
        <h4
          className="frontpage-title text-base font-bold group-hover:text-slate-700  dark:text-slate-100 dark:group-hover:text-slate-300"
          style={{
            fontSize: titleFontSize,
          }}
        >
          {post.title}
        </h4>
        <div
          className="published-suggestions-paragraph-container pt-3 pb-4 text-sm group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-500"
          style={{ WebkitLineClamp: 3 }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>

        <a
          className=" text-sm text-slate-900 group-hover:text-slate-500
        dark:text-slate-50 dark:group-hover:text-slate-300 w-max relative after:content-{''} after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 dark:after:bg-slate-50 dark:group-hover:after:bg-slate-300 after:bg-slate-900 group-hover:after:bg-slate-500"
        >
          Read Article
        </a>
      </div>
    </Link>
  );
};

export default NoPictureArticleShowcase;
