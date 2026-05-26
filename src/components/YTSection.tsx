'use client';

import { useState } from 'react';
import { ytPrompts, YTPrompt } from '@/data/prompts';
import Toast from './Toast';
import styles from './YTSection.module.css';

function YTCard({ p, onCopy }: { p: YTPrompt; onCopy: (text: string) => void }) {
  const [showSteps, setShowSteps] = useState(false);

  return (
    <div className={styles.ytCard}>
      <div className={styles.cardVisual}>
        <div className={styles.beforeAfter}>
          {/* BEFORE */}
          <div className={styles.ytBefore} style={{ background: p.beforeBg }}>
            <span className={styles.baLabel} style={{ left: 8 }}>Before</span>
            <div className={styles.faceCircle} />
            <div className={styles.titleBar} />
            <div className={styles.subBar} />
            <div className={styles.normalLabel}>Normal photo</div>
          </div>

          <div className={styles.ytDivider} />

          {/* AFTER — thumbnail mockup */}
          <div className={styles.ytAfter} style={{ background: p.afterBg }}>
            <span
              className={styles.baLabel}
              style={{ right: 8, color: p.afterAccent, borderColor: p.afterAccent + '44' }}
            >
              After
            </span>
            <div
              className={styles.bgGlow}
              style={{ background: p.bgPattern }}
            />
            <div
              className={styles.thumbMockup}
              style={{ borderColor: p.afterAccent + '55', background: p.afterBg }}
            >
              <div className={styles.thumbGlow} style={{ background: p.bgPattern }} />
              <div
                className={styles.thumbFace}
                style={{ background: p.faceColor, borderColor: p.afterAccent }}
              />
              <div className={styles.thumbTitle}>{p.titleText}</div>
            </div>
            <div className={styles.resultBadge} style={{ color: p.afterAccent }}>
              ↑ {p.result}
            </div>
          </div>
        </div>

        {/* OVERLAY */}
        <div className={styles.cardOverlay}>
          {showSteps ? (
            <div>
              <div className={styles.overlayTag}>How To Use</div>
              <ol className={styles.stepsList}>
                <li>Copy the prompt below</li>
                <li>Open {p.tool}</li>
                <li>Paste into the prompt / image editor</li>
                <li>Upload your photo as reference</li>
                <li>Set output to 16:9 ratio</li>
                <li>Generate and download!</li>
              </ol>
              <button className={styles.ytStepsBtn} onClick={() => setShowSteps(false)}>← Back</button>
            </div>
          ) : (
            <>
              <div className={styles.overlayTag}>{p.niche}</div>
              <div className={styles.overlayPrompt}>{p.prompt}</div>
              <div className={styles.overlayActions}>
                <button className={styles.ytCopyBtn} onClick={() => onCopy(p.prompt)}>
                  Copy Prompt
                </button>
                <button className={styles.ytStepsBtn} onClick={() => setShowSteps(true)}>
                  How To Use
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={styles.cardInfo}>
        <div className={styles.cardTitle}>{p.title}</div>
        <div className={styles.cardMeta}>
          <span className={styles.cardNiche}>{p.niche} · {p.tool}</span>
          <span className={styles.cardResult}>↑ {p.result}</span>
        </div>
      </div>
    </div>
  );
}

export default function YTSection() {
  const [toastVisible, setToastVisible] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2200);
  };

  return (
    <>
      <section className={styles.ytSection} id="youtube">
        <div className={styles.ytInner}>
          <div className={styles.ytHeader}>
            <div className={styles.ytTitleBlock}>
              <div className={styles.ytSectionLabel}>
                <span className={styles.ytNewPill}>✦ NEW</span>
                {'// YouTube Thumbnail Studio'}
              </div>
              <h2 className={styles.ytTitle}>
                Turn any photo into a<br />
                <span className={styles.ytAccent}>viral thumbnail</span><br />
                <span className={styles.ytAccent2}>in minutes.</span>
              </h2>
              <p className={styles.ytSub}>
                No designer. No Photoshop skills. Just paste our prompt, upload your
                photo, and watch it transform into a scroll-stopping YouTube thumbnail
                that actually gets clicked.
              </p>
              <button
                className={styles.ytCta}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get All Thumbnail Prompts →
              </button>
            </div>
          </div>

          {/* EXAMPLE CARDS */}
          <div className={styles.ytGrid}>
            {ytPrompts.map((p) => (
              <YTCard key={p.id} p={p} onCopy={handleCopy} />
            ))}
          </div>

          {/* FEATURE STRIP */}
          <div className={styles.featureStrip}>
            <div className={styles.featItem}>
              <div className={styles.featIcon}>⚡</div>
              <h4>Works in Minutes</h4>
              <p>Copy prompt → paste into any AI → get a pro thumbnail. No skills needed, zero experience required.</p>
            </div>
            <div className={styles.featItem}>
              <div className={styles.featIcon}>◈</div>
              <h4>Any Niche, Any Style</h4>
              <p>Finance, gaming, tech, vlogs, fitness — we have tested prompts for every YouTube category.</p>
            </div>
            <div className={styles.featItem}>
              <div className={styles.featIcon}>↗</div>
              <h4>CTR-Optimised</h4>
              <p>Every prompt is crafted with contrast, text placement and face expression that drives more clicks.</p>
            </div>
          </div>
        </div>
      </section>

      <Toast visible={toastVisible} message="Prompt Copied!" color="var(--neon4)" />
    </>
  );
}
