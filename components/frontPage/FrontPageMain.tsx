import React from 'react';
import FrontMidSection from './FrontMidSection';
import blogPostObjInterface from '../../shared/interfaces/blogPostObj.interface';

const FrontPageMain = ({ posts }: { posts: blogPostObjInterface[] }) => {
  return (
    <div className="w-full  p-14 dark:bg-gray-900">
      <FrontMidSection posts={posts} />
    </div>
  );
};

export default FrontPageMain;
