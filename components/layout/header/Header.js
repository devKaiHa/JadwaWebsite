"use client";

import Link from "next/link";
import Menu from "../Menu";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import baseURL from "@/api/GlobalData";
import { fetchJSON } from "@/GlobalHooks/GlobalHooks";

const supportedLangs = ["en", "ar", "tr"];

const socialConfig = [
  { key: "facebook", icon: "fa-brands fa-facebook-f", label: "Facebook" },
  { key: "xTwitter", icon: "fa-brands fa-twitter", label: "X" },
  { key: "instagram", icon: "fa-brands fa-instagram", label: "Instagram" },
  { key: "linkedin", icon: "fa-brands fa-linkedin-in", label: "LinkedIn" },
];

export default function Header({ scroll, handleMobileMenu, sticky }) {
  const { t, i18n } = useTranslation();

  const [showModal, setShowModal] = useState(false);
  const [suggestedLang, setSuggestedLang] = useState("en");
  const [activeLang, setActiveLang] = useState("en");
  const [userLocation, setUserLocation] = useState("");
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    let mounted = true;

    fetchJSON(`${baseURL}footer`)
      .then((payload) => {
        if (mounted) setFooterData(payload?.data || null);
      })
      .catch(() => {
        if (mounted) setFooterData(null);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const match = document.cookie.match(/site_lang=(\w+)/);
    if (match) {
      setActiveLang(match[1]);
      return;
    }

    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        let userLang = data.languages
          ? data.languages.split(",")[0].slice(0, 2)
          : "en";
        if (!supportedLangs.includes(userLang)) userLang = "en";

        setSuggestedLang(userLang);
        setActiveLang(userLang);
        setShowModal(true);

        const location = `${data.city || "Unknown City"}, ${
          data.region || "Unknown Region"
        }, ${data.country_name || "Unknown Country"}`;
        setUserLocation(location);
      })
      .catch(() => {
        setSuggestedLang("en");
        setActiveLang("en");
        setShowModal(true);
        setUserLocation("Unknown Location");
      });
  }, []);

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
          href: footerData?.[item.key],
        })),
    [footerData],
  );

  const handleAccept = () => {
    setActiveLang(suggestedLang);
    document.cookie = `site_lang=${suggestedLang}; path=/; max-age=${
      30 * 24 * 60 * 60
    }`;
    setShowModal(false);
  };

  const handleOtherLang = (lng) => {
    setActiveLang(lng);
    document.cookie = `site_lang=${lng}; path=/; max-age=${30 * 24 * 60 * 60}`;
    setShowModal(false);
  };

  return (
    <>
      <header
        className={`main-header header-style-three bg-transparent ${
          scroll || sticky
            ? "fixed-header animated slideInDown"
            : "header-style-custom"
        }`}
      >
        <div
          className="header-top"
          style={{
            background: "#0d3b46",
            borderRadius: scroll || sticky ? "0" : "10px 10px 0 0",
          }}
        >
          <div className="outer-container">
            <div
              className="outer-box"
              style={{
                height: "20px",
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "14px" }}
              >
                {socialLinks.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    style={{ color: "#fff", fontSize: "14px" }}
                  >
                    <i className={item.icon} />
                  </a>
                ))}
              </div>

              <div
                className="language-box"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#fff",
                }}
              >
                <span style={{ fontSize: "13px", opacity: 0.85 }}>
                  {t("language") === "language" ? "Language" : t("language")}
                </span>
                <div className="select-box">
                  <select
                    className="selectmenu"
                    value={activeLang}
                    onChange={(e) => handleOtherLang(e.target.value)}
                    style={{
                      background: "transparent",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.25)",
                      borderRadius: "999px",
                      padding: "6px 12px",
                    }}
                  >
                    {supportedLangs.map((lng) => (
                      <option key={lng} value={lng}>
                        {lng.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="header-lower"
          style={{ minHeight: "4.7em", borderRadius: "0 0 10px 10px" }}
        >
          <div className="outer-container">
            <div className="outer-box">
              <div className="menu-area">
                <figure className="logo-box">
                  <Link href="/">
                    <img
                      src={
                        i18n.language === "ar"
                          ? "/assets/images/logos/jadwa-ar-light.png"
                          : "/assets/images/logos/jadwa-en-light.png"
                      }
                      alt="Jadwa"
                    />
                  </Link>
                </figure>

                <div className="mobile-nav-toggler" onClick={handleMobileMenu}>
                  <i className="icon-bar" />
                  <i className="icon-bar" />
                  <i className="icon-bar" />
                </div>

                <nav className="main-menu navbar-expand-md navbar-light">
                  <div
                    className="collapse navbar-collapse clearfix"
                    id="navbarSupportedContent"
                  >
                    <Menu />
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>

      {showModal && (
        <div className="language-modal-overlay">
          <div className="language-modal">
            <div className="language-modal-content">
              <h2 className="language-modal-title">Language Preference</h2>
              <p className="language-modal-text">
                Based on your location, we detected your site in{" "}
                <b>{userLocation}</b>. The suggested language is{" "}
                <b>{suggestedLang.toUpperCase()}</b>.
              </p>
              <p className="language-modal-subtext">
                Or choose another language from the options below:
              </p>
              <div className="language-options">
                {supportedLangs
                  .filter((lng) => lng !== suggestedLang)
                  .map((lng) => (
                    <button
                      key={lng}
                      onClick={() => handleOtherLang(lng)}
                      className="language-option-btn"
                    >
                      {lng.toUpperCase()}
                    </button>
                  ))}
              </div>
            </div>

            <button onClick={handleAccept} className="theme-btn btn-two">
              Accept
            </button>
          </div>
        </div>
      )}
    </>
  );
}
