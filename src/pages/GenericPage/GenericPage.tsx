import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Database } from 'lucide-react';
import Loader from '../../components/Loader/Loader';
import styles from './GenericPage.module.scss';

const GenericPage = () => {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  const pageTitle = pathname
    .split('/')
    .pop()
    ?.replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase()) || 'Page';

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate a 2-second data fetch
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>{pageTitle}</h1>
        <div className={styles.loaderCenter}>
          <Loader message={`Fetching ${pageTitle} data...`} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{pageTitle}</h1>
      <div className={styles.contentCard}>
        <Database size={60} color="#213f7d" opacity={0.2} />
        <h2>No data for now</h2>
        <p>There are currently no records to display for {pageTitle}. Please check back later.</p>
      </div>
    </div>
  );
};

export default GenericPage;