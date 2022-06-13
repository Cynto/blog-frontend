import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const NavLink = (props: { href: string; text: string, menuOpen: boolean }) => {
  const { href, text, menuOpen } = props;
  const [activeClass, setActiveClass] = useState<string>('');
  const [menuClass, setMenuClass] = useState<string>('');
  const router = useRouter();
  const currentRoute = router.pathname;

  useEffect(() => {
    if (currentRoute === href) {
      setActiveClass(
        "after:scale-x-100 after:origin-bottom-left after:content-{''} after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 dark:after:bg-slate-50 after:bg-slate-900"
      );
    } else {
      setActiveClass(
        "hover:after:scale-x-100 hover:after:origin-bottom-left after:content-{''} after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 dark:after:bg-slate-50 after:bg-slate-900 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out"
      );
    }
    if(menuOpen) {
      setMenuClass(
        "md:first:mt-0 first:mt-10 w-min"
      )

    }
  }, [currentRoute, href, menuOpen]);

  return (
    <>
      <Link href={href}>
        <a
          className={`text-2xl font-normal relative text-slate-900 dark:text-slate-100 ${activeClass} ${menuClass}`}
        >
          {text}
        </a>
      </Link>
    </>
  );
};

export default NavLink;
