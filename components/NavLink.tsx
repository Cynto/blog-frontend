import React from 'react';
import Link from 'next/link';

const NavLink = (props: { href: string; text: string }) => {
  const { href, text } = props;
  return (
    <>
      <Link href={href}>
        <a className="text-xl font-normal relative text-slate-900 dark:text-slate-100 hover:after:scale-x-100 hover:after:origin-bottom-left after:content-{''} after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 dark:after:bg-slate-50 after:bg-slate-900 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out">
          {text}
        </a>
      </Link>
    </>
  );
};

export default NavLink;
