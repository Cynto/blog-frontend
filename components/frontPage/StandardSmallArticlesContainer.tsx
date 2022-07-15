import React, { useEffect, useState } from 'react';
import blogPostObjInterface from '../../shared/interfaces/blogPostObj.interface';
import StandardArticleShowcase from './StandardArticleShowcase';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const StandardSmallArticlesContainer = ({
  posts,
  mid,
}: {
  posts: blogPostObjInterface[];
  mid: boolean;
}) => {
  const { width } = useWindowDimensions();
  const [maxArticles, setMaxArticles] = useState(0);

  useEffect(() => {
    if (width > 1500) {
      setMaxArticles(7);
    }
    if (width <= 1500) {
      setMaxArticles(5);
    }
    if (width <= 1200) {
      setMaxArticles(3);
    }
    if (width <= 900) {
      setMaxArticles(3);
    }
    console.log(maxArticles);
  }, [width]);
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
          return index <= maxArticles ? (
            <StandardArticleShowcase key={index} mid={mid} post={post} />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default StandardSmallArticlesContainer;
