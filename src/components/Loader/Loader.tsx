import React from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
  fullScreen?: boolean;
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

const Loader = ({ 
  fullScreen = false, 
  message = "Loading...", 
  size = 'medium' 
}: LoaderProps) => {
  return (
    <div className={`${styles.loaderWrapper} ${fullScreen ? styles.fullScreen : ''}`}>
      <div className={styles.content}>
        <div className={`${styles.spinner} ${styles[size]}`} />
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

export default Loader;