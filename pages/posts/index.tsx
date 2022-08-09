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
  const { query } = useRouter();

  const { userObj } = userHookObject;
  const [posts, setPosts] = useState<blogPostObj[]>([]);
  const [sort, setSort] = useState<string>('newest');
  const [limit, setLimit] = useState<number>(
    router.query.limit ? Number(router.query.limit) : 12
  );

  const getPosts = async () => {
    const sort = router.query.sort as string;
    const data =
      userObj && userObj.isAdmin
        ? await fetch('http://localhost:4000/posts', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              sort: sort || '-createdAt',
              limit: limit.toString(),
            },
          })
        : await fetch('http://localhost:4000/posts/published', {
            method: 'GET',
            headers: {
              sort: sort || '-createdAt',
              limit: limit.toString(),
            },
          });
    const posts = await data.json();

    if (posts) {
      setPosts(posts);
    }
  };

  useEffect(() => {
    getPosts();
  }, [userObj]);

  useEffect(() => {
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
    if (router.query.limit && router.query.limit !== '12') {
      getPosts();
    }
  }, [router.query.sort, router.query.limit]);

  return (
    <>
      <Header userObj={userObj} />
      <div className="h-full relative dark:bg-gray-900 dark:text-slate-100 w-full">
        <main className="pt-20 grid justify-center relative min-h-screen">
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
          <div
            className="w-full max-w-[500px] lg:max-w-[1500px]  p-10 grid grid-cols-1 lg:grid-cols-3 gap-16"
            style={{
              gridTemplateRows: 'repeat(auto-fit, 392px)',
            }}
          >
            {posts.map((post) => (
              <StandardPostPageArticle
                userObj={userObj}
                key={post._id}
                post={post}
              />
            ))}
          </div>
          {posts.length >= limit ? (
            <div className="flex justify-center pb-5">
              <Link
                href={{
                  pathname: '/posts',
                  query: { ...query, limit: `${limit + 12}` },
                }}
              >
                <button onClick={() => setLimit(limit + 12)}>
                  Load More Posts
                </button>
              </Link>
            </div>
          ) : null}
        </main>
      </div>
    </>
  );
};

export default Posts;
