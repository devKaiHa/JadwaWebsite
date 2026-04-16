"use client";

import { useTranslation } from "react-i18next";

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function TestimonialsShowcase({ testimonials = [] }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const isRtl = lang === "ar";

  if (!testimonials?.length) return null;

  const featured = testimonials[0];
  const topCards = testimonials.slice(1, 3);

  return (
    <section
      className={`jadwa-testimonials  sec-pad ${isRtl ? "rtl" : "ltr"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="auto-container">
        <div className="jadwa-testimonials-panel">
          <div className="jadwa-testimonials-head">
            <div className="jadwa-pill">
              <span className="jadwa-pill-dot" />
              <span>
                {lang === "ar"
                  ? "الشهادات"
                  : lang === "tr"
                  ? "Yorumlar"
                  : "Partners"}
              </span>
            </div>

            <h2 className="jadwa-testimonials-title">
              {lang === "ar"
                ? "موثوق به من الفرق الطموحة"
                : lang === "tr"
                ? "Hırslı ekipler tarafından güveniliyor"
                : "Trusted by ambitious teams"}
            </h2>

            <p className="jadwa-testimonials-subtitle">
              {lang === "ar"
                ? "يستخدمه مؤسسون يهتمون بالسرعة والوضوح وثقة المستثمرين"
                : lang === "tr"
                ? "Hız, netlik ve yatırımcı güvenine önem veren ekipler tarafından kullanılır"
                : "Used by founders who care about speed, clarity, and investor confidence"}
            </p>
          </div>

          <div className="jadwa-layout">
            <div className="jadwa-left">
              {featured && (
                <article className="jadwa-featured-card">
                  <div className="jadwa-quote-light">"</div>

                  <p className="jadwa-featured-text">
                    {featured?.content?.[lang] || featured?.content?.en || ""}
                  </p>

                  <div className="jadwa-stars">
                    {Array.from({
                      length: Math.max(
                        1,
                        Math.min(Number(featured?.rating || 5), 5)
                      ),
                    }).map((_, i) => (
                      <i key={i} className="fa-solid fa-star" />
                    ))}
                  </div>

                  <div className="jadwa-user">
                    <div className="jadwa-avatar jadwa-avatar-dark">
                      {getInitials(featured?.name || "Client")}
                    </div>

                    <div className="jadwa-user-meta">
                      <h4>{featured?.name || "Client"}</h4>
                      <p>
                        {featured?.role?.[lang] || featured?.role?.en || ""}
                      </p>
                    </div>
                  </div>
                </article>
              )}
            </div>

            <div className="jadwa-right">
              <div className="jadwa-top-cards">
                {topCards.map((item, index) => (
                  <article
                    className="jadwa-small-card"
                    key={item?._id || index}
                  >
                    <div className="jadwa-quote-dark">"</div>

                    <p className="jadwa-small-text">
                      {item?.content?.[lang] || item?.content?.en || ""}
                    </p>

                    <div className="jadwa-user jadwa-user-small">
                      <div className="jadwa-avatar jadwa-avatar-light">
                        {getInitials(item?.name || "Client")}
                      </div>

                      <div className="jadwa-user-meta">
                        <h4>{item?.name || "Client"}</h4>
                        <p>{item?.role?.[lang] || item?.role?.en || ""}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="jadwa-stats-card">
                <div className="jadwa-stat">
                  <h3>120+</h3>
                  <p>
                    {lang === "ar"
                      ? "شريك موثوق"
                      : lang === "tr"
                      ? "Güvenilir ortak"
                      : "SaaS Founders Helped"}
                  </p>
                </div>

                <div className="jadwa-stat">
                  <h3>18M+</h3>
                  <p>
                    {lang === "ar"
                      ? "قيمة مستهدفة"
                      : lang === "tr"
                      ? "Hedeflenen değer"
                      : "Tons CO₂ tracked"}
                  </p>
                </div>

                <div className="jadwa-stat">
                  <h3>95%</h3>
                  <p>
                    {lang === "ar"
                      ? "كفاءة أعلى"
                      : lang === "tr"
                      ? "Daha hızlı iş akışı"
                      : "Faster ESG workflows"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
