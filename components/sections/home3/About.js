"use client";

import AboutUsSlider from "@/components/slider/AboutUsSlider";
import { useTranslation } from "react-i18next";

export default function About({ aboutUs = [] }) {
  const { i18n, t } = useTranslation();
  const lang = i18n?.language || "en";

  // allow array or object
  const item = Array.isArray(aboutUs) ? aboutUs[0] || {} : aboutUs || {};

  // helper: pick current lang, then fall back
  const pick = (obj) =>
    obj && typeof obj === "object"
      ? (obj[lang] ?? obj.en ?? obj.ar ?? obj.tr ?? "")
      : "";

  const content = pick(item?.content);

  const sliderItems = [
    {
      title: item?.message || { en: "Our Mission" },
      content: item?.messageDescription || { en: "" },
      url: "/mission",
    },
    {
      title: item?.vision || { en: "Our Vision" },
      content: item?.visionDescription || { en: "" },
      url: "/vision",
    },
  ];

  const hasAny =
    content || sliderItems.some((s) => pick(s.title) || pick(s.content));

  if (!hasAny) return null;

  return (
    <section className="about-style-three sec-pad">
      <div className="auto-container">
        <div className="row clearfix" dir="ltr" style={{ direction: "ltr" }}>
          <div className="col-lg-7 col-md-12 col-sm-12 image-column">
            <div className="image-box">
              <div
                className="image-shape"
                style={{
                  backgroundImage: "url(/assets/images/shape/shape-24.png)",
                }}
              />
              <figure className="image image-1">
                <img src="/assets/images/about-2.jpg" alt="about" />
              </figure>
              <figure className="image image-2">
                <img src="/assets/images/about-1.jpg" alt="about" />
              </figure>
              <div className="image-content">
                <h6>2013</h6>
                <div className="icon-box">
                  <i className="flaticon-diagonal-arrow" />
                </div>
                <h2>
                  1000<span>+</span>
                </h2>
                <p>{t("about.investor")}</p>
              </div>
            </div>
          </div>

          <div className="col-lg-5 col-md-12 col-sm-12 content-column">
            <div className="content-box">
              <div className="sec-title">
                <span className="sub-title">Jadwa Al-Yaqeen</span>
                <h2>About us</h2>
              </div>

              <div className="text-box">
                <p dangerouslySetInnerHTML={{ __html: content }} />
              </div>

              <AboutUsSlider slides={sliderItems} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
