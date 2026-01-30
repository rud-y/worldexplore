import { NavLink } from "react-router-dom"
import styles from "./PageNav.module.css"
import Logo from "./Logo"
import PageNavBurger from "./PageNavBurger"
import useScreenSize from "../hooks/UseScreenSize"


function PageNav() {
 const screenSize = useScreenSize();
 const maxScreenSize = 680;

 return (
   <nav className={styles.nav}>
     <Logo />
     {screenSize.width < maxScreenSize ? (
       <PageNavBurger />
     ) : (
       <ul>
         <li>
           <NavLink to="/product">Products</NavLink>
         </li>
         <li>
           <NavLink to="/login">Login</NavLink>
         </li>
       </ul>
     )}
   </nav>
 );
}

export default PageNav;