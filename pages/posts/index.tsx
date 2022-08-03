import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../../components/Header'), { ssr: false });
import useUserObject from '../../hooks/useUserObject';
import StandardPostPageArticle from '../../components/postsPage/StandardPostPageArticle';
import blogPostObj from '../../shared/interfaces/blogPostObj.interface';
import SortLink from '../../components/postsPage/SortLink';

const Posts: NextPage = () => {
  const userHookObject = useUserObject();
  const router = useRouter();
  const { userObj } = userHookObject;
  const [posts, setPosts] = useState<blogPostObj[]>([]);
  const [sort, setSort] = useState<string>('newest');

  const getPosts = async () => {
    const sort = router.query.sort as string;
    const data =
      userObj && userObj.isAdmin
        ? await fetch('http://localhost:4000/posts', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              sort: sort || '-createdAt',
            },
          })
        : await fetch('http://localhost:4000/posts/published', {
            method: 'GET',
            headers: {
              sort: sort || 'newest',
            },
          });
    const posts = await data.json();

    if (posts) {
      console.log(posts);
      setPosts(posts);
    }
  };

  useEffect(() => {
    if (userObj) {
      getPosts();
    }
  }, [userObj]);

  useEffect(() => {
    console.log(router.query.sort);
    if (router.query.sort && router.query.sort !== sort) {
      getPosts();
      if (router.query.sort === '-createdAt') {
        setSort('newest');
      } else if (router.query.sort === 'createdAt') {
        setSort('oldest');
      } else {
        setSort('comments');
      }
    }
  }, [router.query.sort]);

  useEffect(() => {}, [sort]);

  return (
    <>
      <Header userObj={userObj} />
      <div className="h-full relative dark:bg-gray-900 dark:text-slate-100 w-full">
        <main className="w-full">
          <div className="w-full flex justify-center">
            <h2 className=" text-3xl py-5">Posts </h2>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <span className="block">Sort by: </span>
            <div className="flex gap-3">
              <SortLink sortBy="-createdAt" title="Newest" />
              <SortLink sortBy="createdAt" title="Oldest" />
              <SortLink sortBy="comments" title="Most Comments" />
            </div>
          </div>
          <div className="w-full max-w-[500px] lg:max-w-[1500px]  p-10 grid grid-cols-1 lg:grid-cols-3 gap-16"
          style={{
            gridTemplateRows: 'repeat(auto-fit, 392px)',
          }}>
            {posts.map((post) => (
              <StandardPostPageArticle
                userObj={userObj}
                key={post._id}
                post={post}
                mid
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default Posts;
