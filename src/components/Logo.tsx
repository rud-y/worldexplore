import styles from "./Logo.module.css";
import { Link } from "react-router-dom"

function Logo() {
  return (
    <Link to="/">
      <div className={styles.logo}>
        <h1 className={styles.roam}>Roam
          <span className={styles.log}>Log</span>
        </h1>
      </div>
    </Link>
  );
}

export default Logo;
