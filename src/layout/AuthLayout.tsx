import { ReactNode } from "react";
import logo from "../assets/lendsqr-logo.svg";
import hero from "../assets/pablo-sign-in.svg";
import styles from "./AuthLayout.module.scss";

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.logoWrapper}>
          <img src={logo} alt="Lendsqr Logo" className={styles.logo} />
        </div>
        <div className={styles.heroWrapper}>
          <img src={hero} alt="Sign in illustration" className={styles.heroImg} />
        </div>
      </div>

      <div className={styles.right}>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;