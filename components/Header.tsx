import React from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.scss';

const Header = (props: { setViewLogout: Function }) => {
  const { setViewLogout } = props;
  return (
    <header className={styles.header}>
      <h1>Blog</h1>
      <Link href="/Home">
        <a>Home</a>
      </Link>
      <Link href="/posts">
        <a>Posts</a>
      </Link>
      <Link href="/posts/create">
        <a>Create Post</a>
      </Link>
      <span onClick={() => setViewLogout(true)} data-testid="header-logout">
        Logout
      </span>
    </header>
  );
};

export default Header;
