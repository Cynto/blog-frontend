import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Header.module.scss';
import Head from 'next/head';

const Header = (props: {
  userObj: {
    _id: string;
    firstName: string;
    lastName: string;
    loggedIn: boolean;
  };
}) => {
  const { userObj } = props;
  const router = useRouter();
  const currentRoute = router.pathname;

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <h1>Bloggy</h1>
        <div className={styles.menuNavContainer}>
          <span className="material-symbols-outlined">menu</span>
          <nav>
            <Link href="/">
              <a
                className={
                  currentRoute === '/' || currentRoute === ''
                    ? styles.active
                    : ''
                }
              >
                Home
              </a>
            </Link>
            {userObj.loggedIn ? (
              <>
                <Link href="/posts">
                  <a className={currentRoute === '/posts' ? styles.active : ''}>
                    Posts
                  </a>
                </Link>
                <Link href="/posts/create">
                  <a
                    className={
                      currentRoute === '/posts/create' ? styles.active : ''
                    }
                  >
                    Create Post
                  </a>
                </Link>
                <Link href="/logout">
                  <a>Logout</a>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <a>Login</a>
                </Link>
                <Link href="/register">
                  <a>Register</a>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
