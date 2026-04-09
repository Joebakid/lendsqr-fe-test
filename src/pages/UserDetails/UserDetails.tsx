import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUsers } from '../../context/UserContext';
import { ArrowLeft, Star } from 'lucide-react';
import styles from './UserDetails.module.scss';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users } = useUsers();
  const [activeTab, setActiveTab] = useState('General Details');

  // Scroll to top whenever the ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
    const mainArea = document.querySelector('main');
    if (mainArea) mainArea.scrollTo(0, 0);
  }, [id]);

  const user = users.find((u) => u.id === id);

  if (!user) return <div className={styles.error}>User not found</div>;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'General Details':
        return (
          <div className={styles.infoCard}>
            <section className={styles.infoSection}>
              <h4>Personal Information</h4>
              <div className={styles.grid}>
                <InfoItem label="FULL NAME" value={`${user.profile.firstName} ${user.profile.lastName}`} />
                <InfoItem label="PHONE NUMBER" value={user.phoneNumber} />
                <InfoItem label="EMAIL ADDRESS" value={user.email} />
                <InfoItem label="BVN" value={user.profile.bvn} />
                <InfoItem label="GENDER" value={user.profile.gender} />
                <InfoItem label="MARITAL STATUS" value={user.profile.maritalStatus} />
                <InfoItem label="CHILDREN" value={user.profile.children} />
                <InfoItem label="TYPE OF RESIDENCE" value={user.profile.typeOfResidence} />
              </div>
            </section>

            <section className={styles.infoSection}>
              <h4>Education and Employment</h4>
              <div className={styles.grid}>
                <InfoItem label="LEVEL OF EDUCATION" value={user.education.level} />
                <InfoItem label="EMPLOYMENT STATUS" value={user.education.employmentStatus} />
                <InfoItem label="SECTOR OF EMPLOYMENT" value={user.education.sector} />
                <InfoItem label="DURATION OF EMPLOYMENT" value={user.education.duration} />
                <InfoItem label="OFFICE EMAIL" value={user.education.officeEmail} />
                <InfoItem label="MONTHLY INCOME" value={`₦${user.education.monthlyIncome[0]} - ₦${user.education.monthlyIncome[1]}`} />
                <InfoItem label="LOAN REPAYMENT" value={`₦${user.education.loanRepayment}`} />
              </div>
            </section>

            <section className={styles.infoSection}>
              <h4>Socials</h4>
              <div className={styles.grid}>
                <InfoItem label="TWITTER" value={user.socials.twitter} />
                <InfoItem label="FACEBOOK" value={user.socials.facebook} />
                <InfoItem label="INSTAGRAM" value={user.socials.instagram} />
              </div>
            </section>

            <section className={styles.infoSection}>
              <h4>Guarantor</h4>
              <div className={styles.grid}>
                <InfoItem label="FULL NAME" value={`${user.guarantor.firstName} ${user.guarantor.lastName}`} />
                <InfoItem label="PHONE NUMBER" value={user.guarantor.phoneNumber} />
                <InfoItem label="GENDER" value={user.guarantor.gender} />
                <InfoItem label="RELATIONSHIP" value="Sister" />
              </div>
            </section>
          </div>
        );

      case 'Bank Details':
        return (
          <div className={styles.infoCard}>
             <section className={styles.infoSection}>
              <h4>Bank Details</h4>
              <div className={styles.grid}>
                <InfoItem label="BANK NAME" value="Providus Bank" />
                <InfoItem label="ACCOUNT NUMBER" value={user.profile.bvn} />
                <InfoItem label="CURRENCY" value={user.profile.currency} />
                <InfoItem label="ACCOUNT TYPE" value="Savings" />
              </div>
            </section>
          </div>
        );

      case 'Loans':
        return (
          <div className={styles.infoCard}>
             <section className={styles.infoSection}>
              <h4>Loan Information</h4>
              <div className={styles.grid}>
                <InfoItem label="LOAN REPAYMENT" value={`₦${user.education.loanRepayment}`} />
                <InfoItem label="ACTIVE LOANS" value="1" />
                <InfoItem label="TOTAL DEBT" value={`₦${user.education.loanRepayment}`} />
              </div>
            </section>
          </div>
        );

      default:
        return (
          <div className={styles.infoCard}>
            <div className={styles.emptyTab}>
              <p>No records found for {activeTab}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => navigate('/dashboard')}>
        <ArrowLeft size={16} /> <span>Back to Users</span>
      </button>

      <div className={styles.header}>
        <h2 className={styles.title}>User Details</h2>
        <div className={styles.actions}>
          <button className={styles.blacklistBtn}>BLACKLIST USER</button>
          <button className={styles.activateBtn}>ACTIVATE USER</button>
        </div>
      </div>

      <div className={styles.profileHeader}>
        <div className={styles.topInfo}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarCircle}>
                <img src={user.profile.avatar} alt="User" />
            </div>
            <div className={styles.nameSection}>
              <h3>{user.profile.firstName} {user.profile.lastName}</h3>
              <p>{user.id.substring(0, 8)}</p>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.tierSection}>
            <p>User's Tier</p>
            {/* FIXED: Added styles. prefix to stars */}
            <div className={styles.stars}>
              <Star size={14} fill="#e9b200" color="#e9b200" />
              <Star size={14} color="#e9b200" />
              <Star size={14} color="#e9b200" />
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.bankSection}>
            <h3>₦{user.education.monthlyIncome[1]}</h3>
            <p>{user.profile.bvn}/Providus Bank</p>
          </div>
        </div>
        <div className={styles.tabs}>
          {['General Details', 'Documents', 'Bank Details', 'Loans', 'Savings', 'App and System'].map(tab => (
            <button 
                key={tab} 
                className={activeTab === tab ? styles.activeTab : ''}
                onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {renderTabContent()}
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className={styles.infoItem}>
    <p className={styles.label}>{label}</p>
    <p className={styles.value}>{value}</p>
  </div>
);

export default UserDetails;