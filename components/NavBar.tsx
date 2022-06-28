import React, { useEffect, useState } from 'react';
import NavLink from './NavLink';
import UserObjInterface from '../shared/interfaces/userObj.interface';

const NavBar = (props: {
  menuOpen: boolean;
  userObj: UserObjInterface | null | false;
}) => {
  const { menuOpen, userObj } = props;
  const [navLinks, setNavLinks] = useState<
    {
      href: string;
      text: string;
      visible: boolean;
    }[]
  >([]);

  useEffect(() => {
    setNavLinks([
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
    ]);
  }, [userObj]);
  return (
    <nav
      className={` md:!opacity-100 md:!items-center md:!bottom-0
               dark:bg-gray-900 bg-white px-0 py-0 my-0 md:!grid md:!relative grid-flow-col gap-x-8 ${
                 menuOpen
                   ? 'opacity-100 !grid auto-rows-min gap-10  justify-center justify-items-center fixed !grid-flow-row right-0 bottom-0 left-0 top-[13%]   shadow-lg border-t-2  border-gray-200 dark:border-gray-600 transition-all duration-500 ease-in-out origin-left'
                   : 'opacity-0 absolute bottom-[999px] '
               }`}
    >
      {navLinks.map((navLink, index) => {
        if (navLink.visible) {
          return (
            <NavLink
              key={index}
              href={navLink.href}
              text={navLink.text}
              menuOpen={menuOpen}
            />
          );
        }
      })}
    </nav>
  );
};

export default NavBar;
