import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../context/UserContext';
import Search from '../Search/Search';
import Notifications from '../Notifications/Notifications';
import logo from '../../assets/lendsqr-logo.svg';
import { ChevronDown, LogOut, Camera, Menu } from 'lucide-react';
import styles from './Navbar.module.scss';

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { currentUser, updateProfilePic } = useUsers();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateProfilePic(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => setShowDropdown(false);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={styles.header}>
      <div className={styles.leftSection}>
        <button className={styles.menuBtn} onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        
        <div className={styles.logoArea}>
          <img 
            src={logo} 
            alt="Lendsqr" 
            onClick={() => navigate('/dashboard')} 
            className={styles.logoImg}
          />
        </div>
      </div>
      
      <div className={styles.searchWrapper}>
        <Search />
      </div>

      <div className={styles.userArea}>
        <span 
          className={styles.docs} 
          onClick={() => navigate('/dashboard/docs')}
        >
          Docs
        </span>
        
        <div className={styles.iconWrapper}>
            <Notifications />
        </div>
        
        <div className={styles.profileContainer}>
          <div className={styles.profile} onClick={() => setShowDropdown(!showDropdown)}>
            <div className={styles.avatarWrapper}>
              <img src={currentUser.avatar} alt="User" />
            </div>
            <span className={styles.name}>{currentUser.name}</span>
            <ChevronDown size={14} className={showDropdown ? styles.rotate : ''} />
          </div>

          {showDropdown && (
            <div className={styles.dropdown}>
              <label className={styles.dropdownItem}>
                <Camera size={14} />
                <span>Change Photo</span>
                <input type="file" accept="image/*" onChange={handleFileChange} hidden />
              </label>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;