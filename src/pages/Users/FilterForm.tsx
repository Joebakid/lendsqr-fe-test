import React, { useState } from 'react';
import styles from './FilterForm.module.scss';

interface FilterFormProps {
  onFilter: (filters: any) => void;
  onReset: () => void;
}

const FilterForm = ({ onFilter, onReset }: FilterFormProps) => {
  const [formData, setFormData] = useState({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(formData);
  };

  const handleResetClick = () => {
    setFormData({
      organization: "",
      username: "",
      email: "",
      date: "",
      phoneNumber: "",
      status: "",
    });
    onReset();
  };

  return (
    <div className={styles.filterFormContainer} onClick={(e) => e.stopPropagation()}>
      <form onSubmit={handleSubmit} className={styles.filterForm}>
        <div className={styles.inputGroup}>
          <label>Organization</label>
          <select name="organization" value={formData.organization} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Lendsqr">Lendsqr</option>
            <option value="Irorun">Irorun</option>
            <option value="Lendstar">Lendstar</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="User"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
            <option value="Blacklisted">Blacklisted</option>
          </select>
        </div>

        <div className={styles.formActions}>
          <button type="button" className={styles.resetBtn} onClick={handleResetClick}>
            Reset
          </button>
          <button type="submit" className={styles.filterBtn}>
            Filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterForm;