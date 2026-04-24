"use client";

import Link from "next/link";
import Menu from "../Menu";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";

const supportedLangs = ["en", "ar", "tr"];

const socialConfig = [
  { key: "facebook", icon: "fa-brands fa-facebook-f", label: "Facebook" },
  { key: "xTwitter", icon: "fa-brands fa-twitter", label: "X" },
  { key: "instagram", icon: "fa-brands fa-instagram", label: "Instagram" },
  { key: "linkedin", icon: "fa-brands fa-linkedin-in", label: "LinkedIn" },
];

export default function Header({
  scroll,
  handleMobileMenu,
  sticky,
  footerData,
}) {
  const { i18n, t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [suggestedLang, setSuggestedLang] = useState("en");
  const [activeLang, setActiveLang] = useState("en");
  const [userLocation, setUserLocation] = useState("");

  const languages = useMemo(
    () => [
      { value: "en", label: t("English") },
      { value: "ar", label: t("Arabic") },
      { value: "tr", label: t("Turkish") },
    ],
    [t],
  );

  useEffect(() => {
    const match = document.cookie.match(/site_lang=(\w+)/);

    if (match) {
      setActiveLang(match[1]);
      return;
    }

    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        let userLang = data?.languages
          ? data.languages.split(",")[0].slice(0, 2)
          : "en";

        if (!supportedLangs.includes(userLang)) userLang = "en";

        setSuggestedLang(userLang);
        setActiveLang(userLang);
        setShowModal(true);

        const location = `${data?.city || t("header.unknownCity")}, ${
          data?.region || t("header.unknownRegion")
        }, ${data?.country_name || t("header.unknownCountry")}`;

        setUserLocation(location);
      })
      .catch(() => {
        setSuggestedLang("en");
        setActiveLang("en");
        setShowModal(true);
        setUserLocation(t("header.unknownLocation"));
      });
  }, [t]);

  useEffect(() => {
    i18n.changeLanguage(activeLang);
    document.documentElement.dir = activeLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = activeLang;
  }, [activeLang, i18n]);

  const socialLinks = useMemo(
    () =>
      socialConfig
        .filter((item) => footerData?.[item.key])
        .map((item) => ({
          ...item,
          href: footerData[item.key],
        })),
    [footerData],
  );

  const saveLanguage = (lng) => {
    setActiveLang(lng);
    document.cookie = `site_lang=${lng}; path=/; max-age=${30 * 24 * 60 * 60}`;
    setShowModal(false);
  };

  const handleAccept = () => {
    saveLanguage(suggestedLang);
  };

  const handleOtherLang = (lng) => {
    saveLanguage(lng);
  };

  return (
    <>
      <header className={`jadwa-header ${scroll || sticky ? "is-sticky" : ""}`}>
        <div className="outer-container">
          <div className="jadwa-header-wrap">
            <div className="jadwa-header-top">
              <div className="jadwa-header-top-left">
                {socialLinks.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="jadwa-social-link"
                  >
                    <i className={item.icon} />
                  </a>
                ))}
              </div>

              <div className="jadwa-header-top-right">
                <div className="jadwa-select-box">
                  <select
                    className="jadwa-language-select"
                    value={activeLang}
                    onChange={(e) => handleOtherLang(e.target.value)}
                  >
                    {languages.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="jadwa-header-lower">
              <div className="jadwa-header-inner">
                <div className="jadwa-logo-box">
                  <Link href="/">
                    <img
                      src={
                        activeLang === "ar"
                          ? "/assets/images/logos/jadwa-ar-light.png"
                          : "/assets/images/logos/jadwa-en-light.png"
                      }
                      alt="Jadwa"
                      className="jadwa-logo"
                    />
                  </Link>
                </div>

                <nav className="jadwa-nav main-menu navbar-expand-md navbar-light">
                  <div
                    className="collapse navbar-collapse clearfix"
                    id="navbarSupportedContent"
                  >
                    <Menu />
                  </div>
                </nav>

                <Link
                  href="https://investment.jadwainvest.com"
                  target="_blank"
                  rel="noreferrer"
                  className="jadwa-invest-btn"
                >
                  {t("header.investNow")}
                </Link>

                <div
                  className="mobile-nav-toggler jadwa-mobile-toggler"
                  onClick={handleMobileMenu}
                >
                  <i className="icon-bar" />
                  <i className="icon-bar" />
                  <i className="icon-bar" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {showModal && (
        <div className="language-modal-overlay">
          <div className="language-modal">
            <div className="language-modal-content">
              <h2 className="language-modal-title">
                {t("header.languagePreference")}
              </h2>
              <p className="language-modal-text">
                {t("header.locationDetected", {
                  location: userLocation,
                  language:
                    languages.find((item) => item.value === suggestedLang)
                      ?.label || suggestedLang.toUpperCase(),
                })}
              </p>
              <p className="language-modal-subtext">
                {t("header.chooseAnotherLanguage")}
              </p>

              <div className="language-options">
                {supportedLangs
                  .filter((lng) => lng !== suggestedLang)
                  .map((lng) => (
                    <button
                      key={lng}
                      type="button"
                      onClick={() => handleOtherLang(lng)}
                      className="language-option-btn"
                    >
                      {languages.find((item) => item.value === lng)?.label || lng}
                    </button>
                  ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleAccept}
              className="theme-btn btn-two"
            >
              {t("header.accept")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
