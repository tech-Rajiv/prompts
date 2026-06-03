'use client';

import { useState } from 'react';
import {
  prompts,
  filterCategories,
  sortPrompts,
  type PromptBadge,
  type SortOption,
} from '@/data/prompts';
import { useGuestCopyLimit } from '@/hooks/useGuestCopyLimit';
import LoginModal from './LoginModal';
import PromptCard from './PromptCard';
import SortDropdown from './SortDropdown';
import Toast from './Toast';
import styles from './AllFiltersSection.module.css';

const FILTER_THEME: Record<string, string> = {
  All: 'all',
  Trending: 'trending',
  Popular: 'popular',
  "Editor's Pick": 'editors',
  Premium: 'premium',
};

export default function AllFiltersSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('Prompt Copied!');
  const [loginOpen, setLoginOpen] = useState(false);
  const { copiesRemaining, isCopyLocked, unlimited, tryCopy } = useGuestCopyLimit();

  // Signed-in users never need the login prompt (copy, like, save, etc.).
  const requireLogin = () => {
    if (!unlimited) setLoginOpen(true);
  };

  const showToast = (_text: string, message = 'Prompt Copied!') => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2200);
  };

  const handleCopy = (text: string) => {
    tryCopy(text, showToast, requireLogin);
  };

  const notify = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2200);
  };

  const badgeForFilter = (label: string): PromptBadge | null => {
    if (label === 'Trending') return 'trending';
    if (label === 'Popular') return 'popular';
    if (label === "Editor's Pick") return 'editors-pick';
    if (label === 'Premium') return 'premium';
    return null;
  };

  const isSavedView = activeFilter === 'Saved';

  const filteredAll = sortPrompts(
    isSavedView
      ? []
      : activeFilter === 'All'
        ? prompts
        : prompts.filter((p) => p.badge === badgeForFilter(activeFilter)),
    sortBy,
  );

  return (
    <>
      <section className={styles.section}>
        <div className="section-label">{'// All Filters'}</div>
        <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
          Complete Library
        </h2>
        <p className="section-sub" style={{ marginBottom: '2rem' }}>
          Browse by badge — trending, popular, editor picks, and premium prompts.
        </p>

        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            {filterCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                data-theme={FILTER_THEME[cat]}
                onClick={() => setActiveFilter(cat)}
                className={`${styles.filterBtn} ${activeFilter === cat ? styles.filterActive : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className={styles.filterActions}>
            <SortDropdown value={sortBy} onChange={setSortBy} />
            <button
              type="button"
              data-theme="saved"
              onClick={() => setActiveFilter('Saved')}
              className={`${styles.filterBtn} ${activeFilter === 'Saved' ? styles.filterActive : ''}`}
            >
              Saved
            </button>
          </div>
        </div>

        {isSavedView ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>No saved prompts yet</p>
            <p className={styles.emptySub}>
              Save prompts from any card to find them here. Your saved library will appear once
              you&apos;re signed in.
            </p>
          </div>
        ) : (
          <div className={styles.cardsGrid}>
            {filteredAll.map((p) => (
              <PromptCard
                key={p.id}
                prompt={p}
                copiesRemaining={copiesRemaining}
                isCopyLocked={isCopyLocked}
                unlimited={unlimited}
                onCopy={handleCopy}
                onRequireLogin={requireLogin}
                onLinkCopied={() => notify('Link copied!')}
              />
            ))}
          </div>
        )}
      </section>

      <Toast visible={toastVisible} message={toastMessage} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
