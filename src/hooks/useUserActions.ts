import { useNavigate } from 'react-router-dom';
import { useUsers } from '../context/UserContext';

export const useUserActions = () => {
  const navigate = useNavigate();
  const { users, setUsers } = useUsers();

  const handleViewDetails = (id: string) => {
    navigate(`/dashboard/users/${id}`);
  };

  const handleUpdateStatus = (id: string, newStatus: string) => {
     
    const updated = users.map(user => 
      user.id === id ? { ...user, status: newStatus } : user
    );
    if (setUsers) setUsers(updated);
    
    console.log(`User ${id} is now ${newStatus}`);
  };

  return { handleViewDetails, handleUpdateStatus };
};