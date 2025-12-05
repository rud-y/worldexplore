import styles from "./Homepage.module.css";
import { Link } from "react-router-dom"
import PageNav from "../components/PageNav"

export default function Homepage() {
  return (
    <main className={styles.homepage}>
     <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
        </h1>
        <h2>
          A world map that tracks your footsteps into every city. Never forget your experience.
        </h2>

        <Link to="/login" className="cta">Start tracking now</Link>
      </section>
    </main>
  );
}
