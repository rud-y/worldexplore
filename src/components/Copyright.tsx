import styles from './Sidebar.module.css'

export default function Copyright() {
  return (
    <div><p className={styles.copyright}>&copy; Copyright {new Date().getFullYear()} by WorldExplore</p></div>
  )
}
