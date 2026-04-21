import styles from "./About.module.css";
import PageNav from "../components/PageNav";

export default function About() {
  return (
    <main className={styles.about}>
      <PageNav />
      <section>
        <picture>
          <source srcSet="granada2__.jpg" type="image/webp" />
          <img src="granada__.jpg" alt="City of Granada" loading="lazy" />
        </picture>
        <div>
          <h2>About globelog</h2>
          <p>
            The Journey is Yours. globelog was built for those who move. It’s a
            simple, intentional space to track your global footprint and
            preserve the moments that a camera can’t always catch. We believe we
            travel to find ourselves, but we often leave pieces of our story
            behind in the cities we visit. globelog helps you gather those pieces
            back up. It’s more than just a list of coordinates. It’s a living
            map of your life.
          </p>
          <p>
            Stop wondering when you were there and start building your legacy of
            travel. Your journey is vast. Let’s keep track of it together.
          </p>
        </div>
      </section>
    </main>
  );
}
