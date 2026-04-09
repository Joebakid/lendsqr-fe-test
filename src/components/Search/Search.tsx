import { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useUsers } from '../../context/UserContext';
import styles from './Search.module.scss';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setFilteredUsers, users } = useUsers();

  useEffect(() => {
    // Debounce logic: Wait for user to finish typing
    const delayDebounceFn = setTimeout(() => {
      const filtered = users.filter((user) =>
        Object.values(user).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        ) || 
        user.profile.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.profile.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, users, setFilteredUsers]);

  return (
    <div className={styles.searchContainer}>
      <input 
        type="text" 
        placeholder="Search for anything" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className={styles.searchBtn}>
        <SearchIcon size={14} />
      </button>
    </div>
  );
};

export default Search;