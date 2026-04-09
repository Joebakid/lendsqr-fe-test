import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../context/UserContext";
import { MOCK_ADMIN } from "../../services/db";
import Modal from "../Modal/Modal";
import Loader from "../Loader/Loader";
import styles from "./LoginForm.module.scss";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { loginUser } = useUsers();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (email.toLowerCase() === MOCK_ADMIN.email.toLowerCase() && password === MOCK_ADMIN.password) {
        const namePart = email.split('@')[0];
        const dynamicName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        
        localStorage.setItem("isLoggedIn", "true");
        loginUser(dynamicName); 

        window.dispatchEvent(new Event("storage"));
        
        // We do NOT set isLoading(false) here. 
        // Keeping it true ensures the loader stays up until the page changes.
        navigate("/dashboard", { replace: true });
      } else {
        setIsLoading(false);
        setIsModalOpen(true);
      }
    }, 2000);
  };

  const fillDemoCredentials = () => {
    setEmail(MOCK_ADMIN.email);
    setPassword(MOCK_ADMIN.password);
  };

  return (
    <div className={styles.formContainer}>
      {isLoading && <Loader fullScreen={true} message="Authenticating..." />}

      <h1 className={styles.title}>Welcome!</h1>
      <p className={styles.subtitle}>Enter details to login.</p>

      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.inputGroup}>
          <input 
            type="email" 
            placeholder="Email" 
            className={styles.input}
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            disabled={isLoading}
          />
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
            <span 
              className={styles.toggleText} 
              onClick={() => !isLoading && setShowPassword(!showPassword)}
            >
              {showPassword ? "HIDE" : "SHOW"}
            </span>
          </div>
        </div>

        <p className={styles.forgotPassword}>FORGOT PASSWORD?</p>

        <button 
          type="submit" 
          className={styles.button} 
          disabled={isLoading}
        >
          {isLoading ? "LOGGING IN..." : "LOG IN"}
        </button>
        
        <p className={styles.demoHint} onClick={!isLoading ? fillDemoCredentials : undefined}>
          Click here to auto-fill demo credentials
        </p>
      </form>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Login Error"
      >
        <div className={styles.modalBody}>
          <p>Invalid email or password. Please try again.</p>
        </div>
      </Modal>
    </div>
  );
};

export default LoginForm;