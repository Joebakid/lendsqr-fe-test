import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { User } from "../types/user";
import { getLocalUsers } from "../services/db";

interface UserContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  filteredUsers: User[];
  setFilteredUsers: (users: User[]) => void;
  loading: boolean;
  currentUser: { name: string; avatar: string };
  loginUser: (name: string) => void;
  updateProfilePic: (url: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (num: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("lendsqr_admin_profile");
    return saved ? JSON.parse(saved) : {
      name: "User",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
    };
  });

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      const data = getLocalUsers();
      setUsers(data);
      setFilteredUsers(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const loginUser = (name: string) => {
    const newProfile = { name, avatar: currentUser.avatar };
    setCurrentUser(newProfile);
    localStorage.setItem("lendsqr_admin_profile", JSON.stringify(newProfile));
  };

  const updateProfilePic = (url: string) => {
    const updated = { ...currentUser, avatar: url };
    setCurrentUser(updated);
    localStorage.setItem("lendsqr_admin_profile", JSON.stringify(updated));
  };

  return (
    <UserContext.Provider value={{
      users, setUsers, filteredUsers, setFilteredUsers, loading, currentUser,
      loginUser, updateProfilePic, currentPage, setCurrentPage,
      itemsPerPage, setItemsPerPage
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUsers must be used within a UserProvider");
  return context;
};
