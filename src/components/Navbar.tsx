"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import styles from "./Navbar.module.css";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scrollLock";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isAllFilters = pathname === "/all-filters";
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileNavOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileNavOpen(false);
    };

    lockBodyScroll();
    window.addEventListener("keydown", onKey);

    return () => {
      unlockBodyScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    // Close drawer on route change (e.g. after Link navigation)
    setMobileNavOpen(false);
  }, [pathname]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollNav = (id: string) => {
    setMobileNavOpen(false);
    scrollTo(id);
  };

  return (
    <>
    <nav data-fixed-nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div
        className={styles.logo}
        onClick={() => {
          setMobileNavOpen(false);
          router.push("/");
        }}
      >
        Prompt<span>ForYou</span>
      </div>

      <ul className={styles.navLinks}>
        <li>
          <Link
            href="/all-filters"
            className={`${styles.navLink} ${isAllFilters ? styles.navLinkActive : ""}`}
            aria-current={isAllFilters ? "page" : undefined}
          >
            All Filters
          </Link>
        </li>
        <li className={styles.ytNavItem}>
          <button
            onClick={() => scrollTo("youtube")}
            className={`${styles.navLink} ${styles.ytNavLink}`}
          >
            ▶ YT Thumbnails
            <span className={styles.newBadge}>NEW</span>
          </button>
        </li>
        <li>
          <button onClick={() => scrollTo("about")} className={styles.navLink}>
            About
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollTo("contact")}
            className={styles.navLink}
          >
            Contact
          </button>
        </li>
      </ul>

      <div className={styles.navRight}>
        <button
          type="button"
          className={styles.mobileToggle}
          aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen((v) => !v)}
        >
          <span className={styles.mobileToggleBar} />
          <span className={styles.mobileToggleBar} />
          <span className={styles.mobileToggleBar} />
        </button>

        <button
          type="button"
          className={styles.navCta}
          onClick={() => {
            setMobileNavOpen(false);
            setLoginOpen(true);
          }}
        >
          Login
        </button>
      </div>

    </nav>

    {mobileNavOpen && (
      <div
        className={styles.mobileOverlay}
        onClick={() => setMobileNavOpen(false)}
        role="presentation"
      >
        <div
          className={styles.mobileDrawer}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.mobileDrawerHeader}>
            <div className={styles.mobileDrawerBrand} aria-label="PromptForYou">
              Prompt<span>ForYou</span>
            </div>
            <button
              type="button"
              className={styles.mobileDrawerClose}
              onClick={() => setMobileNavOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <ul className={styles.mobileNavLinks}>
            <li>
              <Link
                href="/all-filters"
                className={`${styles.mobileNavLink} ${isAllFilters ? styles.mobileNavLinkActive : ""}`}
                aria-current={isAllFilters ? "page" : undefined}
              >
                All Filters
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleScrollNav("youtube")}
                className={`${styles.mobileNavLink} ${styles.mobileNavLinkYT}`}
              >
                ▶ YT Thumbnails <span className={styles.newBadge}>NEW</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleScrollNav("about")}
                className={styles.mobileNavLink}
              >
                About
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleScrollNav("contact")}
                className={styles.mobileNavLink}
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      </div>
    )}

    <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
