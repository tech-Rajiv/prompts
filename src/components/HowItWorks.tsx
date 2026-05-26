import styles from './HowItWorks.module.css';

export default function HowItWorks() {
  return (
    <section className={styles.how}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className="section-label">// How It Works</div>
          <h2 className="section-title">Three steps.<br />Insane results.</h2>
          <ul className={styles.stepsList}>
            <li className={styles.stepItem}>
              <div className={styles.stepNum}>01</div>
              <div className={styles.stepText}>
                <h4>Find your filter</h4>
                <p>Browse trending prompts or search by style. See before/after previews for every effect.</p>
              </div>
            </li>
            <li className={styles.stepItem}>
              <div className={styles.stepNum}>02</div>
              <div className={styles.stepText}>
                <h4>Copy the prompt</h4>
                <p>Hit copy — the exact prompt is on your clipboard, optimised and ready to use.</p>
              </div>
            </li>
            <li className={styles.stepItem}>
              <div className={styles.stepNum}>03</div>
              <div className={styles.stepText}>
                <h4>Paste into any AI</h4>
                <p>Works with Midjourney, ChatGPT, Firefly, Stable Diffusion — any AI image tool.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className={styles.terminal}>
          <div className={styles.termHeader}>
            <div className={`${styles.dot} ${styles.red}`} />
            <div className={`${styles.dot} ${styles.yellow}`} />
            <div className={`${styles.dot} ${styles.green}`} />
          </div>
          <div className={styles.termLine}><span className={styles.comment}>{'// Cyberpunk Portrait'}</span></div>
          <div className={styles.termLine}>&nbsp;</div>
          <div className={styles.termLine}><span className={styles.prompt}>PROMPT</span> <span className={styles.val}>→</span></div>
          <div className={`${styles.termLine} ${styles.termCode}`}>"Cinematic cyberpunk portrait,</div>
          <div className={`${styles.termLine} ${styles.termCode}`}>neon rim lighting, rain bokeh,</div>
          <div className={`${styles.termLine} ${styles.termCode}`}>8k, hyperrealistic, --ar 2:3"</div>
          <div className={styles.termLine}>&nbsp;</div>
          <div className={styles.termLine}><span className={styles.prompt}>TOOL</span>&nbsp;&nbsp;<span className={styles.val}>→</span> <span className={styles.out}>Midjourney v6</span></div>
          <div className={styles.termLine}><span className={styles.prompt}>STEPS</span>&nbsp;<span className={styles.val}>→</span> <span className={styles.out}>Upload photo → /imagine</span></div>
          <div className={styles.termLine}><span className={styles.prompt}>TIME</span>&nbsp;&nbsp;<span className={styles.val}>→</span> <span className={styles.out}>~45 seconds</span></div>
          <div className={styles.termLine}>&nbsp;</div>
          <div className={`${styles.termLine} ${styles.success}`}>✓ Copied to clipboard</div>
        </div>
      </div>
    </section>
  );
}
