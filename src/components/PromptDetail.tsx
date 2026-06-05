'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Prompt,
  BADGE_LABELS,
  getPromptSteps,
  getPromptPhotoTips,
  getRelatedPrompts,
  getPromptEngagement,
} from '@/data/prompts';
import { useGuestCopyLimit } from '@/hooks/useGuestCopyLimit';
import LoginModal from './LoginModal';
import Toast from './Toast';
import styles from './PromptDetail.module.css';

interface Props {
  prompt: Prompt;
}

interface Comment {
  id: number;
  author: string;
  avatar: string;
  body: string;
  time: string;
}

// Static seed comments — backend wiring comes later, see [[project]] notes.
const SEED_COMMENTS: Comment[] = [
  {
    id: 1,
    author: 'neon_alex',
    avatar: '#00f5c4',
    body: 'Ran this on my street photo and the result was unreal. The rim lighting hit perfectly.',
    time: '2d ago',
  },
  {
    id: 2,
    author: 'pixel.maya',
    avatar: '#bf5fff',
    body: 'Tip: bump the resolution on your source first, it follows the prompt way more accurately.',
    time: '5d ago',
  },
  {
    id: 3,
    author: 'studio_ravi',
    avatar: '#ff4ecd',
    body: 'Been looking for exactly this style for a thumbnail set. Copied — thank you!',
    time: '1w ago',
  },
];

function BeforeAfter({ p }: { p: Prompt }) {
  return (
    <div className={styles.beforeAfter}>
      <div className={styles.baSide} style={{ background: p.colorA }}>
        <span className={styles.baLabel} style={{ color: p.accentA, borderColor: p.accentA + '44' }}>
          {p.before || 'Before'}
        </span>
        <svg width="110" height="110" viewBox="0 0 60 60" fill="none" aria-hidden>
          <circle cx="30" cy="22" r="10" fill={p.accentA} opacity="0.15" />
          <rect x="10" y="36" width="40" height="14" rx="4" fill={p.accentA} opacity="0.1" />
          <circle cx="30" cy="22" r="6" fill={p.accentA} opacity="0.3" />
        </svg>
      </div>
      <div className={styles.baDivider} />
      <div className={styles.baSide} style={{ background: p.colorB }}>
        <span
          className={`${styles.baLabel} ${styles.baLabelRight}`}
          style={{ color: p.accentB, borderColor: p.accentB + '44' }}
        >
          {p.after || 'After'}
        </span>
        <svg width="110" height="110" viewBox="0 0 60 60" fill="none" aria-hidden>
          <circle cx="30" cy="22" r="10" fill={p.accentB} opacity="0.25" />
          <rect x="10" y="36" width="40" height="14" rx="4" fill={p.accentB} opacity="0.2" />
          <circle cx="30" cy="22" r="6" fill={p.accentB} opacity="0.5" />
          <circle cx="30" cy="22" r="3" fill={p.accentB} opacity="0.9" />
        </svg>
      </div>
    </div>
  );
}

export default function PromptDetail({ prompt: p }: Props) {
  const { copiesRemaining, isCopyLocked, unlimited, tryCopy } = useGuestCopyLimit();
  const [loginOpen, setLoginOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('Prompt Copied!');

  const baseEngagement = useMemo(() => getPromptEngagement(p.id), [p.id]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(baseEngagement.likes);

  const [comments, setComments] = useState<Comment[]>(SEED_COMMENTS);
  const [draft, setDraft] = useState('');

  const steps = useMemo(() => getPromptSteps(p), [p]);
  const photoTips = useMemo(() => getPromptPhotoTips(p), [p]);
  const related = useMemo(() => getRelatedPrompts(p.id), [p.id]);

  const notify = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2200);
  };

  const requireLogin = () => {
    if (!unlimited) setLoginOpen(true);
  };

  const handleCopy = () => {
    if (isCopyLocked) {
      requireLogin();
      return;
    }
    tryCopy(p.prompt, () => notify('Prompt Copied!'), requireLogin);
  };

  const handleLike = () => {
    setLiked((prev) => {
      setLikeCount((c) => c + (prev ? -1 : 1));
      return !prev;
    });
  };

  const handleShare = async () => {
    const url = window.location.href;
    const shareData = { title: p.title, text: `Check out "${p.title}" on PromptForYou`, url };
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      notify('Link copied!');
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    const body = draft.trim();
    if (!body) return;
    setComments((prev) => [
      { id: Date.now(), author: 'you', avatar: '#00f5c4', body, time: 'just now' },
      ...prev,
    ]);
    setDraft('');
    notify('Comment added!');
  };

  return (
    <>
      <section className={styles.section}>
        <Link href="/all-filters" className={styles.back}>
          ← Back to Library
        </Link>

        <div className={styles.layout}>
          {/* ── Left: visual + prompt ───────────────────────── */}
          <div className={styles.main}>
            <div className={styles.visualWrap}>
              <div className={`${styles.badgeTag} ${styles[`badge_${p.badge}`]}`}>
                {BADGE_LABELS[p.badge]}
              </div>
              <BeforeAfter p={p} />
            </div>

            <div className={styles.heading}>
              <h1 className={styles.title}>{p.title}</h1>
              <div className={styles.metaRow}>
                <span className={styles.metaPill}>{p.tool}</span>
                <span className={styles.metaPill}>{p.category}</span>
              </div>
            </div>

            {/* Engagement bar */}
            <div className={styles.engageBar}>
              <button
                type="button"
                onClick={handleLike}
                className={`${styles.engageBtn} ${liked ? styles.engageActive : ''}`}
                aria-pressed={liked}
              >
                <svg viewBox="0 0 16 16" width="16" height="16" fill={liked ? 'currentColor' : 'none'}>
                  <path
                    d="M8 13.5s-4.5-2.9-4.5-6a2.8 2.8 0 0 1 5-1.7A2.8 2.8 0 0 1 12.5 7.5c0 3.1-4.5 6-4.5 6z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                </svg>
                {likeCount.toLocaleString()}
              </button>
              <a href="#comments" className={styles.engageBtn}>
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                  <path
                    d="M2.5 3.5h11v7.5H9.2L8 13l-1.2-2H2.5V3.5z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                </svg>
                {comments.length}
              </a>
              <button type="button" onClick={handleShare} className={styles.engageBtn}>
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                  <path
                    d="M11 2.5 5 7.5l6 5M5 2.5h6v6"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Share
              </button>
            </div>

            {/* Full prompt */}
            <div className={styles.block}>
              <div className={styles.blockHead}>
                <h2 className={styles.blockTitle}>{'// Full Prompt'}</h2>
                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={handleCopy}
                  aria-label="Copy prompt"
                >
                  {isCopyLocked ? 'Sign in to copy' : 'Copy Prompt'}
                  {!unlimited && !isCopyLocked && (
                    <span className={styles.copyCount}>{copiesRemaining}</span>
                  )}
                </button>
              </div>
              <pre className={styles.promptText}>{p.prompt}</pre>
            </div>

            {/* Steps */}
            <div className={styles.block}>
              <h2 className={styles.blockTitle}>{'// Steps to Follow'}</h2>
              <ol className={styles.steps}>
                {steps.map((step, i) => (
                  <li key={i} className={styles.step}>
                    <span className={styles.stepNum}>{i + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Photo tips */}
            <div className={styles.block}>
              <h2 className={styles.blockTitle}>{'// Tips for Your Source Photo'}</h2>
              <ul className={styles.tips}>
                {photoTips.map((tip, i) => (
                  <li key={i} className={styles.tip}>
                    <span className={styles.tipMark}>✦</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Comments */}
            <div className={styles.block} id="comments">
              <h2 className={styles.blockTitle}>
                {'// Comments'} <span className={styles.count}>({comments.length})</span>
              </h2>

              <form className={styles.commentForm} onSubmit={handleAddComment}>
                <textarea
                  className={styles.commentInput}
                  placeholder="Share how this prompt worked for you…"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={3}
                />
                <button type="submit" className={styles.commentSubmit} disabled={!draft.trim()}>
                  Post Comment
                </button>
              </form>

              <ul className={styles.commentList}>
                {comments.map((c) => (
                  <li key={c.id} className={styles.comment}>
                    <span className={styles.avatar} style={{ background: c.avatar }}>
                      {c.author[0].toUpperCase()}
                    </span>
                    <div className={styles.commentBody}>
                      <div className={styles.commentMeta}>
                        <span className={styles.commentAuthor}>@{c.author}</span>
                        <span className={styles.commentTime}>{c.time}</span>
                      </div>
                      <p className={styles.commentText}>{c.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Right: sticky aside ─────────────────────────── */}
          <aside className={styles.aside}>
            <div className={styles.asideCard}>
              <div className={styles.asideRow}>
                <span className={styles.asideKey}>AI Tool</span>
                <span className={styles.asideVal}>{p.tool}</span>
              </div>
              <div className={styles.asideRow}>
                <span className={styles.asideKey}>Category</span>
                <span className={styles.asideVal}>{p.category}</span>
              </div>
              <div className={styles.asideRow}>
                <span className={styles.asideKey}>Tier</span>
                <span className={styles.asideVal}>{BADGE_LABELS[p.badge]}</span>
              </div>
              <button type="button" className={styles.asideCopy} onClick={handleCopy}>
                {isCopyLocked ? 'Sign in to copy' : 'Copy Prompt'}
              </button>
              <button type="button" className={styles.asideShare} onClick={handleShare}>
                Share
              </button>
            </div>

            {related.length > 0 && (
              <div className={styles.asideCard}>
                <h3 className={styles.asideTitle}>More like this</h3>
                <ul className={styles.relatedList}>
                  {related.map((r) => (
                    <li key={r.id}>
                      <Link href={`/prompt/${r.id}`} className={styles.related}>
                        <span
                          className={styles.relatedSwatch}
                          style={{ background: `linear-gradient(135deg, ${r.colorA}, ${r.accentB})` }}
                        />
                        <span className={styles.relatedInfo}>
                          <span className={styles.relatedTitle}>{r.title}</span>
                          <span className={styles.relatedTool}>{r.tool}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      <Toast visible={toastVisible} message={toastMessage} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
