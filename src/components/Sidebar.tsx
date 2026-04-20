import styles from './Sidebar.module.css';
import AppNav from './AppNav';
import Copyright from './Copyright';
import { Outlet } from 'react-router-dom';
import Logo from "../components/Logo";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logoWrap}>
        <Logo />
      </div>
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <Copyright />
      </footer>
    </div>
  );
}
