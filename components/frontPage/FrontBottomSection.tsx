import React, {useState, useEffect} from 'react';
import blogPostObjInterface from '../../shared/interfaces/blogPostObj.interface';
import NoPictureArticleShowcase from './NoPictureArticleShowcase';
import BottomBigArticle from './BottomBigArticle';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const FrontBottomSection = ({ posts }: { posts: blogPostObjInterface[] }) => {
  const { width } = useWindowDimensions();
  const [maxArticles, setMaxArticles] = useState(0);

  useEffect(() => {
    if (width > 1500) {
      setMaxArticles(2);
    }
    if (width <= 1500) {
      setMaxArticles(2);
    }
    if (width <= 1200) {
      setMaxArticles(1);
    }
    
    console.log(maxArticles);
  }, [width]);
  return (
    <div className="w-full grid md:grid-flow-col md:grid-cols-[1fr_minmax(500px, 2fr)]  gap-x-10">
      <div className="max-w-[300px] justify-self-end hidden md:grid auto-rows-min gap-y-5 pt-5">
        {posts.map((post, index) => {
          return index < 3 ? (
            <NoPictureArticleShowcase key={index} post={post} mid={false} />
          ) : null;
        })}
      </div>
      <div className="flex gap-x-10 ">
        {posts.map((post, index) => {
          return index < maxArticles ? (
            <BottomBigArticle key={index} post={post} />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default FrontBottomSection;
