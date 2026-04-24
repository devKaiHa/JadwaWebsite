import NewsSlider from "@/components/slider/NewsSlider";
import { useTranslation } from "react-i18next";

export default function News({ news }) {
  const { t } = useTranslation();

  return (
    <>
      <section className="news-style-two sec-pad">
        <div className="auto-container">
          <div className="jadwa-testimonials-head jadwa-blog-head">
            <div className="jadwa-pill">
              <span className="jadwa-pill-dot" />
              <span>{t("homeNews.kicker")}</span>
            </div>

            <h2 className="jadwa-testimonials-title">{t("homeNews.title")}</h2>

            <p className="jadwa-testimonials-subtitle">
              {t("homeNews.description")}
            </p>
          </div>
          <NewsSlider news={news} />
        </div>
      </section>
    </>
  );
}
