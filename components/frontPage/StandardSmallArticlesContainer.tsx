import React, { useEffect, useState } from 'react';
import blogPostObjInterface from '../../shared/interfaces/blogPostObj.interface';
import StandardArticleShowcase from './StandardArticleShowcase';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const StandardSmallArticlesContainer = ({
  posts,
  mid,
  articleNumbers,
}: {
  posts: blogPostObjInterface[];
  mid: boolean;

  articleNumbers: {
    midStandard: number;
    midNoPicture: number;
    standardSmall: number;
    bottomNoPicture: number;
    bottomBig: number;
  };
}) => {
  let articlesShown = 0;

  return (
    <div>
      <h3 className="text-[1.1rem] font-bold pb-5 dark:text-slate-100 ">
        The Science Behind Bloggy
      </h3>
      <div
        className="grid  md:grid-cols-4 justify-start overflow-hidden "
        style={{
          gridTemplateColumns: 'repeat(auto-fit, max(13rem))',
          gridTemplateRows: 'min-content',
        }}
      >
        {posts.map((post, index) => {
          if (articlesShown < articleNumbers.standardSmall) {
            if (
              index >=
                articleNumbers.midStandard + articleNumbers.midNoPicture &&
              index <
                articleNumbers.midStandard +
                  articleNumbers.midNoPicture +
                  articleNumbers.standardSmall
            ) {
              articlesShown++;

              return (
                <StandardArticleShowcase key={index} mid={mid} post={post} />
              );
            }
          }
        })}
      </div>
    </div>
  );
};

export default StandardSmallArticlesContainer;
