'use client';

import type { MouseEvent } from 'react';
import { useState } from 'react';
import { Prompt, BADGE_LABELS } from '@/data/prompts';
import PremiumModal from './PremiumModal';
import styles from './PromptCard.module.css';

interface Props {
  prompt: Prompt;
  copiesRemaining: number;
  isCopyLocked: boolean;
  onCopy: (text: string) => void;
  onRequireLogin?: () => void;
  onLinkCopied?: () => void;
}

const LIKES = ['2.4k', '1.8k', '956', '3.1k', '427', '2k', '1.2k', '640', '890'];
const COMMENTS = ['186', '94', '2k', '52', '310', '88', '145', '402', '67'];

const META_LABEL: Record<Prompt['badge'], string> = {
  trending: '🔥 Hot',
  popular: '⭐ Popular',
  'editors-pick': "✦ Editor's Pick",
  premium: '👑 Premium',
};

function getEngagement(id: number) {
  const i = (id - 1) % LIKES.length;
  return { likes: LIKES[i], comments: COMMENTS[i] };
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="3.5" y="7" width="9" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CrownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 18h16l-1.2-8.5L12 11 5.2 9.5 4 18z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M4 18v2h16v-2M7 9.5 9.5 4l2.5 5 2.5-5L17 9.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

async function sharePrompt(p: Prompt, onLinkCopied?: () => void) {
  const url = `${window.location.origin}/?prompt=${p.id}`;
  const shareData = {
    title: p.title,
    text: `Check out "${p.title}" on PromptForYou`,
    url,
  };

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
    onLinkCopied?.();
  } catch {
    /* clipboard unavailable */
  }
}

export default function PromptCard({
  prompt: p,
  copiesRemaining,
  isCopyLocked,
  onCopy,
  onRequireLogin,
  onLinkCopied,
}: Props) {
  const [premiumOpen, setPremiumOpen] = useState(false);
  const isPremium = p.badge === 'premium';
  const { likes, comments } = getEngagement(p.id);

  const stopPropagation = (e: MouseEvent) => e.stopPropagation();

  const openPremium = () => setPremiumOpen(true);

  const handleCopyClick = () => {
    if (isPremium) {
      openPremium();
      return;
    }
    if (isCopyLocked) {
      onRequireLogin?.();
      return;
    }
    onCopy(p.prompt);
  };

  const handleViewClick = () => {
    if (isPremium) {
      openPremium();
      return;
    }
    if (isCopyLocked) {
      onRequireLogin?.();
      return;
    }
    // Detail page navigation will be wired here
  };

  const handleCardClick = () => {
    if (isPremium) openPremium();
  };

  return (
    <>
      <div
        className={`${styles.card} ${isPremium ? styles.cardPremium : ''}`}
        onClick={isPremium ? handleCardClick : undefined}
        role={isPremium ? 'button' : undefined}
        tabIndex={isPremium ? 0 : undefined}
        onKeyDown={
          isPremium
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openPremium();
                }
              }
            : undefined
        }
      >
        <div className={`${styles.badgeTag} ${styles[`badge_${p.badge}`]}`}>
          {BADGE_LABELS[p.badge]}
        </div>

        <div className={styles.cardImg}>
          <div className={styles.beforeAfter}>
            <div className={styles.before} style={{ background: p.colorA }}>
              <span
                className={styles.baLabel}
                style={{ left: 8, color: p.accentA, borderColor: p.accentA + '44' }}
              >
                Before
              </span>
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="22" r="10" fill={p.accentA} opacity="0.15" />
                <rect x="10" y="36" width="40" height="14" rx="4" fill={p.accentA} opacity="0.1" />
                <circle cx="30" cy="22" r="6" fill={p.accentA} opacity="0.3" />
              </svg>
            </div>

            <div className={styles.divider} />

            <div className={styles.after} style={{ background: p.colorB }}>
              <span
                className={styles.baLabel}
                style={{ right: 8, color: p.accentB, borderColor: p.accentB + '44' }}
              >
                After
              </span>
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="22" r="10" fill={p.accentB} opacity="0.25" />
                <rect x="10" y="36" width="40" height="14" rx="4" fill={p.accentB} opacity="0.2" />
                <circle cx="30" cy="22" r="6" fill={p.accentB} opacity="0.5" />
                <circle cx="30" cy="22" r="3" fill={p.accentB} opacity="0.9" />
              </svg>
            </div>
          </div>

          <div className={`${styles.overlay} ${isPremium ? styles.overlayPremium : ''}`}>
            {isPremium ? (
              <button
                type="button"
                className={styles.premiumHover}
                onClick={(e) => {
                  stopPropagation(e);
                  openPremium();
                }}
              >
                <CrownIcon className={styles.premiumIcon} />
                <span className={styles.premiumLabel}>Premium</span>
                <span className={styles.premiumHint}>Subscribe to unlock</span>
              </button>
            ) : (
              <>
                <div className={styles.overlayTag}>{p.category}</div>
                <div className={styles.overlayPrompt}>{p.prompt}</div>
                <div className={styles.overlayActions}>
                  {isCopyLocked ? (
                    <button
                      type="button"
                      className={styles.copyLockedBtn}
                      onClick={handleCopyClick}
                      aria-label="Sign in to copy more prompts"
                    >
                      <LockIcon className={styles.lockIcon} />
                      Copy Prompt
                    </button>
                  ) : (
                    <button type="button" className={styles.copyBtn} onClick={handleCopyClick}>
                      Copy Prompt
                      <span className={styles.copyCount}>{copiesRemaining}</span>
                    </button>
                  )}
                  {isCopyLocked ? (
                    <button
                      type="button"
                      className={styles.viewLockedBtn}
                      onClick={handleViewClick}
                      aria-label="Sign in to view prompt details"
                    >
                      <LockIcon className={styles.lockIcon} />
                      View
                    </button>
                  ) : (
                    <button type="button" className={styles.viewBtn} onClick={handleViewClick}>
                      View
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles.cardInfo}>
          <div className={styles.cardTitle}>{p.title}</div>
          <div className={styles.cardMeta}>
            <span className={styles.cardTool}>{p.tool}</span>
            <span className={`${styles.cardFire} ${isPremium ? styles.cardFirePremium : ''}`}>
              {META_LABEL[p.badge]}
            </span>
          </div>
          <div className={styles.engagement}>
            <div className={styles.engagementLeft}>
              <button
                type="button"
                className={`${styles.engagementBtn} ${styles.engagementBtnLike}`}
                aria-label={`Like ${p.title}`}
                onClick={(e) => {
                  stopPropagation(e);
                  onRequireLogin?.();
                }}
              >
                <svg className={styles.heartIcon} viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    className={styles.heartOutline}
                    d="M8 13.5s-4.5-2.9-4.5-6a2.8 2.8 0 0 1 5-1.7A2.8 2.8 0 0 1 12.5 7.5c0 3.1-4.5 6-4.5 6z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  <path
                    className={styles.heartFill}
                    d="M8 13.5s-4.5-2.9-4.5-6a2.8 2.8 0 0 1 5-1.7A2.8 2.8 0 0 1 12.5 7.5c0 3.1-4.5 6-4.5 6z"
                    fill="currentColor"
                  />
                </svg>
                {likes}
              </button>
              <span className={`${styles.engagementBtn} ${styles.engagementBtnComment}`}>
                <svg className={styles.engagementIcon} viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M2.5 3.5h11v7.5H9.2L8 13l-1.2-2H2.5V3.5z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                </svg>
                {comments}
              </span>
              <button
                type="button"
                className={`${styles.engagementBtn} ${styles.engagementBtnShare}`}
                aria-label={`Share ${p.title}`}
                onClick={(e) => {
                  stopPropagation(e);
                  void sharePrompt(p, onLinkCopied);
                }}
              >
                <svg className={styles.engagementIcon} viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M11 2.5 5 7.5l6 5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 2.5h6v6"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Share
              </button>
            </div>
            <button
              type="button"
              className={`${styles.engagementBtn} ${styles.engagementBtnBookmark}`}
              aria-label={`Save ${p.title}`}
              onClick={(e) => {
                stopPropagation(e);
                onRequireLogin?.();
              }}
            >
              <svg className={styles.engagementIcon} viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M4 2.5h8v11L8 11 4 13.5V2.5z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
              Save
            </button>
          </div>
        </div>
      </div>

      <PremiumModal open={premiumOpen} onClose={() => setPremiumOpen(false)} />
    </>
  );
}
