import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from "./pages/Login/Login";
import Users from "./pages/Users/Users";
import UserDetails from "./pages/UserDetails/UserDetails";
import Docs from "./pages/Docs/Docs";
import NotFound from "./pages/NotFound/NotFound";
import GenericPage from "./pages/GenericPage/GenericPage";
import DashboardLayout from "./layout/dashboard/DashboardLayout";
import { UserProvider } from './context/UserContext';
import { seedDatabase } from './services/db';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const mainArea = document.querySelector('main');
    if (mainArea) mainArea.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const [authStatus, setAuthStatus] = useState(localStorage.getItem("isLoggedIn") === "true");

  const sidebarPaths = [
    "guarantors", "loans", "models", "savings", "loan-requests", 
    "whitelist", "karma", "org", "loan-products", "savings-products",
    "fees", "transactions", "services", "service-account", 
    "settlements", "reports", "preferences", "pricing", "audit"
  ];

  useEffect(() => {
    seedDatabase();
    
    const checkAuth = () => {
      setAuthStatus(localStorage.getItem("isLoggedIn") === "true");
    };

    window.addEventListener("storage", checkAuth);
    const interval = setInterval(checkAuth, 1000); 

    return () => {
      window.removeEventListener("storage", checkAuth);
      clearInterval(interval);
    };
  }, []);

  return (
    <UserProvider>
      <Router>
        <ScrollToTop /> 

        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/dashboard">
            <Route 
              index 
              element={
                authStatus ? (
                  <DashboardLayout><Users /></DashboardLayout>
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            
            <Route 
              path="users/:id" 
              element={
                authStatus ? (
                  <DashboardLayout><UserDetails /></DashboardLayout>
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />

            <Route 
              path="docs" 
              element={
                authStatus ? (
                  <DashboardLayout><Docs /></DashboardLayout>
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />

            {sidebarPaths.map(path => (
              <Route 
                key={path}
                path={path} 
                element={
                  authStatus ? (
                    <DashboardLayout><GenericPage /></DashboardLayout>
                  ) : (
                    <Navigate to="/login" replace />
                  )
                } 
              />
            ))}

            <Route 
              path="*" 
              element={
                authStatus ? (
                  <DashboardLayout><NotFound /></DashboardLayout>
                ) : (
                  <NotFound />
                )
              } 
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;