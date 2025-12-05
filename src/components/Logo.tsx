import styles from "./Logo.module.css";
import { Link } from "react-router-dom"

function Logo() {
  return (
    <Link to="/">
      <div className={styles.logo}>
        <h1 className={styles.world}>WORLD</h1><h1 className={styles.explore}>EXPLORE</h1>
      </div>
    </Link>
  );
}

export default Logo;
