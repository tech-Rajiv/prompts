"use client";

import Link from "next/link";
import { prompts } from "@/data/prompts";
import { useState } from "react";
import LoginModal from "./LoginModal";
import PromptCard from "./PromptCard";
import Toast from "./Toast";
import styles from "./TrendingSection.module.css";

export default function TrendingSection() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("Prompt Copied!");
  const [loginOpen, setLoginOpen] = useState(false);

  const showToast = (text: string, message = "Prompt Copied!") => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2200);
  };

  const notify = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2200);
  };

  const trendingPrompts = prompts.filter((p) => p.trending);

  return (
    <>
      <section className={styles.trending} id="trending">
        <div className={styles.trendingHeader}>
          <div>
            <div className="section-label">{"// Trending Now"}</div>
            <h2 className="section-title">Hot Prompts This Week</h2>
            <p className="section-sub">
              Hover any card to reveal the full prompt. One click to copy.
            </p>
          </div>
        </div>

        <div className={styles.cardsGrid}>
          {trendingPrompts.map((p) => (
            <PromptCard
              key={p.id}
              prompt={p}
              onCopy={showToast}
              onRequireLogin={() => setLoginOpen(true)}
              onLinkCopied={() => notify("Link copied!")}
            />
          ))}
        </div>
        <div className={styles.libraryCta}>
          {/* <span className={styles.libraryCtaLabel}>// Full Library</span> */}
          <Link href="/all-filters" className={styles.getAllBtn}>
            View All Prompts →
          </Link>
          <p className={styles.libraryCtaText}>
            500+ filters, effects, and edits — browse everything in one place.
          </p>
        </div>
      </section>

      <Toast visible={toastVisible} message={toastMessage} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
