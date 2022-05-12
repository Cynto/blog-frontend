import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/LogoutForm.module.scss';

const LogoutForm = (props: { setViewLogout: Function }) => {
  const router = useRouter();
  const { setViewLogout } = props;
  return (
    <div className={styles.totalContainer} data-testid="logout-form">
      <div className={styles.background} />
      <div className={styles.logoutForm}>
        <h1>Logout</h1>
        <button
          onClick={() => {
            setViewLogout(false);
          }}
        >
          Cancel
        </button>
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

export default LogoutForm;
