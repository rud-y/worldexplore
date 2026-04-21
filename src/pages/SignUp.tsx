import { useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import styles from "./SignUp.module.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password || !username) alert("Please, fill all the fields.");

    try {
     console.log('Sign up hit !')
      await signup({ username, email, password });
      alert("Registration successful! Please check your email or log in.");
      navigate("/login");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to sign up");
    }
  }

  return (
    <main className={styles.signup}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Sign up to globelog</h1>
        <div className={styles.row}>
          <label htmlFor="username">Your Name</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
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

        <div className={styles.buttons}>
          <Button type="submit">Sign Up</Button>
          <Button type="button" onClick={() => navigate(-1)}>
            &larr; Back
          </Button>
        </div>
      </form>
    </main>
  );
}
