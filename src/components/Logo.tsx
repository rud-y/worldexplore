import styles from "./Logo.module.css";
import { Link } from "react-router-dom"

function Logo() {
  return (
    <Link to="/" aria-label="Globe log Home">
      <div className={styles.logo}>
        <h1 className={styles.globe} aria-hidden="true">globe
          <span className={styles.log}>log</span>
        </h1>
      </div>
    </Link>
  );
}

export default Logo;
