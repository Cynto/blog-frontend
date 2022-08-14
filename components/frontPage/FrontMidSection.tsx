import React, { useEffect, useState } from 'react';
import StandardArticleShowcase from './StandardArticleShowcase';
import NoPictureArticleShowcase from './NoPictureArticleShowcase';
import blogPostObjInterface from '../../shared/interfaces/blogPostObj.interface';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const FrontMidSection = ({
  posts,
  articleNumbers,
}: {
  posts: blogPostObjInterface[];
  articleNumbers: {
    midStandard: number;
    midNoPicture: number;
    standardSmall: number;
    bottomNoPicture: number;
    bottomBig: number;
  };
}) => {
  const { width } = useWindowDimensions();

  let standardArticlesShown = 0;
  let noPictureArticlesShown = 0;

  return (
    <div className="grid w-min max-w-full md:grid-cols-[1fr_min-content] justify-center">
      <div
        className="grid w-min md:grid-flow-col    md:auto-rows-[0] "
        style={{
          gridTemplateColumns: 'repeat(auto-fit, max(19rem))',
          gridTemplateRows: 'min-content',
        }}
      >
        {posts.map((post, index) => {
          if (standardArticlesShown < articleNumbers.midStandard) {
            if (index < 4) {
              standardArticlesShown++;
              return <StandardArticleShowcase key={index} mid post={post} />;
            }
          }
        })}
      </div>
      <div className="hidden md:grid auto-rows-min gap-y-5 w-full  pt-5 ">
        {posts.map((post, index) => {
          if (noPictureArticlesShown < 2) {
            if (
              index >= articleNumbers.midStandard &&
              index < articleNumbers.midNoPicture + articleNumbers.midStandard
            ) {
              noPictureArticlesShown++;
              return <NoPictureArticleShowcase mid key={index} post={post} />;
            }
          }
        })}
      </div>
    </div>
  );
};

export default FrontMidSection;
