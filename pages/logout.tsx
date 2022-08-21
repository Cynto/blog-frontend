import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { setUserObj } from '../redux/slices/userObj';
import UserObjectComponent from '../components/UserObjectComponent';
import DarkMode from '../components/DarkMode';

const Logout = () => {
  const router = useRouter();
  const userObj = useSelector((state: any) => state.userObj);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userObj === null) {
      router.push('/login');
    }
  }, [userObj]);

  return (
    <div className="flex min-h-full justify-center items-center absolute right-0 left-0 bottom-0 top-0 z-10">
      <UserObjectComponent />
      <DarkMode />
      <Image
        src="/backgrounds/logout_background.jpg"
        layout="fill"
        objectFit="cover"
        alt="background"
      />
      <div
        className="grid justify-center p-8 z-10 bg-slate-100 dark:bg-gray-900 text-slate-800 dark:text-slate-100 shadow-2xl"
        data-testid="logout-form"
        id="logout-form"
      >
        <h1 className="text-3xl font-header justify-self-center">Logout</h1>
        <button
          className="text-xl font-normal py-3 px-16 mb-3 border-2 rounded hover:bg-slate-200 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 "
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button
          className="text-xl font-normal py-3 px-16 border-2 rounded hover:bg-slate-200 dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900"
          onClick={() => {
            localStorage.removeItem('token');
            dispatch(setUserObj(null));

            router.push('/login');
          }}
          data-testid="logout-button"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
