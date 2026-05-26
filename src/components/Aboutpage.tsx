"use client";

import styles from "./Aboutpage.module.css";

export default function AboutPage() {
  return (
    <main className={styles.main}>
      {/* decorative grid lines */}
      <div className={styles.gridBg} />

      {/* glow blobs */}
      <div className={styles.glowA} />
      <div className={styles.glowB} />

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <div className={styles.sectionLabel}>{"// About the maker"}</div>
            <h1 className={styles.heroHeading}>
              Built by one person.
              <br />
              <span className={styles.accent}>Shipped</span> for{" "}
              <span className={styles.accent2}>everyone.</span>
            </h1>
            <p className={styles.heroSub}>
              PromptForYou is a side project born out of frustration — seeing
              incredible AI edits everywhere with zero credit, zero prompt, zero
              explanation. So I built the layer that was missing.
            </p>
            <div className={styles.heroBadges}>
              <span className={styles.badge}>
                <span className={styles.dot} />
                Surat, Gujarat 🇮🇳
              </span>
              <span className={styles.badge}>
                <span
                  className={styles.dot}
                  style={{ background: "var(--neon2)" }}
                />
                Solo Developer
              </span>
              <span className={styles.badge}>
                <span
                  className={styles.dot}
                  style={{ background: "var(--neon4)" }}
                />
                Building in Public
              </span>
            </div>
          </div>

          {/* PHOTO PLACEHOLDER */}
          <div className={styles.photoWrap}>
            <div className={styles.photoFrame}>
              <div className={styles.photoPlaceholder}>
                {/* Replace this div with your <Image /> component */}
                <div className={styles.photoIcon}>
                  <div className={styles.photoIconCircle} />
                  <div className={styles.photoIconBody} />
                </div>
                <span className={styles.photoHint}>Your photo goes here</span>
              </div>
              {/* corner accents */}
              <div className={`${styles.corner} ${styles.cornerTL}`} />
              <div className={`${styles.corner} ${styles.cornerTR}`} />
              <div className={`${styles.corner} ${styles.cornerBL}`} />
              <div className={`${styles.corner} ${styles.cornerBR}`} />
            </div>
            <div className={styles.photoLabel}>
              <span className={styles.photoName}>Solo Developer</span>
              <span className={styles.photoCity}>Surat, Gujarat</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className={styles.statsStrip}>
        <div className={styles.statsInner}>
          {[
            { num: "500+", label: "Prompts in Library" },
            { num: "24h", label: "Update Cycle" },
            { num: "4+", label: "AI Tools Covered" },
            { num: "1", label: "Developer. Just me." },
          ].map((s) => (
            <div key={s.label} className={styles.statItem}>
              <div className={styles.statNum}>{s.num}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STORY ── */}
      <section className={styles.story}>
        <div className={styles.storyInner}>
          <div className={styles.storyLeft}>
            <div className={styles.sectionLabel}>{"// The Story"}</div>
            <h2 className={styles.storyHeading}>Why I built this</h2>
          </div>
          <div className={styles.storyRight}>
            <p>
              I kept seeing AI-generated images blow up on Instagram and Twitter
              — insane cyberpunk portraits, viral YouTube thumbnails, aesthetic
              edits that racked up thousands of saves. Every time I looked for
              the prompt in the comments: nothing.
            </p>
            <p>
              Creators were gatekeeping the one thing that makes AI accessible
              to everyone — the prompt. That gap frustrated me. So I decided to
              fill it.
            </p>
            <p>
              PromptForYou is my attempt to build the definitive,
              community-driven prompt library — where every trending effect is
              documented, tested, and ready to copy-paste into any AI tool. No
              paywalls. No gatekeeping. Just prompts.
            </p>
            <p>
              I&apos;m a solo developer based in{" "}
              <span className={styles.highlight}>Surat, Gujarat</span>. This is
              a side project I work on in my spare time — but I&apos;m treating
              it like a real product. New prompts drop daily, the design is
              intentional, and the community is what will make it grow.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT I'M BUILDING ── */}
      <section className={styles.building}>
        <div className={styles.buildingInner}>
          <div
            className={styles.sectionLabel}
            style={{ textAlign: "center", marginBottom: "0.75rem" }}
          >
            {"// Roadmap"}
          </div>
          <h2 className={styles.buildingHeading}>What&apos;s coming next</h2>
          <p className={styles.buildingSub}>
            Building in public means you can see exactly what I&apos;m working
            on.
          </p>

          <div className={styles.roadmapGrid}>
            {[
              {
                status: "live",
                statusLabel: "Live",
                title: "Prompt Library",
                desc: "500+ image editing & filter prompts, updated daily. Copy with one click.",
              },
              {
                status: "live",
                statusLabel: "Live",
                title: "YT Thumbnail Studio",
                desc: "AI-powered prompts to turn normal photos into click-worthy thumbnails.",
              },
              {
                status: "building",
                statusLabel: "Building",
                title: "Search & Filter",
                desc: "Find any prompt by keyword, AI tool, style, or effect instantly.",
              },
              {
                status: "building",
                statusLabel: "Building",
                title: "User Accounts",
                desc: "Save favourites, submit your own prompts, build your collection.",
              },
              {
                status: "planned",
                statusLabel: "Planned",
                title: "Prompt Packs",
                desc: "Curated sets for specific niches — fashion, food, gaming, finance.",
              },
              {
                status: "planned",
                statusLabel: "Planned",
                title: "Community Voting",
                desc: "Upvote the best prompts. The crowd decides what trends.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`${styles.roadmapCard} ${styles[`roadmap_${item.status}`]}`}
              >
                <span
                  className={`${styles.statusPill} ${styles[`pill_${item.status}`]}`}
                >
                  {item.status === "live" && (
                    <span className={styles.pillDot} />
                  )}
                  {item.statusLabel}
                </span>
                <h4 className={styles.roadmapTitle}>{item.title}</h4>
                <p className={styles.roadmapDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className={styles.philosophy}>
        <div className={styles.philosophyInner}>
          <div className={styles.terminalBlock}>
            <div className={styles.termHeader}>
              <div className={`${styles.dot2} ${styles.r}`} />
              <div className={`${styles.dot2} ${styles.y}`} />
              <div className={`${styles.dot2} ${styles.g}`} />
              <span className={styles.termTitle}>philosophy.txt</span>
            </div>
            <div className={styles.termBody}>
              <div className={styles.termLine}>
                <span className={styles.tc}>$</span>{" "}
                <span className={styles.tv}>principle</span>{" "}
                <span className={styles.tk}>--list</span>
              </div>
              <div className={styles.termLine}>&nbsp;</div>
              <div className={styles.termLine}>
                <span className={styles.tn}>01</span> &nbsp;
                <span className={styles.to}>
                  AI should be accessible to everyone
                </span>
              </div>
              <div className={styles.termLine}>
                <span className={styles.tn}>02</span> &nbsp;
                <span className={styles.to}>
                  Prompts are a skill — sharing them levels the playing field
                </span>
              </div>
              <div className={styles.termLine}>
                <span className={styles.tn}>03</span> &nbsp;
                <span className={styles.to}>
                  Design matters even for a side project
                </span>
              </div>
              <div className={styles.termLine}>
                <span className={styles.tn}>04</span> &nbsp;
                <span className={styles.to}>
                  Build in public, ship fast, iterate honestly
                </span>
              </div>
              <div className={styles.termLine}>
                <span className={styles.tn}>05</span> &nbsp;
                <span className={styles.to}>
                  Community &gt; gatekeeping. Always.
                </span>
              </div>
              <div className={styles.termLine}>&nbsp;</div>
              <div className={styles.termLine}>
                <span className={styles.tc}>$</span>{" "}
                <span className={styles.tv}>location</span>
              </div>
              <div className={styles.termLine}>
                <span className={styles.tg}>→</span> &nbsp;Surat, Gujarat, India
                🇮🇳
              </div>
              <div className={styles.termLine}>&nbsp;</div>
              <div className={styles.termLine}>
                <span className={styles.tc}>$</span>{" "}
                <span className={styles.tv}>status</span>
              </div>
              <div className={styles.termLine}>
                <span className={styles.tg}>→</span> &nbsp;
                <span className={styles.blink}>▌</span> Building PromptForYou
                v1.0
              </div>
            </div>
          </div>

          <div className={styles.philosophyRight}>
            <div className={styles.sectionLabel}>{"// My Philosophy"}</div>
            <h2 className={styles.philosophyHeading}>
              No gatekeeping.
              <br />
              <span className={styles.accent}>Just prompts.</span>
            </h2>
            <p className={styles.philosophySub}>
              The best tools are the ones everyone can use. AI image generation
              is one of the most creative technologies ever built — but a blank
              prompt box stops most people cold.
            </p>
            <p className={styles.philosophySub} style={{ marginTop: "1rem" }}>
              PromptForYou removes that friction. You see something you like,
              you come here, you get the prompt, you create. That&apos;s the
              whole loop. Simple, fast, open.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONNECT ── */}
      <section className={styles.connect}>
        <div className={styles.connectInner}>
          <div className={styles.sectionLabel}>{"// Get in touch"}</div>
          <h2 className={styles.connectHeading}>
            Let&apos;s <span className={styles.accent}>connect.</span>
          </h2>
          <p className={styles.connectSub}>
            Have a prompt to share? Want to collaborate? Found a bug? Or just
            want to say hi from Surat — I&apos;m around.
          </p>

          <div className={styles.connectLinks}>
            <a
              href="mailto:hello@promptforyou.com"
              className={styles.connectCard}
            >
              <div className={styles.connectIcon}>✉</div>
              <div>
                <div className={styles.connectCardTitle}>Email</div>
                <div className={styles.connectCardSub}>
                  hello@promptforyou.com
                </div>
              </div>
              <div className={styles.connectArrow}>→</div>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className={styles.connectCard}
            >
              <div className={styles.connectIcon}>𝕏</div>
              <div>
                <div className={styles.connectCardTitle}>Twitter / X</div>
                <div className={styles.connectCardSub}>
                  Follow the build journey
                </div>
              </div>
              <div className={styles.connectArrow}>→</div>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className={styles.connectCard}
            >
              <div className={styles.connectIcon}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>
              <div>
                <div className={styles.connectCardTitle}>GitHub</div>
                <div className={styles.connectCardSub}>
                  See what I&apos;m building
                </div>
              </div>
              <div className={styles.connectArrow}>→</div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
