import { NavLink } from "react-router-dom";
import styles from "./PageNavBurgerList.module.css"

function PageNavBurgerList() {
  return (
    <ul className={styles.items}>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </ul>
  );
}

export default PageNavBurgerList;