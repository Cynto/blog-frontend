import React, { useEffect } from 'react';

import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('../../components/Header'), { ssr: false });

const LoadingPost = () => {
  const router = useRouter();
  const url = router.query.url;

  useEffect(() => {
    router.replace(`../${url}`);
  }, []);
  return (
    <>
      <Header />

      <div className="min-h-screen h-full w-full grid justify-center  py-40 dark:bg-gray-900  ">
        <div className="w-[300px] md:w-[600px]">
          <div
            role="status"
            className=" animate-pulse  grid  justify-items-center"
          >
            <div className="w-[300px] md:w-[500px] flex flex-col  justify-center items-center mb-20">
              <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mb-4" />
              <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/4 mb-10" />
              <div className="h-8  flex gap-x-5 justify-around mb-10">
                <div className="w-8 ">
                  <svg viewBox="0 0 128 128" className="cursor-pointer">
                    <rect
                      fill="currentColor"
                      x="4.83"
                      y="4.83"
                      width="118.35"
                      height="118.35"
                      rx="6.53"
                      ry="6.53"
                    ></rect>
                    <path
                      fill="#fff"
                      d="M86.48 123.17V77.34h15.38l2.3-17.86H86.48v-11.4c0-5.17 1.44-8.7 8.85-8.7h9.46v-16A126.56 126.56 0 0091 22.7c-13.62 0-23 8.3-23 23.61v13.17H52.62v17.86H68v45.83z"
                    ></path>
                  </svg>
                </div>
                <div className="w-8">
                  <svg viewBox="0 0 128 128" className="cursor-pointer">
                    <path
                      d="M40.254 127.637c48.305 0 74.719-48.957 74.719-91.403 0-1.39 0-2.777-.075-4.156 5.141-4.547 9.579-10.18 13.102-16.633-4.79 2.602-9.871 4.305-15.078 5.063 5.48-4.02 9.582-10.336 11.539-17.774-5.156 3.743-10.797 6.38-16.68 7.801-8.136-10.586-21.07-13.18-31.547-6.32-10.472 6.86-15.882 21.46-13.199 35.617C41.922 38.539 22.246 26.336 8.915 6.27 1.933 20.94 5.487 39.723 17.022 49.16c-4.148-.172-8.207-1.555-11.832-4.031v.41c0 15.273 8.786 28.438 21.02 31.492a21.596 21.596 0 01-11.863.543c3.437 13.094 13.297 22.07 24.535 22.328-9.305 8.918-20.793 13.75-32.617 13.72-2.094 0-4.188-.15-6.266-.446 12.008 9.433 25.98 14.441 40.254 14.422"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
                <div className="w-8">
                  <svg viewBox="0 0 128 128" className="cursor-pointer">
                    <path
                      fill="currentColor"
                      d="M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M21.06 48.73h18.11V107H21.06zm9.06-29a10.5 10.5 0 11-10.5 10.49 10.5 10.5 0 0110.5-10.49M50.53 48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75v32H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-2/4 mb-3 " />
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3" />
            </div>

            <div className="flex justify-center items-center w-[300px] md:w-[600px] h-[180px] md:h-[350px] bg-gray-300 rounded  dark:bg-gray-700 mb-20">
              <svg
                className="w-20 h-12 text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"></path>
              </svg>
            </div>
            <div className="w-3/4 relative">
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-3/4 mb-4" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-3/4 mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-3/5 mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-2/5 mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-2/5 mb-5" />

              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-3/4 mb-4" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />

              <div className="border-1 hidden lg:grid auto-rows-min gap-y-5 max-w-[220px] absolute top-0 -right-64">
                <div className="mid-right-suggestion grid w-max  min-w-[180px] h-min overflow-hidden  group">
                  <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-3/4 mb-3" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-3/4 mb-2" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-3/4 mb-2" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-3/4 mb-2.5" />
                  <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[50px] mb-8" />

                  <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-3/4 mb-3" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-3/4 mb-2" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-3/4 mb-2" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-3/4 mb-2.5" />
                  <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[50px] mb-8" />

                  <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-3/4 mb-3" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-3/4 mb-2" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-3/4 mb-2" />
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-3/4 mb-2.5" />
                  <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[50px] mb-8" />
                </div>
              </div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingPost;
