import { useEffect } from 'react';
import { Eye, UserX, UserPlus, X } from 'lucide-react';
import { useUserActions } from '../../hooks/useUserActions';
import styles from './Users.module.scss';

interface Props {
  userId: string;
  onClose: () => void;
}

const UserActionMenu = ({ userId, onClose }: Props) => {
  const { handleViewDetails, handleUpdateStatus } = useUserActions();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <>
      {/* Mobile overlay */}
      <div className={styles.popoverOverlay} onClick={onClose} />

      {/* Menu popover */}
      <div className={styles.actionPopover} onClick={(e) => e.stopPropagation()}>
        {/* Mobile close button */}
        <button className={styles.popoverClose} onClick={onClose}>
          <X size={20} />
        </button>

        <div
          className={styles.popItem}
          onClick={() => { handleViewDetails(userId); onClose(); }}
        >
          <Eye size={18} /> <span>View Details</span>
        </div>

        <div
          className={styles.popItem}
          onClick={() => { handleUpdateStatus(userId, 'Blacklisted'); onClose(); }}
        >
          <UserX size={18} /> <span>Blacklist User</span>
        </div>

        <div
          className={styles.popItem}
          onClick={() => { handleUpdateStatus(userId, 'Active'); onClose(); }}
        >
          <UserPlus size={18} /> <span>Activate User</span>
        </div>
      </div>
    </>
  );
};

export default UserActionMenu;
