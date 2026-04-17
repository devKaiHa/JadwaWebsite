"use client";

import Link from "next/link";

export default function ComingSoonPage() {
  return (
    <section className="coming-soon-page">
      <div className="coming-soon-bg-shape coming-soon-bg-shape-one" />
      <div className="coming-soon-bg-shape coming-soon-bg-shape-two" />

      <div className="auto-container">
        <div className="coming-soon-wrap">
          <div className="coming-soon-badge">
            <span className="coming-soon-badge-dot" />
            <span>Launching Soon</span>
          </div>

          <h1 className="coming-soon-title">
            A New Digital Experience Is On The Way
          </h1>

          <p className="coming-soon-text">
            We are preparing a refined experience that reflects our standards,
            values, and long-term vision. This page will be available soon with
            more details, insights, and updates.
          </p>

          <div className="coming-soon-actions">
            <Link href="/" className="coming-soon-btn coming-soon-btn-primary">
              Back to Home
            </Link>

            <a
              href="/Contact-us"
              className="coming-soon-btn coming-soon-btn-secondary"
            >
              Contact Us
            </a>
          </div>

          <div className="coming-soon-meta">
            <div className="coming-soon-meta-card">
              <span className="coming-soon-meta-label">Status</span>
              <strong className="coming-soon-meta-value">In Preparation</strong>
            </div>

            <div className="coming-soon-meta-card">
              <span className="coming-soon-meta-label">Experience</span>
              <strong className="coming-soon-meta-value">
                Corporate & Premium
              </strong>
            </div>

            <div className="coming-soon-meta-card">
              <span className="coming-soon-meta-label">Availability</span>
              <strong className="coming-soon-meta-value">Coming Soon</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
