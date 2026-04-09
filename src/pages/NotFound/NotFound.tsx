import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.scss';
import { Ghost } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconBox}>
          <Ghost size={80} color="#213f7d" strokeWidth={1.5} />
        </div>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.description}>
          Oops! The page you're looking for seems to have vanished into thin air. 
          It might have been moved or deleted.
        </p>
        <button className={styles.homeBtn} onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;