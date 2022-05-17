import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/LogoutForm.module.scss';

const Logout = () => {
  const router = useRouter();
  return (
    <div className={styles.totalContainer}>
      <div className={styles.background} />
      <div
        className={styles.logoutForm}
        data-testid="logout-form"
        id="logout-form"
      >
        <h1>Logout</h1>
        <button onClick={() => router.back()}>Cancel</button>
        <button
          onClick={() => {
            localStorage.removeItem('token');
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
