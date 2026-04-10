import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../context/UserContext";
import Pagination from "../../components/Pagination/Pagination";
import UserActionMenu from "./UserActionMenu";
import FilterForm from "./FilterForm";
import Loader from "../../components/Loader/Loader";
import { 
  UserIcon, 
  ActiveUserIcon, 
  LoanIcon, 
  SavingsIcon 
} from "../../components/Icons/StatsIcons";
import { MoreVertical, ListFilter } from "lucide-react";
import styles from "./Users.module.scss";

const Users = () => {
  const { 
    filteredUsers, 
    loading, 
    currentPage, 
    setCurrentPage, 
    itemsPerPage, 
    setItemsPerPage,
    setFilteredUsers,
    users
  } = useUsers();
  
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const mainContent = document.querySelector('main');
    if (mainContent) mainContent.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  useEffect(() => {
    const handleClickOutside = () => {
      setActiveMenu(null);
      setOpenFilter(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleFilter = (filterData: any) => {
    const filtered = users.filter((user: any) => {
      return (
        (!filterData.organization || user.orgName.toLowerCase().includes(filterData.organization.toLowerCase())) &&
        (!filterData.username || user.userName.toLowerCase().includes(filterData.username.toLowerCase())) &&
        (!filterData.email || user.email.toLowerCase().includes(filterData.email.toLowerCase())) &&
        (!filterData.phoneNumber || user.phoneNumber.includes(filterData.phoneNumber)) &&
        (!filterData.status || user.status === filterData.status)
      );
    });
    setFilteredUsers(filtered);
    setCurrentPage(1);
    setOpenFilter(null);
  };

  const stats = [
    { label: "USERS", count: "2,453", icon: <UserIcon />, bg: "rgba(223, 24, 255, 0.1)" },
    { label: "ACTIVE USERS", count: "2,453", icon: <ActiveUserIcon />, bg: "rgba(87, 24, 255, 0.1)" },
    { label: "USERS WITH LOANS", count: "12,453", icon: <LoanIcon />, bg: "rgba(245, 95, 68, 0.1)" },
    { label: "USERS WITH SAVINGS", count: "102,453", icon: <SavingsIcon />, bg: "rgba(255, 51, 102, 0.1)" },
  ];

  if (loading) return <Loader fullScreen={false} message="Fetching users..." size="medium" />;

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Users</h1>

      <div className={styles.statsGrid}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.iconCircle} style={{ backgroundColor: stat.bg }}>
              {stat.icon}
            </div>
            <p className={styles.statLabel}>{stat.label}</p>
            <h3 className={styles.statCount}>{stat.count}</h3>
          </div>
        ))}
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableResponsiveWrapper}>
          <table className={styles.userTable}>
            <thead>
              <tr>
                {["ORGANIZATION", "USERNAME", "EMAIL", "PHONE NUMBER", "DATE JOINED", "STATUS"].map((head) => (
                  <th key={head} className={styles.headerCell}>
                    <div 
                      className={styles.thContent} 
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenFilter(openFilter === head ? null : head);
                      }}
                    >
                      <span>{head}</span>
                      <ListFilter size={14} className={styles.filterIcon} />
                    </div>
                    
                    {openFilter === head && (
                      <FilterForm 
                        onFilter={handleFilter} 
                        onReset={() => {
                          setFilteredUsers(users);
                          setOpenFilter(null);
                        }} 
                      />
                    )}
                  </th>
                ))}
                <th style={{ width: '50px' }}></th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr 
                    key={user.id} 
                    onClick={() => navigate(`/dashboard/users/${user.id}`)}
                    className={`${styles.clickableRow} ${activeMenu === user.id ? styles.activeRow : ''}`}
                  >
                    <td>{user.orgName}</td>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>
                      {new Date(user.lastActiveDate).toLocaleString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric', 
                        hour: 'numeric', 
                        minute: '2-digit' 
                      })}
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[user.status.toLowerCase()]}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className={styles.actionCell} onClick={(e) => e.stopPropagation()}>
                      <button 
                        className={styles.menuBtn}
                        onClick={() => setActiveMenu(activeMenu === user.id ? null : user.id)}
                      >
                        <MoreVertical size={18} />
                      </button>

                      {activeMenu === user.id && (
                        <UserActionMenu 
                          userId={user.id} 
                          onClose={() => setActiveMenu(null)} 
                        />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className={styles.emptyState}>
                    No users found matching the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.paginationWrapper}>
          <Pagination 
            totalItems={filteredUsers.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(num) => { 
              setItemsPerPage(num); 
              setCurrentPage(1); 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Users;