import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SortLink = ({ sortBy, title }: { sortBy: string; title: string }) => {
  const router = useRouter();
  const [activeClass, setActiveClass] = useState<string>('');

  useEffect(() => {
    if (router.query.sort === sortBy) {
      setActiveClass(
        "after:scale-x-100 after:origin-bottom-left after:content-{''} after:absolute after:w-full after:h-0.5 after:bottom-0 after:left-0 dark:after:bg-slate-50 after:bg-slate-900"
      );
    } else {
      setActiveClass('');
    }
  }, [router.query.sort, sortBy]);
  return (
    <Link href={{ pathname: '/posts', query: { sort: sortBy } }}>
      <button className="   border-slate-900 dark:border-0 rounded    font-bold">
        <span
          className={`relative hover:after:scale-x-100 hover:after:origin-bottom-left after:content-{''} after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-slate-900 dark:after:bg-slate-100 after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out ${activeClass}`}
        >
          {title}
        </span>
      </button>
    </Link>
  );
};

export default SortLink;
