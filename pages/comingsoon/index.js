"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function ComingSoonPage() {
  const { t } = useTranslation();
  return (
    <section className="coming-soon-page">
      <div className="coming-soon-bg-shape coming-soon-bg-shape-one" />
      <div className="coming-soon-bg-shape coming-soon-bg-shape-two" />

      <div className="auto-container">
        <div className="coming-soon-wrap">
          <div className="coming-soon-badge">
            <span className="coming-soon-badge-dot" />
            <span>{t("comingSoon.launchingSoon")}</span>
          </div>

          <h1 className="coming-soon-title">{t("comingSoon.title")}</h1>

          <p className="coming-soon-text">{t("comingSoon.text")}</p>

          <div className="coming-soon-actions">
            <Link href="/" className="coming-soon-btn coming-soon-btn-primary">
              {t("comingSoon.backHome")}
            </Link>

            <a
              href="/Contact-us"
              className="coming-soon-btn coming-soon-btn-secondary"
            >
              {t("contact.formTitle")}
            </a>
          </div>

          <div className="coming-soon-meta">
            <div className="coming-soon-meta-card">
              <span className="coming-soon-meta-label">
                {t("comingSoon.status")}
              </span>
              <strong className="coming-soon-meta-value">
                {t("comingSoon.preparation")}
              </strong>
            </div>

            <div className="coming-soon-meta-card">
              <span className="coming-soon-meta-label">
                {t("comingSoon.experience")}
              </span>
              <strong className="coming-soon-meta-value">
                {t("comingSoon.corporatePremium")}
              </strong>
            </div>

            <div className="coming-soon-meta-card">
              <span className="coming-soon-meta-label">
                {t("comingSoon.availability")}
              </span>
              <strong className="coming-soon-meta-value">
                {t("comingSoon.soon")}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
