import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Header.module.scss';
import Head from 'next/head';
import UserObjInterface from '../shared/interfaces/userObj.interface';
import useDarkMode from '../hooks/useDarkMode';
import NavLink from './NavLink';

const Header = (props: { userObj: UserObjInterface | null | false }) => {
  const { userObj } = props;
  const [darkMode, setDarkMode] = useDarkMode();
  const router = useRouter();
  const currentRoute = router.pathname;

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [navDisplay, setNavDisplay] = useState<string>('grid');
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const [width, setWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    setIsMobile(width <= 768);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setNavDisplay('none');
    }
    if (menuOpen) {
      setNavDisplay('grid');
    }
    if (!menuOpen) {
      setNavDisplay('none');
    }
    if (!isMobile) {
      setNavDisplay('grid');
    }
  }, [menuOpen, isMobile]);

  const navLinks = [
    {
      href: '/',
      text: 'Home',
      visible: true,
    },
    {
      href: '/posts',
      text: 'Posts',
      visible: true,
    },
    {
      href: '/posts/create',
      text: 'Create Post',
      visible: userObj && userObj.isAdmin ? true : false,
    },
    {
      href: '/logout',
      text: 'Logout',
      visible: userObj ? true : false,
    },
    {
      href: '/login',
      text: 'Login',
      visible: userObj ? false : true,
    },
    {
      href: '/register',
      text: 'Register',
      visible: userObj ? false : true,
    },
    {},
  ];

  return (
    <>
      <header
        className="grid xl:grid-cols-2 xl:justify-items-end py-3 px-6 gap-x-8 xl:gap-x-24 items-center  relative dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-600"
        style={{
          gridTemplateColumns: width >= 1280 ? '1fr 1fr' : '7fr max-content',
        }}
      >
        <h1 className="text-5xl font-header m-0 text-slate-800 dark:text-slate-100">
          Bloggy
        </h1>
        <div className="flex gap-5 xl:justify-self-start">
          <nav
            className="
              hidden md:grid grid-flow-col gap-x-8 "
            style={{
              position:
                navDisplay === 'grid' && isMobile ? 'fixed' : 'relative',
            }}
          >
            {navLinks.map((navLink, index) => {
              if (navLink.visible) {
                return (
                  <NavLink
                    key={index}
                    href={navLink.href}
                    text={navLink.text}
                  />
                );
              }
            })}
          </nav>
          {darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              title="Turn on light theme"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-sun cursor-pointer"
              onClick={() => setDarkMode(false)}
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <span
              className="material-symbols-outlined cursor-pointer"
              title="Turn on dark theme"
              onClick={() => setDarkMode(true)}
            >
              dark_mode
            </span>
          )}
          <span
            className="material-symbols-outlined dark:text-slate-100 md:hidden"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            menu
          </span>
        </div>
      </header>
    </>
  );
};

export default Header;
