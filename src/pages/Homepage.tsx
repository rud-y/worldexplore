import styles from "./Homepage.module.css";
import { Link } from "react-router-dom"
import PageNav from "../components/PageNav"

export default function Homepage() {
  return (
    <main className={styles.homepage}>
     <PageNav />
      <section>
        <h2>
          You travel the world.
          <br />
          WorldExplore keeps track of your adventures.
        </h2>
        <h3>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experience.
        </h3>

        <Link to="/app" className="cta">Start tracking now</Link>
      </section>
    </main>
  );
}
