import type { User } from '../types/user';
import { generate500Users } from '../utils/mockData';

const STORAGE_KEY = 'lendsqr_users';

export const getLocalUsers = (): User[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const seedDatabase = () => {
  const existing = getLocalUsers();
  // Only generate if the database is empty
  if (existing.length === 0) {
    const users = generate500Users();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    return users;
  }
  return existing;
};

// Admin Credentials
export const MOCK_ADMIN = {
  email: 'admin@lendsqr.com',
  password: 'password123',
  fullName: 'Admin'
};