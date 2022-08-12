import React, { useState, useEffect } from 'react';
import blogPostObjInterface from '../../shared/interfaces/blogPostObj.interface';
import NoPictureArticleShowcase from './NoPictureArticleShowcase';
import BottomBigArticle from './BottomBigArticle';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const FrontBottomSection = ({
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
  let articlesShown = 0;

  return (
    <div className=" md:flex  gap-x-10">
      <div className="max-w-[300px] justify-self-end hidden md:grid auto-rows-min gap-y-5 ">
        {posts.map((post, index) => {
          if (articlesShown < articleNumbers.bottomNoPicture) {
            if (
              index >=
                articleNumbers.midStandard +
                  articleNumbers.midNoPicture +
                  articleNumbers.standardSmall &&
              index <
                articleNumbers.midStandard +
                  articleNumbers.midNoPicture +
                  articleNumbers.standardSmall +
                  articleNumbers.bottomNoPicture
            ) {
              articlesShown++;
              return (
                <NoPictureArticleShowcase key={index} post={post} mid={false} />
              );
            }
          }
        })}
      </div>
      <div className="flex-1 ">
        {posts.map((post, index) => {
          if (index === posts.length - 1) {
            return <BottomBigArticle key={index} post={post} />;
          }
        })}
      </div>
    </div>
  );
};

export default FrontBottomSection;
