"use client";

import { useState } from "react";
import styles from "./Signup.module.css";
import { signIn } from "next-auth/react";

interface SignupProps {
  embedded?: boolean;
  onSignIn?: () => void;
}

export default function Signup({ embedded = false, onSignIn }: SignupProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    if (form.password.length < 8) e.password = "Min 8 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setApiError(null);

    void (async () => {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setApiError(data?.error ?? "Unable to create account");
        setSubmitting(false);
        return;
      }

      const signInRes = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
        callbackUrl: "/",
      });

      setSubmitting(false);
      if (signInRes?.error) {
        setSubmitted(true);
        return;
      }

      setSubmitted(true);
      onSignIn?.();
    })();
  };

  const wrapperClass = embedded ? styles.wrapperEmbedded : styles.wrapper;

  if (submitted) {
    return (
      <div className={wrapperClass}>
        <div className={styles.card}>
          <div className={styles.successIcon}>✓</div>
          <h2 className={styles.successTitle}>You&apos;re in.</h2>
          <p className={styles.successSub}>
            Welcome to PromptForYou. Start exploring trending prompts and build
            something insane.
          </p>
          <button
            className={styles.submitBtn}
            onClick={() => setSubmitted(false)}
          >
            Back to Sign Up
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      {!embedded && (
        <>
          <div className={styles.glowA} />
          <div className={styles.glowB} />
        </>
      )}

      <div className={styles.card}>
        {!embedded && (
          <div className={styles.logo}>
            Prompt<span>ForYou</span>
          </div>
        )}

        <div className={styles.headingBlock}>
          <div className={styles.sectionLabel}>{"// Create Account"}</div>
          <h1
            id={embedded ? "signup-modal-title" : undefined}
            className={embedded ? styles.headingEmbedded : styles.heading}
          >
            Join the <span className={styles.accent}>prompt</span>{" "}
            <span className={styles.accent2}>community.</span>
          </h1>
          <p className={styles.sub}>
            Get access to 500+ trending AI prompts. Updated daily. Free forever.
          </p>
        </div>

        {/* Form */}
        <div className={styles.form}>
          {/* Name */}
          <div className={styles.field}>
            <label className={styles.label}>Name</label>
            <input
              className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && (
              <span className={styles.errorMsg}>{errors.name}</span>
            )}
          </div>

          {/* Email */}
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              type="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && (
              <span className={styles.errorMsg}>{errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <div className={styles.inputWrap}>
              <input
                className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                type={showPass ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                className={styles.eyeBtn}
                onClick={() => setShowPass(!showPass)}
                type="button"
              >
                {showPass ? "○" : "●"}
              </button>
            </div>
            {errors.password && (
              <span className={styles.errorMsg}>{errors.password}</span>
            )}
            {/* strength bar */}
            {form.password && (
              <div className={styles.strengthBar}>
                <div
                  className={styles.strengthFill}
                  style={{
                    width:
                      form.password.length >= 12
                        ? "100%"
                        : form.password.length >= 8
                          ? "60%"
                          : "30%",
                    background:
                      form.password.length >= 12
                        ? "var(--neon)"
                        : form.password.length >= 8
                          ? "var(--neon4)"
                          : "var(--neon3)",
                  }}
                />
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className={styles.field}>
            <label className={styles.label}>Confirm Password</label>
            <input
              className={`${styles.input} ${errors.confirm ? styles.inputError : ""}`}
              type="password"
              placeholder="Repeat password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            />
            {errors.confirm && (
              <span className={styles.errorMsg}>{errors.confirm}</span>
            )}
          </div>

          {/* Submit */}
          {apiError && (
            <div style={{ color: "#ff4ecd", fontSize: "0.75rem", marginTop: "0.75rem" }}>
              {apiError}
            </div>
          )}
          <button className={styles.submitBtn} onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Creating..." : "Create Account →"}
          </button>

          {/* Divider */}
          <div className={styles.divider}>
            <span />
            <p>or continue with</p>
            <span />
          </div>

          {/* Social buttons */}
          <div className={styles.socialRow}>
            <button
              type="button"
              className={styles.socialBtn}
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
          </div>

          {/* Login link */}
          <p className={styles.loginLink}>
            Already have an account?{" "}
            <button
              type="button"
              className={styles.linkBtn}
              onClick={onSignIn}
            >
              Sign in →
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
