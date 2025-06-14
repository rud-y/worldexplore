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

     {/* <p>List of Cities</p> */}
     <Outlet />
     <footer className={styles.footer}>
      <Copyright />
     </footer>
    </div>
  )
}
