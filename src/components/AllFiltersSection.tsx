'use client';

import { useState } from 'react';
import { prompts, categories } from '@/data/prompts';
import { useGuestCopyLimit } from '@/hooks/useGuestCopyLimit';
import LoginModal from './LoginModal';
import PromptCard from './PromptCard';
import Toast from './Toast';
import styles from './AllFiltersSection.module.css';

export default function AllFiltersSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('Prompt Copied!');
  const [loginOpen, setLoginOpen] = useState(false);
  const { copiesRemaining, isCopyLocked, tryCopy } = useGuestCopyLimit();

  const showToast = (_text: string, message = 'Prompt Copied!') => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2200);
  };

  const handleCopy = (text: string) => {
    tryCopy(text, showToast, () => setLoginOpen(true));
  };

  const notify = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2200);
  };

  const filteredAll =
    activeFilter === 'All' ? prompts : prompts.filter((p) => p.category === activeFilter);

  return (
    <>
      <section className={styles.section}>
        <div className="section-label">{'// All Filters'}</div>
        <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
          Complete Library
        </h2>
        <p className="section-sub" style={{ marginBottom: '2rem' }}>
          Filter by tool, style, or effect. Find exactly what you need.
        </p>

        <div className={styles.filterRow}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`${styles.filterBtn} ${activeFilter === cat ? styles.filterActive : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.cardsGrid}>
          {filteredAll.map((p) => (
            <PromptCard
              key={p.id}
              prompt={p}
              copiesRemaining={copiesRemaining}
              isCopyLocked={isCopyLocked}
              onCopy={handleCopy}
              onRequireLogin={() => setLoginOpen(true)}
              onLinkCopied={() => notify('Link copied!')}
            />
          ))}
        </div>
      </section>

      <Toast visible={toastVisible} message={toastMessage} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
