import { useState } from 'react';
import { Briefcase, ChevronDown } from 'lucide-react';
import { useUsers } from '../../../context/UserContext';
import styles from './OrgSwitch.module.scss';

const OrgSwitch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { users, setFilteredUsers } = useUsers();

  // Get unique organizations from our 500 users
  const organizations = Array.from(new Set(users.map(u => u.orgName)));

  const handleSwitch = (org: string) => {
    if (org === "All") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(u => u.orgName === org);
      setFilteredUsers(filtered);
    }
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.selector} onClick={() => setIsOpen(!isOpen)}>
        <Briefcase size={16} />
        <span className={styles.label}>Switch Organization</span>
        <ChevronDown size={14} className={isOpen ? styles.rotate : ''} />
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.item} onClick={() => handleSwitch("All")}>
            All Organizations
          </div>
          {organizations.map(org => (
            <div key={org} className={styles.item} onClick={() => handleSwitch(org)}>
              {org}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrgSwitch;