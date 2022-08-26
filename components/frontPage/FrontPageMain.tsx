import React, { useEffect, useState, useRef } from 'react';
import blogPostObj from '../../shared/interfaces/blogPostObj.interface';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import dynamic from 'next/dynamic';
const FrontMidSection = dynamic(() => import('./FrontMidSection'), {
  ssr: false,
});
import blogPostObjInterface from '../../shared/interfaces/blogPostObj.interface';
const StandardSmallArticlesContainer = dynamic(
  () => import('./StandardSmallArticlesContainer'),
  {
    ssr: false,
  }
);
const FrontBottomSection = dynamic(() => import('./FrontBottomSection'), {
  ssr: false,
});

const FrontPageMain = ({ posts }: { posts: blogPostObjInterface[] }) => {
  const { width } = useWindowDimensions();

  const [articleNumbers, setArticleNumbers] = useState<{
    midStandard: number;
    midNoPicture: number;
    standardSmall: number;
    bottomNoPicture: number;
    bottomBig: number;
  }>({
    midStandard: 0,
    midNoPicture: 2,
    standardSmall: 0,
    bottomNoPicture: 3,
    bottomBig: 1,
  });

  const setMidStandardAmount = async () => {
    if (width > 1500) {
      setArticleNumbers((prev) => {
        return {
          ...prev,
          midStandard: 3,
        };
      });
    }
    if (width <= 1500) {
      setArticleNumbers((prev) => {
        return {
          ...prev,
          midStandard: 2,
        };
      });
    }
  };

  const setStandardSmall = () => {
    if (width > 1500) {
      setArticleNumbers((prev) => {
        return {
          ...prev,
          standardSmall: 5,
        };
      });
    } else  if (width <= 1500 && width > 820) {
      setArticleNumbers((prev) => {
        return {
          ...prev,
          standardSmall: 4,
        };
      });
    } else  if (width <= 820) {
      setArticleNumbers((prev) => {
        return {
          ...prev,
          standardSmall: 3,
        };
      });
    }
  };

  useEffect(() => {
    setMidStandardAmount();
    setStandardSmall();
  
  }, [width]);


  return (
    <div className="w-full break-words  p-14 dark:bg-gray-900 grid  justify-center">
      <div className="max-w-[1132px] grid gap-y-10">
        <FrontMidSection posts={posts} articleNumbers={articleNumbers} />
        <StandardSmallArticlesContainer
          posts={posts}
          mid={false}
          articleNumbers={articleNumbers}
        />
        <FrontBottomSection posts={posts} articleNumbers={articleNumbers} />
      </div>
    </div>
  );
};

export default FrontPageMain;
