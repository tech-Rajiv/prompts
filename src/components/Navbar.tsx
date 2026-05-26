"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isAllFilters = pathname === "/all-filters";
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
    <nav data-fixed-nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo} onClick={() => router.push("/")}>
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

      <button
        type="button"
        className={styles.navCta}
        onClick={() => setLoginOpen(true)}
      >
        Login
      </button>

    </nav>

    <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
