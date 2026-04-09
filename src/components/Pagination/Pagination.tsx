import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Pagination.module.scss';

interface Props {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (num: number) => void;
}

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange, onItemsPerPageChange }: Props) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPages = () => {
    const pages: (number | string)[] = [];
    
    // If we have 7 or fewer pages, just show them all
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show page 1
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Calculate the range around the current page
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust range to show at least 3 numbers in the middle if possible
      if (currentPage <= 3) {
        start = 2;
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
        end = totalPages - 1;
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show the last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.left}>
        <span className={styles.text}>Showing</span>
        <div className={styles.selectWrapper}>
          <select 
            value={itemsPerPage} 
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <span className={styles.text}>out of {totalItems.toLocaleString()}</span>
      </div>

      <div className={styles.right}>
        <button 
          onClick={() => onPageChange(currentPage - 1)} 
          disabled={currentPage === 1}
          className={styles.arrow}
          aria-label="Previous Page"
        >
          <ChevronLeft size={16} />
        </button>

        <div className={styles.pages}>
          {getPages().map((page, i) => (
            <button
              key={i}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              className={`
                ${styles.pageBtn} 
                ${currentPage === page ? styles.active : ''} 
                ${typeof page !== 'number' ? styles.dots : ''}
              `}
            >
              {page}
            </button>
          ))}
        </div>

        <button 
          onClick={() => onPageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className={styles.arrow}
          aria-label="Next Page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;