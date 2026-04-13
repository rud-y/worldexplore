import styles from "./Login.module.css";
import { FormEvent, useEffect, useState } from 'react'
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
 // PRE-FILL FOR DEV PURPOSES
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [username, _setUsername] = useState("");
 const [isLogin, setIsLogin] = useState(true);

 const { login, signup, isAuthenticated } = useAuth();
 const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
   e.preventDefault();

   try {
    if(isLogin) {
     await login({ email, password})
    } else {
     await signup({username, email, password})
     alert("Check email for confirmation link")
     setIsLogin(true);
    }
   } catch (err) {
    alert(err instanceof Error ? err.message : "Failed authentication!")
   }
  }
  
  useEffect(function() {
   if(isAuthenticated) navigate("/app", { replace: true})

  }, [isAuthenticated, navigate])

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>{isLogin ? "LOGIN" : "SIGNUP"}</h2>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="current-password"
            required
          />
        </div>

        <div>
          <Button type="submit">{isLogin ? "LOGIN" : "SIGNUP"}</Button>
        </div>

        <div className={styles.toggle}>
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              className={styles.linkBtn}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up now" : "Login instead"}
            </button>
          </p>
        </div>
      </form>
    </main>
  );
}

