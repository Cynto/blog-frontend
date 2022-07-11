import React from 'react';
import StandardArticleShowcase from './StandardArticleShowcase';
import MidRightSuggestion from './MidRightSuggestion';
import blogPostObjInterface from '../../shared/interfaces/blogPostObj.interface';

const FrontMidSection = ({ posts }: { posts: blogPostObjInterface[] }) => {
  console.log(posts[0]);
  return (
    <div className="grid w-full max-w-full md:grid-cols-[1fr_220px] justify-center">
      <div
        className="grid w-full max-w-full gap-y-10 md:h-[366px] md:auto-rows-[0] overflow-hidden mb-14"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, max(19rem))',
          gridTemplateRows: 'min-content',
        }}
      >
        {posts.map((post, index) => {
          return index <= 5 ? (
            <StandardArticleShowcase key={index} mid post={post} />
          ) : null;
        })}
      </div>
      <div className="hidden md:grid auto-rows-min gap-y-5 w-full  pt-5">
        {posts.map((post, index) => {
          return index <= 1 ? (
            <MidRightSuggestion key={index} post={post} />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default FrontMidSection;
