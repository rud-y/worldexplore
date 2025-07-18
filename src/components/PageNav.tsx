import { NavLink } from "react-router-dom"
import styles from "./PageNav.module.css"
import Logo from "./Logo"

function PageNav() {
 return (
  <nav className={styles.nav}>
    <Logo />
   <ul>
    {/* <li>
     <NavLink to="/home">Homepage</NavLink>
    </li> */}
    <li>
     <NavLink to="/product">Products</NavLink>
    </li>
     <li>
     <NavLink to="/pricing">Pricing</NavLink>
    </li>
     <li>
     <NavLink to="/login">Login</NavLink>
    </li>
   </ul>
  </nav>
 )
}

export default PageNav;