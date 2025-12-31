import { NavLink } from "react-router-dom";
import styles from "./PageNavBurgerList.module.css"

function PageNavBurgerList() {
  return (
    <ul className={styles.items}>
      <li>
        <NavLink to="/product">Products</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </ul>
  );
}

export default PageNavBurgerList;