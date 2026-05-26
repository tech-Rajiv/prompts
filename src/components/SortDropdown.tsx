'use client';

import { useEffect, useRef, useState } from 'react';
import { sortOptions, type SortOption } from '@/data/prompts';
import styles from './SortDropdown.module.css';

interface Props {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

function SortIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M2 4.5h12M4.5 8h7M7 11.5h4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 10 6" fill="none" aria-hidden>
      <path
        d="M1 1l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SortDropdown({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selectedLabel = sortOptions.find((o) => o.value === value)?.label ?? 'Recently Added';

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={`${styles.trigger} ${open ? styles.triggerOpen : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Sort: ${selectedLabel}`}
        title={selectedLabel}
      >
        <SortIcon className={styles.sortIcon} />
        <ChevronIcon className={`${styles.chevron} ${open ? styles.chevronUp : ''}`} />
      </button>

      {open && (
        <ul className={styles.menu} role="listbox" aria-label="Sort options">
          {sortOptions.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <li key={opt.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`${styles.option} ${isSelected ? styles.optionSelected : ''}`}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                >
                  <span className={styles.optionLabel}>{opt.label}</span>
                  {isSelected && (
                    <svg className={styles.check} viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path
                        d="M2 6l3 3 5-6"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
