"use client";

import { useState } from "react";
import styles from "./ProfileEditor.module.css";

interface ProfileFields {
  name: string;
  username: string;
  phone: string;
  image: string;
  bio: string;
}

interface Props {
  email: string;
  initial: ProfileFields;
}

export default function ProfileEditor({ email, initial }: Props) {
  const [form, setForm] = useState<ProfileFields>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const update = (key: keyof ProfileFields, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSaved(false);

    void (async () => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });

      setSubmitting(false);

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? "Could not save your profile");
        return;
      }

      setSaved(true);
    })();
  };

  const initials = (form.name || email).trim().charAt(0).toUpperCase() || "?";

  return (
    <main className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.label}>{"// Your Profile"}</div>
        <h1 className={styles.title}>Edit profile</h1>
        <p className={styles.sub}>
          Signed in as <strong className={styles.email}>{email}</strong>
        </p>

        <div className={styles.avatarRow}>
          {form.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className={styles.avatar} src={form.image} alt="Avatar preview" />
          ) : (
            <div className={styles.avatarFallback}>{initials}</div>
          )}
          <div className={styles.avatarHint}>
            Paste an image URL below to set your avatar.
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="p-name">Full name</label>
            <input
              id="p-name"
              type="text"
              value={form.name}
              placeholder="Your name"
              onChange={(e) => update("name", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="p-username">Username</label>
            <input
              id="p-username"
              type="text"
              value={form.username}
              placeholder="username"
              onChange={(e) => update("username", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="p-phone">Phone</label>
            <input
              id="p-phone"
              type="tel"
              value={form.phone}
              placeholder="+1 555 000 0000"
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="p-image">Avatar URL</label>
            <input
              id="p-image"
              type="url"
              value={form.image}
              placeholder="https://..."
              onChange={(e) => update("image", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="p-bio">Bio</label>
            <textarea
              id="p-bio"
              rows={3}
              value={form.bio}
              placeholder="A short bio"
              onChange={(e) => update("bio", e.target.value)}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}
          {saved && <p className={styles.success}>Profile saved ✓</p>}

          <button type="submit" className={styles.submitBtn} disabled={submitting}>
            {submitting ? "Saving..." : "Save Changes →"}
          </button>
        </form>
      </div>
    </main>
  );
}
