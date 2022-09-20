import React, { useEffect } from 'react';

import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import LoadingPostComponent from '../../components/LoadingPostComponent';

const Header = dynamic(() => import('../../components/Header'), { ssr: false });

const LoadingPost = () => {
  const router = useRouter();
  const url = router.query.url;

  useEffect(() => {
    router.replace(`/${url}`);
  }, []);
  return (
    <>
      <Header />
      <LoadingPostComponent />
      
    </>
  );
};

export default LoadingPost;
