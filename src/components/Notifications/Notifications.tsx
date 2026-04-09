import { useState } from 'react';
import { Bell } from 'lucide-react';
import styles from './Notifications.module.scss';

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const notifications = [
    { id: 1, text: "New user registered: Grace Effiom", time: "2 mins ago" },
    { id: 2, text: "Loan request #882 approved", time: "1 hour ago" },
    { id: 3, text: "System update scheduled for 12AM", time: "5 hours ago" }
  ];

  return (
    <div className={styles.notifContainer}>
      <div className={styles.iconWrapper} onClick={() => setIsOpen(!isOpen)}>
        <Bell size={20} className={styles.bell} />
        <span className={styles.badge}>{notifications.length}</span>
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.header}>Notifications</div>
          {notifications.map(n => (
            <div key={n.id} className={styles.item}>
              <p>{n.text}</p>
              <span>{n.time}</span>
            </div>
          ))}
          <div className={styles.footer}>View All</div>
        </div>
      )}
    </div>
  );
};

export default Notifications;