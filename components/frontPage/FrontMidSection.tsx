import React from 'react';
import StandardArticleShowcase from './StandardArticleShowcase';
import blogPostObjInterface from '../../shared/interfaces/blogPostObj.interface';

const FrontMidSection = ({ posts }: { posts: blogPostObjInterface[] }) => {
  console.log(posts[0]);
  return (
    <div className="grid w-full max-w-full md:grid-cols-[1fr_220px] justify-center"
    
    >
      <div
        className="grid w-full max-w-full overflow-hidden"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, max(19rem))',
        }}
      >
        {posts.map((post, index) => (
          <StandardArticleShowcase key={index} mid post={post} />
        ))}
      </div>
      <div className="hidden md:grid w-full border-2"></div>
    </div>
  );
};

export default FrontMidSection;
