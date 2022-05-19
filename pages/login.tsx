import type { NextPage } from 'next';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Login.module.scss';
import useUserObject from '../hooks/useUserObject';

const Login: NextPage = () => {
  const [errors, setErrors] = useState<
    [
      {
        value: String;
        msg: String;
        param: String;
        location: String;
      }
    ]
  >([{ msg: '', value: '', param: '', location: '' }]);

  const userHookObject = useUserObject();
  const { userObj } = userHookObject;

  const router = useRouter();

  const ISSERVER = typeof window === 'undefined';

  const handleSubmit = async (data: any) => {
    const email = data.email;
    const password = data.password;
    console.log(email.value, password.value);

    const response = await fetch('http://localhost:4000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    const json = await response.json();

    if (json.user) {
      localStorage.setItem('token', json.token);
      router.push('/');
    } else {
      setErrors(json.errors);
    }
  };
  useEffect(() => {
    if (userObj) {
      router.push('/');
    }
  }, [userObj]);
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image
          src="https://uc566fb39cfe356c36fbd3d6fe36.previews.dropboxusercontent.com/p/thumb/ABgSWYe-zJuzr4lSM_ck2EC8BJBy-6mZGty82VlOA3qVQ62LpgeDeKOgSQorMzUqjZtPdPY1sB0baSDIfwmptmDLfvdKGUIwPSLj8gNvqO7AdjaDeASVpB6L1b0WLRFi-TvluT7sA5j3Pv6H-8_NwcGS29ZUTiI9U9ljK-zXi1ff3gyxogp2GGzuZy4C8Y31vo8ws_SMW1vROJVjj10KhWWgZughKqpZkolroNkCwc8vcQ-ZpbKrb70Jf-lszEWd5wjbWHcAZ_-eg3CmM0j89-h5CIQbtXjEAjjayCNyWdPFzVzpWoJ0Y0HYhSh18eNBUL_UAwky2_GC8z4k_myogUdl94Hwau4XaL166AhT9OFWGAOfe3xD5TlRqZKz3UVeR4Psd1sDLlxmh2I5YAN9HBoiGobdpjVy4bkAj4F0LWQQxA/p.jpeg"
          layout="fill"
          objectFit="cover"
          alt="background"
        />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e.target);
          }}
          method="POST"
          className={styles.form}
          data-testid="login-form"
        >
          <label htmlFor="email" className={styles.label}>
            Email
            <input type="email" id="email" className={styles.input} required />
          </label>
          <label htmlFor="password" className={styles.label}>
            Password
            <input
              type="password"
              id="password"
              className={styles.input}
              required
            />
          </label>
          {errors[0].msg !== '' ? (
            <ul>
              {errors.map((error, index) => (
                <li key={index} className="error">
                  {' '}
                  {error.msg}
                </li>
              ))}
            </ul>
          ) : null}
          <button type="submit">Log In</button>
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/register">
              <a>Sign Up</a>
            </Link>
          </p>
        </form>
      </main>

      <footer></footer>
    </>
  );
};

export default Login;
