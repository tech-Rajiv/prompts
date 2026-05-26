'use client';

import { useState } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.inner}>
        <div className="section-label">// Contact</div>
        <h2 className="section-title">Got a prompt to share?</h2>
        <p className={styles.sub}>
          Submit your best AI image prompts and we&apos;ll add them to the library.
          Or just say hi — we&apos;re building in public.
        </p>

        <div className={styles.form}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Name</label>
              <input type="text" placeholder="Your name" />
            </div>
            <div className={styles.field}>
              <label>Email</label>
              <input type="email" placeholder="you@email.com" />
            </div>
          </div>
          <div className={styles.field}>
            <label>Your Prompt</label>
            <textarea placeholder="Paste your prompt here..." />
          </div>
          <button className={styles.submitBtn} onClick={handleSubmit}>
            {submitted ? '✓ Submitted!' : 'Submit Prompt →'}
          </button>
        </div>
      </div>
    </section>
  );
}
