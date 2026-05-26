import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className="section-label">// About</div>
      <h2 className="section-title">Why PromptForYou?</h2>
      <p className={styles.sub}>
        We got tired of seeing incredible AI edits with zero credits. This is the missing
        layer — a community-driven database where every viral prompt is documented, tested,
        and ready to use.
      </p>

      <div className={styles.grid}>
        <div className={styles.item}>
          <div className={styles.icon} style={{ color: 'var(--neon)' }}>◈</div>
          <h4>Community Driven</h4>
          <p>Real prompts from real creators. Tested and verified before publishing.</p>
        </div>
        <div className={styles.item}>
          <div className={styles.icon} style={{ color: 'var(--neon2)' }}>◈</div>
          <h4>Always Trending</h4>
          <p>Updated daily with whatever&apos;s blowing up on social right now.</p>
        </div>
        <div className={styles.item}>
          <div className={styles.icon} style={{ color: 'var(--neon3)' }}>◈</div>
          <h4>Any AI Tool</h4>
          <p>Every prompt includes which AI tool works best. No exclusives.</p>
        </div>
      </div>
    </section>
  );
}
