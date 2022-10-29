import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';

const Header = dynamic(() => import('../../components/Header'), { ssr: false });
import StandardPostPageArticle from '../../components/postsPage/StandardPostPageArticle';
import blogPostObj from '../../shared/interfaces/blogPostObj.interface';
import SortLink from '../../components/postsPage/SortLink';
import useFirstRender from '../../hooks/useFirstRender';
import Head from 'next/head';

const Posts: NextPage = () => {
  const firstRender = useFirstRender();
  const router = useRouter();
  const { query } = useRouter();
  const userObj = useSelector((state: any) => state.userObj);

  const [posts, setPosts] = useState<blogPostObj[]>([]);
  const [sort, setSort] = useState<string | string[]>(
    router.query.sort || '-createdAt'
  );
  const [limit, setLimit] = useState<string>(
    router.query.limit ? router.query.limit.toString() : '12'
  );

  const getPosts = async () => {
    const sort = router.query.sort as string;
    const limitToUse = router.query.limit
      ? router.query.limit.toString()
      : '12';

    const data =
      userObj && userObj.isAdmin
        ? await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              sort: sort || '-createdAt',
              limit: limitToUse,
              allposts: 'true',
            },
          })
        : await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
            method: 'GET',
            headers: {
              sort: sort || '-createdAt',
              limit: limitToUse,
            },
          });
    const posts = await data.json();

    if (posts) {
      setPosts(posts);
    }
  };

  useEffect(() => {
    if (
      !router.query.sort &&
      router.isReady &&
      ((userObj && !userObj.initial) || !userObj)
    ) {
      getPosts();
    }
  }, [userObj]);

  useEffect(() => {
    if (router.isReady && router.query.sort && router.query.sort !== sort) {
      getPosts();

      if (router.query.sort === '-createdAt') {
        setSort('-createdAt');
      } else if (router.query.sort === 'createdAt') {
        setSort('createdAt');
      } else {
        setSort('comments');
      }
    } else if (
      router.isReady &&
      router.query.limit &&
      router.query.limit !== '12'
    ) {
      if (Number(router.query.limit) > Number(limit)) {
        setLimit(router.query.limit.toString());
      }
      getPosts();
    }
  }, [router.query.sort, router.query.limit]);

  return (
    <>
      <Head>
        <title>Bloggy Posts</title>
      </Head>
      <Header />
      <div className="h-full relative dark:bg-gray-900 dark:text-slate-100 w-full">
        <main className="pt-20 grid auto-rows-min justify-center relative min-h-screen">
          <div className="w-full flex justify-center">
            <h2 className=" text-3xl py-5">Posts </h2>
          </div>
          <div className="w-full flex flex-col items-center ">
            <span className="block">Sort by: </span>
            <div className="flex gap-3">
              <SortLink sortBy="-createdAt" title="Newest" />
              <SortLink sortBy="createdAt" title="Oldest" />
              <SortLink sortBy="comments" title="Most Comments" />
            </div>
          </div>
          <div
            className="w-full max-w-[500px] lg:max-w-[1500px]  p-10 grid grid-cols-1 auto-rows-[392px] lg:grid-cols-3 gap-16"
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
          {posts.length >= Number(limit) && (
            <div className="flex justify-center pb-5">
              <Link
                href={{
                  pathname: '/posts',
                  query: {
                    ...query,
                    limit: `${(Number(limit) + 12).toString()}`,
                  },
                }}
              >
                <button
                  className="flex group relative"
                  onClick={() => setLimit((Number(limit) + 12).toString())}
                  data-testid="load-more-button"
                >
                  <span className=" hover:after:scale-x-100 hover:after:origin-bottom-left after:content-{''} after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-slate-900 dark:after:bg-slate-100 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out">
                    Load More Posts
                  </span>

                  <span className="material-symbols-outlined text-xl ">
                    arrow_downward
                  </span>
                </button>
              </Link>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Posts;
