"use client";

import { useState } from "react";
import styles from "./SubscriptionSection.module.css";

type PlanId = "monthly" | "yearly";

interface Plan {
  id: PlanId;
  name: string;
  price: string;
  period: string;
  blurb: string;
  badge?: string;
  highlight?: boolean;
  features: string[];
  cta: string;
}

const PLANS: Plan[] = [
  {
    id: "monthly",
    name: "Monthly",
    price: "$3",
    period: "/month",
    blurb: "Flexible access. Cancel anytime.",
    features: [
      "Unlimited prompt copies",
      "Full premium prompt library",
      "Save & organise favourites",
      "New prompts every day",
    ],
    cta: "Choose Monthly",
  },
  {
    id: "yearly",
    name: "Yearly",
    price: "$10",
    period: "/year",
    blurb: "Best value — under $1 a month.",
    badge: "Save 72%",
    highlight: true,
    features: [
      "Everything in Monthly",
      "Unlimited prompt copies",
      "Full premium prompt library",
      "Priority access to new drops",
      "Early access to upcoming features",
    ],
    cta: "Choose Yearly",
  },
];

export default function SubscriptionSection() {
  const [selected, setSelected] = useState<PlanId>("yearly");

  return (
    <main className={styles.main}>
      {/* decorative layers */}
      <div className={styles.gridBg} />
      <div className={styles.glowA} />
      <div className={styles.glowB} />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.crown} aria-hidden>
            👑
          </div>
          <div className={styles.sectionLabel}>{"// Premium Subscription"}</div>
          <h1 className={styles.heading}>
            Unlock the <span className={styles.accent}>full library.</span>
          </h1>
          <p className={styles.sub}>
            Copy unlimited prompts, open every premium pack, and get new drops
            the moment they go live. One simple plan — no gatekeeping.
          </p>
        </div>

        <div className={styles.plans}>
          {PLANS.map((plan) => {
            const isActive = selected === plan.id;
            return (
              <div
                key={plan.id}
                className={`${styles.card} ${plan.highlight ? styles.cardHighlight : ""} ${
                  isActive ? styles.cardActive : ""
                }`}
              >
                {plan.badge && (
                  <span className={styles.cardBadge}>{plan.badge}</span>
                )}

                <div className={styles.cardName}>{plan.name}</div>

                <div className={styles.priceRow}>
                  <span className={styles.price}>{plan.price}</span>
                  <span className={styles.period}>{plan.period}</span>
                </div>

                <p className={styles.blurb}>{plan.blurb}</p>

                <ul className={styles.features}>
                  {plan.features.map((f) => (
                    <li key={f} className={styles.feature}>
                      <span className={styles.check} aria-hidden>
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`${styles.cta} ${
                    plan.highlight ? styles.ctaPrimary : styles.ctaSecondary
                  }`}
                  onClick={() => setSelected(plan.id)}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        <p className={styles.footnote}>
          Secure checkout coming soon · Cancel anytime · Prices in USD
        </p>
      </section>
    </main>
  );
}
