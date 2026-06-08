import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import styles from "./User.module.css";

function User() {
 const { user, logout } = useAuth();
 const navigate = useNavigate();
 
 function handleLogout() {
  logout();
  navigate("/")
  }

  if (!user) return null;

  const userFullName = user.user_metadata?.full_name;
  console.log('USER--- ', user)

  return (
    <div className={styles.user} role="region" aria-label={`Welcome ${userFullName}`}>
      <span aria-hidden="true">Welcome, {userFullName || "User"}</span>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default User;
