import React from 'react';
import dynamic from 'next/dynamic';
const FrontMidSection = dynamic(() => import('./FrontMidSection'), {
  ssr: false,
});
import blogPostObjInterface from '../../shared/interfaces/blogPostObj.interface';
const StandardSmallArticlesContainer = dynamic(
  () => import('./StandardSmallArticlesContainer'),
  {
    ssr: false,
  }
);
const FrontBottomSection = dynamic(() => import('./FrontBottomSection'), {
  ssr: false,
});

const FrontPageMain = ({ posts }: { posts: blogPostObjInterface[] }) => {
  return (
    <div className="w-full  p-14 dark:bg-gray-900 grid gap-y-10">
      <FrontMidSection posts={posts} />
      <StandardSmallArticlesContainer posts={posts} mid={false} />
      <FrontBottomSection posts={posts} />
    </div>
  );
};

export default FrontPageMain;
