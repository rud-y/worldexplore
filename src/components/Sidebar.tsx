import styles from './Sidebar.module.css'
import Logo from './Logo'
import AppNav from './AppNav'
import Copyright from './Copyright'
import { Outlet } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
     <Logo />
     <AppNav />
     <Outlet />
     <footer className={styles.footer}>
      <Copyright />
     </footer>
    </div>
  )
}
