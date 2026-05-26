"use client";

import styles from "./Hero.module.css";

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.hero} id="home">
      <div className={styles.badge}>
        <span className={styles.blink}>●</span>&nbsp;&nbsp;AI Prompt Database —
        Updated Daily
      </div>

      <h1 className={styles.heading}>
        Stop wondering
        <br />
        how they did it.
        <br />
        <span className={styles.accent}>Get the</span>{" "}
        <span className={styles.accent2}>prompt.</span>
      </h1>

      <p className={styles.sub}>
        Every viral AI image edit. Every trending filter. Every insane effect.
        The exact prompts — ready to copy, paste, and create.
      </p>

      <div className={styles.buttons}>
        <button
          className={styles.btnPrimary}
          onClick={() => scrollTo("trending")}
        >
          Browse Trending →
        </button>
        <button
          className={styles.btnSecondary}
          onClick={() => scrollTo("youtube")}
        >
          ▶ YT Thumbnails
        </button>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statNum}>500+</div>
          <div className={styles.statLabel}>Prompts</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNum}>24h</div>
          <div className={styles.statLabel}>Update Cycle</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNum}>All AI</div>
          <div className={styles.statLabel}>Tools Covered</div>
        </div>
      </div>
    </section>
  );
}
