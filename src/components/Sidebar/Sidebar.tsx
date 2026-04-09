import { NavLink } from 'react-router-dom';
import OrgSwitch from './OrgSwitch/OrgSwitch';
import styles from './Sidebar.module.scss';
import {
  Users, UserCheck, UserMinus, PiggyBank, HandCoins,
  Landmark, Briefcase, Home, Settings,
  RotateCcw, UserCog, ScrollText, BarChart3,
  Settings2, Percent, ClipboardList, X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const menuData = [
    {
      title: 'CUSTOMERS',
      links: [
        { name: 'Users', icon: <Users size={16} />, path: '/dashboard' },
        { name: 'Guarantors', icon: <UserCheck size={16} />, path: '/dashboard/guarantors' },
        { name: 'Loans', icon: <HandCoins size={16} />, path: '/dashboard/loans' },
        { name: 'Decision Models', icon: <HandCoins size={16} />, path: '/dashboard/models' },
        { name: 'Savings', icon: <PiggyBank size={16} />, path: '/dashboard/savings' },
        { name: 'Loan Requests', icon: <HandCoins size={16} />, path: '/dashboard/loan-requests' },
        { name: 'Whitelist', icon: <UserCheck size={16} />, path: '/dashboard/whitelist' },
        { name: 'Karma', icon: <UserMinus size={16} />, path: '/dashboard/karma' },
      ]
    },
    {
      title: 'BUSINESSES',
      links: [
        { name: 'Organization', icon: <Briefcase size={16} />, path: '/dashboard/org' },
        { name: 'Loan Products', icon: <HandCoins size={16} />, path: '/dashboard/loan-products' },
        { name: 'Savings Products', icon: <Landmark size={16} />, path: '/dashboard/savings-products' },
        { name: 'Fees and Charges', icon: <HandCoins size={16} />, path: '/dashboard/fees' },
        { name: 'Transactions', icon: <RotateCcw size={16} />, path: '/dashboard/transactions' },
        { name: 'Services', icon: <Settings size={16} />, path: '/dashboard/services' },
        { name: 'Service Account', icon: <UserCog size={16} />, path: '/dashboard/service-account' },
        { name: 'Settlements', icon: <ScrollText size={16} />, path: '/dashboard/settlements' },
        { name: 'Reports', icon: <BarChart3 size={16} />, path: '/dashboard/reports' },
      ]
    },
    {
      title: 'SETTINGS',
      links: [
        { name: 'Preferences', icon: <Settings2 size={16} />, path: '/dashboard/preferences' },
        { name: 'Fees and Pricing', icon: <Percent size={16} />, path: '/dashboard/pricing' },
        { name: 'Audit Logs', icon: <ClipboardList size={16} />, path: '/dashboard/audit' },
      ]
    }
  ];

  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={() => setIsOpen(false)}
      />

      <aside className={`${styles.sidebar} ${isOpen ? styles.show : ''}`}>
        <button
          className={styles.closeBtn}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
          aria-label="Close Sidebar"
        >
          <X size={24} />
        </button>

        <div className={styles.topSection}>
          <OrgSwitch />

          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            onClick={() => setIsOpen(false)}
          >
            <Home size={16} />
            <span>Dashboard</span>
          </NavLink>
        </div>

        <div className={styles.menuScroll}>
          {menuData.map((section) => (
            <div key={section.title} className={styles.section}>
              <p className={styles.sectionTitle}>{section.title}</p>
              {section.links.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <span className={styles.icon}>{link.icon}</span>
                  <span>{link.name}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
