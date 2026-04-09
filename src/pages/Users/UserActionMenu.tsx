import React from 'react';
import { Eye, UserX, UserPlus } from 'lucide-react';
import { useUserActions } from '../../hooks/useUserActions';
import styles from './Users.module.scss';

interface Props {
  userId: string;
  onClose: () => void;
}

const UserActionMenu = ({ userId, onClose }: Props) => {
  const { handleViewDetails, handleUpdateStatus } = useUserActions();

  return (
    <div className={styles.actionPopover} onClick={(e) => e.stopPropagation()}>
      <div 
        className={styles.popItem} 
        onClick={() => { handleViewDetails(userId); onClose(); }}
      >
        <Eye size={14} /> <span>View Details</span>
      </div>
      
      <div 
        className={styles.popItem} 
        onClick={() => { handleUpdateStatus(userId, 'Blacklisted'); onClose(); }}
      >
        <UserX size={14} /> <span>Blacklist User</span>
      </div>
      
      <div 
        className={styles.popItem} 
        onClick={() => { handleUpdateStatus(userId, 'Active'); onClose(); }}
      >
        <UserPlus size={14} /> <span>Activate User</span>
      </div>
    </div>
  );
};

export default UserActionMenu;