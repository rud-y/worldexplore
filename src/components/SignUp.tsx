import { useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css"; // Reuse your login styles

export default function Signup() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password || !username) return;

    try {
      await signup({ email, password, username });

      alert("Registration successful! Please check your email or log in.");
      navigate("/login");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to sign up");
    }
  }

  return (
    <main className={styles.login}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={username}
            required
          />
        </div>

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
            required
          />
        </div>

        <div>
          <button className="btn">Sign Up</button>
        </div>
      </form>
    </main>
  );
}
