import React, { useEffect, useState } from 'react';
import StandardArticleShowcase from './StandardArticleShowcase';
import NoPictureArticleShowcase from './NoPictureArticleShowcase';
import blogPostObjInterface from '../../shared/interfaces/blogPostObj.interface';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const FrontMidSection = ({ posts }: { posts: blogPostObjInterface[] }) => {
  console.log(posts[0]);
  const { width } = useWindowDimensions();
  const [maxArticles, setMaxArticles] = useState(0);

  useEffect(() => {
    if (width > 1500) {
      setMaxArticles(3);
    }
    if (width <= 1500) {
      setMaxArticles(2);
    }
    if (width <= 1200) {
      setMaxArticles(2);
    }
    if (width <= 900) {
      setMaxArticles(2);
    }
    console.log(maxArticles);
  }, [width]);
  return (
    <div className="grid w-full max-w-full md:grid-cols-[1fr_220px] justify-center">
      <div
        className="grid w-full grid-flow-col max-w-full   md:auto-rows-[0] overflow-hidden "
        style={{
          gridTemplateColumns: 'repeat(auto-fit, max(19rem))',
          gridTemplateRows: 'min-content',
        }}
      >
        {posts.map((post, index) => {
          return index < maxArticles ? (
            <StandardArticleShowcase key={index} mid post={post} />
          ) : null;
        })}
      </div>
      <div className="hidden md:grid auto-rows-min gap-y-5 w-full  pt-5 ">
        {posts.map((post, index) => {
          return index < 2 ? (
            <NoPictureArticleShowcase key={index} post={post} mid />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default FrontMidSection;
