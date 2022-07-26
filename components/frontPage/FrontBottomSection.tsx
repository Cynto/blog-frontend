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
    <div className=" md:flex  gap-x-10">
      <div className="max-w-[300px] justify-self-end hidden md:grid auto-rows-min gap-y-5 ">
        {posts.map((post, index) => {
          return index < 3 ? (
            <NoPictureArticleShowcase key={index} post={post} mid={false} />
          ) : null;
        })}
      </div>
      <div className="flex-1 ">
        {posts.map((post, index) => {
          return index < 1 ? (
            <BottomBigArticle key={index} post={post} />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default FrontBottomSection;
