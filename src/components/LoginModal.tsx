"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { signIn } from "next-auth/react";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scrollLock";
import Signup from "./Signup";
import styles from "./LoginModal.module.css";

type AuthView = "login" | "signup";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<AuthView>("login");
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    if (!open) {
      setView("login");
      setShowPass(false);
    }
  }, [open]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget as HTMLFormElement);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    setSubmitting(true);
    setError(null);

    void (async () => {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      setSubmitting(false);
      if (res?.error) {
        setError("Invalid email or password");
        return;
      }
      onClose();
    })();
  };

  if (!open || !mounted) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={
          view === "login" ? "login-modal-title" : "signup-modal-title"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label={view === "login" ? "Close login" : "Close sign up"}
        >
          ×
        </button>

        {view === "signup" ? (
          <Signup embedded onSignIn={() => setView("login")} />
        ) : (
          <>
            <div className={styles.label}>{"// Sign In"}</div>
            <h2 id="login-modal-title" className={styles.title}>
              Welcome back
            </h2>
            <p className={styles.sub}>
              Log in to copy unlimited prompts, save favorites, and track your
              library.
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className={styles.field}>
                <div className={styles.fieldHeader}>
                  <label htmlFor="login-password">Password</label>
                  <button type="button" className={styles.forgotBtn}>
                    Forgot password?
                  </button>
                </div>
                <div className={styles.inputWrap}>
                  <input
                    id="login-password"
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShowPass((v) => !v)}
                    aria-label={showPass ? "Hide password" : "Show password"}
                  >
                    {showPass ? "○" : "●"}
                  </button>
                </div>
              </div>

              {error && (
                <p
                  style={{
                    color: "#ff4ecd",
                    fontSize: "0.75rem",
                    marginTop: "0.25rem",
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={submitting}
              >
                {submitting ? "Logging in..." : "Log In →"}
              </button>
            </form>

            <div className={styles.divider}>
              <span>or continue with</span>
            </div>

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
                  aria-hidden
                  className={styles.socialIcon}
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

            <p className={styles.authSwitch}>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                className={styles.authSwitchBtn}
                onClick={() => setView("signup")}
              >
                Sign up →
              </button>
            </p>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
