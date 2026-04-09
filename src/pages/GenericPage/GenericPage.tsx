import React from 'react';
import { useLocation } from 'react-router-dom';
import { Database } from 'lucide-react';
import styles from './GenericPage.module.scss';

const GenericPage = () => {
  const { pathname } = useLocation();
  
   
  const pageTitle = pathname
    .split('/')
    .pop()
    ?.replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase()) || 'Page';

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