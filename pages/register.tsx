import type { NextPage } from 'next';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Register.module.scss';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
const DarkMode = dynamic(() => import('../components/DarkMode'), {
  ssr: false,
});

const Register: NextPage = () => {
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

  const userObj = useSelector((state: any) => state.userObj);

  const router = useRouter();

  const ISSERVER = typeof window === 'undefined';

  const handleSubmit = async (data: any) => {
    const { firstName, lastName, email, password, confirmPassword, adminCode } =
      data;

    const response = await fetch(
      'https://bloggy-api-cynto.herokuapp.com/users',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          password: password.value,
          confirmPassword: confirmPassword.value,
          adminCode: adminCode.value ? adminCode.value : null,
        }),
      }
    );
    const json = await response.json();

    if (json.user) {
      router.push('/login');
    } else {
      setErrors(json.errors);
    }
  };

  const inputClass =
    'text-slate-800 grid grid-cols-2 gap-4 mb-4 w-full p-3 bg-slate-100 border-[1px] border-slate-300 dark:border-2  rounded-sm dark:border-slate-100 focus:outline-none focus:border-gray-900 dark:focus:border-black ';
  const labelClass = 'text-xl ';

  useEffect(() => {
    if (userObj) {
      router.push('/');
    }
  }, [userObj]);
  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DarkMode />

      <main className="min-h-screen grid justify-center content-center relative text-slate-900">
        <Image
          src="/backgrounds/register_background.jpg"
          layout="fill"
          objectFit="cover"
          alt="background"
          priority
        />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e.target);
          }}
          method="POST"
          className="z-[1] w-screen md:w-[40vw] lg:w-[30vw] max-w-[450px]   grid shadow-xl pt-10 px-10 pb-5 bg-white dark:bg-gray-800 text-slate-800 dark:text-slate-100"
          data-testid="login-form"
        >
          <label htmlFor="firstName" className={labelClass}>
            First Name *
            <input type="text" id="firstName" className={inputClass} />
          </label>
          <label htmlFor="lastName" className={labelClass}>
            Last Name *
            <input type="text" id="lastName" className={inputClass} />
          </label>
          <label htmlFor="email" className={labelClass}>
            Email *
            <input type="email" id="email" className={inputClass} required />
          </label>

          <label htmlFor="password" className={labelClass}>
            Password *
            <input
              type="password"
              id="password"
              className={inputClass}
              required
            />
          </label>
          <label htmlFor="confirmPassword" className={labelClass}>
            Confirm Password *
            <input
              type="password"
              id="confirmPassword"
              className={inputClass}
              required
            />
          </label>
          <label htmlFor="adminPassword" className={labelClass}>
            Admin Code (Optional)
            <input type="password" id="adminCode" className={inputClass} />
          </label>

          {errors[0].msg !== '' ? (
            <ul className="mt-0">
              {errors.map((error, index) => (
                <li key={index} className="text-red-700 mt-0 mb-1">
                  {' '}
                  {error.msg}
                </li>
              ))}
            </ul>
          ) : null}
          <button
            type="submit"
            className="mt-2 mb-2 bg-gray-800 hover:bg-gray-900 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-800 text-slate-100 font-bold   p-3 text-xl cursor-pointer"
          >
            Create Account
          </button>
          <p>
            Already have an account?{' '}
            <Link href="/login">
              <a className="font-bold dark:text-white relative hover:after:scale-x-100 hover:after:origin-bottom-left after:content-{''} after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-slate-900 dark:after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out">
                Login
              </a>
            </Link>
          </p>
          <p>
            Return to{' '}
            <Link href="/">
              <a className="font-bold dark:text-white relative hover:after:scale-x-100 hover:after:origin-bottom-left after:content-{''} after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-slate-900 dark:after:bg-white after:origin-bottom-right after:transition-transform after:duration-300 after:ease-out">
                Home
              </a>
            </Link>
          </p>
        </form>
      </main>

      <footer></footer>
    </>
  );
};

export default Register;
