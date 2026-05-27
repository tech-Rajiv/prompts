"use client";

import styles from "./Hero.module.css";

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.hero} id="home">
      <div className={styles.inner}>
        {/* ── LEFT — text ── */}
        <div className={styles.left}>
          <div className={styles.badge}>
            <span className={styles.blink} />
            AI Prompt Database — Updated Daily
          </div>

          <h1 className={styles.heading}>
            Stop wondering
            <br />
            how they did it.
            <br />
            <span className={styles.a1}>Get the</span>{" "}
            <span className={styles.a2}>prompt.</span>
          </h1>

          <p className={styles.sub}>
            Every viral AI image edit. Every trending filter. Every insane
            effect. The exact prompts — ready to copy, paste, and create.
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
        </div>

        {/* ── RIGHT — floating image cards ── */}
        <div className={styles.cards}>
          {/* Card 1 — top left, tilted left */}
          <div className={`${styles.card} ${styles.c1}`}>
            <div className={`${styles.cardImg} ${styles.p1}`}>
              {/* Replace this div with <Image /> when ready */}
              <div className={styles.placeholder}>
                <span className={styles.placeholderHint}>Your image</span>
              </div>
              <span className={styles.fireTag}>🔥 HOT</span>
            </div>
            <div className={styles.cardInfo}>
              <span className={styles.cardTitle}>Cyberpunk Portrait</span>
              <span className={styles.cardTool}>Midjourney</span>
            </div>
          </div>

          {/* Card 2 — top right, tilted right */}
          <div className={`${styles.card} ${styles.c2}`}>
            <div className={`${styles.cardImg} ${styles.p2}`}>
              {/* Replace this div with <Image /> when ready */}
              <div className={styles.placeholder}>
                <span className={styles.placeholderHint}>Your image</span>
              </div>
            </div>
            <div className={styles.cardInfo}>
              <span className={styles.cardTitle}>Anime Filter</span>
              <span className={styles.cardTool}>DALL·E 3</span>
            </div>
          </div>

          {/* Card 3 — centre, slight tilt, on top */}
          <div className={`${styles.card} ${styles.c3}`}>
            <div className={`${styles.cardImg} ${styles.p3}`}>
              {/* Replace this div with <Image /> when ready */}
              <div className={styles.placeholder}>
                <span className={styles.placeholderHint}>Your image</span>
              </div>
              <span className={styles.fireTag}>🔥 HOT</span>
            </div>
            <div className={styles.cardInfo}>
              <span className={styles.cardTitle}>Y2K Glitch</span>
              <span className={styles.cardTool}>Stable Diffusion</span>
            </div>
          </div>

          {/* Card 4 — bottom right */}
          <div className={`${styles.card} ${styles.c4}`}>
            <div className={`${styles.cardImg} ${styles.p4}`}>
              {/* Replace this div with <Image /> when ready */}
              <div className={styles.placeholder}>
                <span className={styles.placeholderHint}>Your image</span>
              </div>
            </div>
            <div className={styles.cardInfo}>
              <span className={styles.cardTitle}>Neon Deity</span>
              <span className={styles.cardTool}>Midjourney</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
