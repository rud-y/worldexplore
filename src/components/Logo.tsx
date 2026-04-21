import styles from "./Logo.module.css";
import { Link } from "react-router-dom"

function Logo() {
  return (
    <Link to="/">
      <div className={styles.logo}>
        <h1 className={styles.roam}>roam
          <span className={styles.log}>log</span>
        </h1>
      </div>
    </Link>
  );
}

export default Logo;
