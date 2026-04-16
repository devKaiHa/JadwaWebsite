"use client";

import { useTranslation } from "react-i18next";
import Layout from "@/components/layout/Layout";
import About_us from "@/components/sections/home3/About";
import { getOtherData } from "@/api/getOtherData";
import TeamlSlider from "@/components/pages/AboutUs/TeamlSlider";
import FounderSlides from "@/components/pages/AboutUs/FounderSlider";
import CompaniesBrief from "@/components/pages/AboutUs/CompaniesBrief";
import TestimonialSlider03 from "@/components/slider/TestimonialSlider03";
import Sectors from "@/components/sections/home1/Sectors";
import { getHomeData } from "@/api/getHomeData";
import { imageURL } from "@/api/GlobalData";
import { useState } from "react";

export async function getStaticProps() {
  try {
    const data = await getOtherData();
    const homeData = await getHomeData();
    return { props: { data, homeData }, revalidate: 300 };
  } catch (err) {
    console.error("Other data error:", err);
    return { props: { data: {}, homeData: {} }, revalidate: 300 };
  }
}

export default function About({ data = {}, homeData = {} }) {
  const { i18n, t } = useTranslation();
  const lang = i18n?.language || "en";
  const [activeAboutCard, setActiveAboutCard] = useState("business");

  const {
    aboutUs = [],
    members = [],
    testimonials = [],
    companies = [],
  } = data;

  const { values, about = {} } = homeData;

  const boardMembers = members?.filter((item) => item.isFounder);
  const team = members?.filter((item) => !item.isFounder);

  const item = Array.isArray(aboutUs) ? aboutUs[0] || {} : aboutUs || {};

  const pick = (obj) =>
    obj && typeof obj === "object"
      ? obj[lang] ?? obj.en ?? obj.ar ?? obj.tr ?? ""
      : "";
  const localizedText = (field, currentLang) =>
    field?.[currentLang] || field?.en || "";

  const title = pick(item?.aboutUsTitle?.title) || pick(item?.title);
  const subtitle = pick(item?.aboutUsTitle?.subtitle) || pick(item?.subtitle);
  const content = pick(item?.content);

  const businessApproach = item?.businessApproach;
  const whyUs = item?.whyUs;
  const governance = item?.governance;
  const prizes = item?.prizes || [];
  const certificates = item?.certificates || [];

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

  const aboutCards = [
    businessApproach && {
      key: "business",
      icon: "fa-solid fa-chart-line",
      title: t("about.businessApproach"),
      content: localizedText(businessApproach, lang),
    },
    whyUs && {
      key: "whyus",
      icon: "fa-solid fa-shield-heart",
      title: t("about.whyUs"),
      content: localizedText(whyUs, lang),
    },
    governance && {
      key: "governance",
      icon: "fa-solid fa-scale-balanced",
      title: t("about.governance"),
      content: localizedText(governance, lang),
    },
  ];

  const hasAny =
    title ||
    subtitle ||
    content ||
    sliderItems.some((s) => pick(s.title) || pick(s.content));

  if (!hasAny) return null;

  const formatDate = (date, locale = "en") => {
    if (!date) return "";
    try {
      return new Date(date).toLocaleDateString(
        locale === "ar" ? "ar" : locale === "tr" ? "tr-TR" : "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );
    } catch {
      return "";
    }
  };

  const hasAboutBlocks =
    businessApproach ||
    whyUs ||
    governance ||
    prizes?.length ||
    certificates?.length;

  return (
    <Layout
      headerStyle={1}
      footerStyle={1}
      breadcrumbTitle={t("about.about-us")}
    >
      <div className="about-page-content" dir="ltr">
        <About_us aboutUs={about} />

        {values && <Sectors values={values} />}

        {hasAboutBlocks && (
          <div className="about-page-group about-page-more">
            <div className="auto-container">
              {!!aboutCards.length && (
                <>
                  <div className="jadwa-testimonials-head about-page-head">
                    <div className="jadwa-pill">
                      <span className="jadwa-pill-dot" />
                      <span>{t("about.about-us")}</span>
                    </div>

                    <h2 className="jadwa-testimonials-title">
                      {t("about.moreAboutUs")}
                    </h2>

                    <p className="jadwa-testimonials-subtitle">
                      {lang === "ar"
                        ? "نقدّم نهجًا استثماريًا قائمًا على الانضباط والحوكمة والرؤية طويلة المدى."
                        : lang === "tr"
                        ? "Disiplin, yönetişim ve uzun vadeli bakış açısına dayalı bir yatırım yaklaşımı sunuyoruz."
                        : "We bring together disciplined strategy, strong governance, and a long-term investment perspective."}
                    </p>
                  </div>

                  <div className="about-value-dynamic-layout">
                    {aboutCards.map((card) => {
                      const isActive = activeAboutCard === card.key;

                      return (
                        <div
                          key={card.key}
                          className={`about-value-dynamic-card ${
                            isActive ? "is-active" : "is-inactive"
                          }`}
                          onMouseEnter={() => setActiveAboutCard(card.key)}
                        >
                          <div className="about-value-pattern" />

                          <div
                            className={`about-value-icon ${
                              isActive ? "" : "about-value-icon-light"
                            }`}
                          >
                            <i className={card.icon} />
                          </div>

                          <div className="about-value-content">
                            <h3
                              className={`about-value-title ${
                                isActive ? "" : "about-value-title-light"
                              }`}
                            >
                              {card.title}
                            </h3>

                            <div
                              className={`about-value-text ${
                                isActive ? "" : "about-value-text-light"
                              }`}
                            >
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: card.content,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {!!boardMembers?.length && (
          <div className="auto-container  sec-pad">
            <div className="jadwa-testimonials-head about-page-head">
              <div className="jadwa-pill">
                <span className="jadwa-pill-dot" />
                <span>{t("about.about-us")}</span>
              </div>

              <h2 className="jadwa-testimonials-title">
                {t("about.theFounders")}
              </h2>
            </div>

            <FounderSlides founders={boardMembers} variant="founders" />
          </div>
        )}

        {!!team?.length && (
          <div className="auto-container">
            <div className="jadwa-testimonials-head about-page-head">
              <div className="jadwa-pill">
                <span className="jadwa-pill-dot" />
                <span>{t("about.about-us")}</span>
              </div>

              <h2 className="jadwa-testimonials-title">{t("about.ourTeam")}</h2>
            </div>

            <TeamlSlider team={team} variant="team" />
          </div>
        )}

        {!!companies?.length && <CompaniesBrief companies={companies} />}

        {!!testimonials?.length && (
          <TestimonialSlider03 testimonials={testimonials} />
        )}
      </div>
    </Layout>
  );
}
