import styles from "./Login.module.css";
import { FormEvent, useEffect, useState } from 'react';
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
   e.preventDefault();

   try {
     await login({ email, password})
   } catch (err) {
    alert(err instanceof Error ? err.message : "Failed authentication!")
   }
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate],
  );

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Login</h1>
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
          <Button type="submit">LOGIN</Button>
        </div>
        <div className={styles.toggle}>
          <p>
            Don't have an account?
            <button
              type="button"
              className={styles.linkBtn}
              onClick={() => navigate("/signup")}
            >
              Sign up now
            </button>
          </p>
        </div>
      </form>
    </main>
  );
}

