"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { signOut } from "next-auth/react";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scrollLock";
import styles from "./LogoutModal.module.css";

interface Props {
  open: boolean;
  onClose: () => void;
  email?: string | null;
}

export default function LogoutModal({ open, onClose, email }: Props) {
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    lockBodyScroll();
    window.addEventListener("keydown", onKey);

    return () => {
      unlockBodyScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const handleLogout = () => {
    setSubmitting(true);
    void signOut({ callbackUrl: "/" });
  };

  if (!open || !mounted) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className={styles.label}>{"// Sign Out"}</div>
        <h2 id="logout-modal-title" className={styles.title}>
          Leaving so soon?
        </h2>
        <p className={styles.sub}>
          {email ? (
            <>
              You&apos;re signed in as <strong className={styles.email}>{email}</strong>. You&apos;ll
              need to log back in to copy prompts and access your library.
            </>
          ) : (
            <>You&apos;ll need to log back in to copy prompts and access your library.</>
          )}
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.confirmBtn}
            onClick={handleLogout}
            disabled={submitting}
          >
            {submitting ? "Logging out..." : "Log Out →"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
