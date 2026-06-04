'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { lockBodyScroll, unlockBodyScroll } from '@/lib/scrollLock';
import styles from './PremiumModal.module.css';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function PremiumModal({ open, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const goToSubscription = () => {
    onClose();
    router.push('/subscription');
  };

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    lockBodyScroll();
    window.addEventListener('keydown', onKey);

    return () => {
      unlockBodyScroll();
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="premium-modal-title"
        aria-modal="true"
      >
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className={styles.crown} aria-hidden>
          👑
        </div>
        <h2 id="premium-modal-title" className={styles.title}>
          Premium Prompt
        </h2>
        <p className={styles.sub}>
          Subscribe to unlock this prompt and the full premium library. Plans start at just
          $3/month.
        </p>
        <button type="button" className={styles.cta} onClick={goToSubscription}>
          View Plans →
        </button>
      </div>
    </div>,
    document.body,
  );
}
