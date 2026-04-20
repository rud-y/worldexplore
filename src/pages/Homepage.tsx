import styles from "./Homepage.module.css";
import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          The footprint of your travels.
          <br />
        </h1>
        <h2>
          From bustling skylines to quiet corners, record where you’ve been and
          how it felt to be there. Your world, beautifully cataloged
        </h2>

        <Link to="/login" className="cta">
          Start now
        </Link>
      </section>
    </main>
  );
}
