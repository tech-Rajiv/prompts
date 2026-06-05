"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./Herob.module.css";

const cards = [
  { title: "Cyberpunk Portrait", tool: "Midjourney", hot: true },
  { title: "Anime Filter", tool: "DALL·E 3", hot: false },
  { title: "Y2K Glitch", tool: "Stable Diffusion", hot: true },
  { title: "Neon Deity", tool: "Midjourney", hot: true },
  { title: "Liquid Chrome", tool: "Adobe Firefly", hot: false },
  { title: "Vaporwave Dream", tool: "Midjourney", hot: true },
  { title: "Dark Academia", tool: "DALL·E 3", hot: false },
  { title: "Biopunk Creature", tool: "Stable Diffusion", hot: false },
];

const CARD_W = 236; // card width px
const CARD_GAP = 16; // gap px
const STEP = CARD_W + CARD_GAP;
const VISIBLE = 4;
const MAX = cards.length - VISIBLE;

export default function HeroB() {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const goTo = (n: number) => setCur(Math.max(0, Math.min(n, MAX)));

  // auto-scroll every 3 s
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setCur((c) => (c >= MAX ? 0 : c + 1));
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused]);

  return (
    <section className={styles.hero} id="home">
      {/* ── TOP — centred text ── */}
      <div className={styles.top}>
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
      </div>

      {/* ── CAROUSEL ── */}
      <div
        className={styles.carouselWrap}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className={styles.carouselLabel}>
          {"// Trending prompts — hover any card to copy"}
        </div>

        <div className={styles.trackOuter}>
          {/* left fade */}
          <div className={styles.fadeLeft} />
          <div className={styles.fadeRight} />

          <div
            className={styles.track}
            style={{ transform: `translateX(-${cur * STEP}px)` }}
          >
            {cards.map((c, i) => (
              <div key={i} className={styles.card}>
                {/* 🖼 Replace .cardImg div with <Image /> when ready */}
                <div
                  className={`${styles.cardImg} ${styles[`p${(i % 6) + 1}`]}`}
                >
                  <div className={styles.placeholder}>
                    <span className={styles.placeholderHint}>Add image</span>
                  </div>
                  {c.hot && <span className={styles.hotTag}>🔥 HOT</span>}

                  {/* hover overlay */}
                  <div className={styles.overlay}>
                    <button className={styles.copyBtn}>Copy Prompt</button>
                  </div>
                </div>

                <div className={styles.cardInfo}>
                  <span className={styles.cardTitle}>{c.title}</span>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardTool}>{c.tool}</span>
                    <span className={styles.cardHot}>
                      {c.hot ? "🔥 Hot" : "★ Saved"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* nav */}
        <div className={styles.nav}>
          <button
            className={styles.navBtn}
            onClick={() => goTo(cur - 1)}
            disabled={cur === 0}
          >
            ←
          </button>

          <div className={styles.dots}>
            {Array.from({ length: MAX + 1 }).map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === cur ? styles.dotOn : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            className={styles.navBtn}
            onClick={() => goTo(cur + 1)}
            disabled={cur === MAX}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
