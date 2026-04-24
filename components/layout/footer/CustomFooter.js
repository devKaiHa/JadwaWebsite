import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import baseURL from "@/api/GlobalData";
import { fetchJSON, pickArray } from "@/GlobalHooks/GlobalHooks";

const socialConfig = [
  { key: "facebook", icon: "fa-brands fa-facebook-f", label: "Facebook" },
  { key: "xTwitter", icon: "fa-brands fa-twitter", label: "X" },
  { key: "instagram", icon: "fa-brands fa-instagram", label: "Instagram" },
  { key: "linkedin", icon: "fa-brands fa-linkedin-in", label: "LinkedIn" },
];

const localize = (value, lang) =>
  value?.[lang] || value?.en || value?.ar || value?.tr || "";

const defaultAddress = {
  en: "Mahmutbey Mah. Haci Bostan Cad. No.22, Bagcilar - Istanbul",
  ar: "حي محمود بيه، شارع حاجي بستان، رقم 22، باغجلار - إسطنبول",
  tr: "Mahmutbey Mah. Haci Bostan Cad. No.22, Bağcılar - İstanbul",
};

const CustomFooter = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";
  const isRtl = lang === "ar";

  const [footerData, setFooterData] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [funds, setFunds] = useState([]);
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    let mounted = true;

    Promise.allSettled([
      fetchJSON(`${baseURL}footer`),
      fetchJSON(`${baseURL}contact-us/public`),
      fetchJSON(`${baseURL}investment-funds/public?limit=3`),
      fetchJSON(`${baseURL}policies/public`),
    ]).then((results) => {
      if (!mounted) return;

      setFooterData(
        results[0].status === "fulfilled"
          ? results[0].value?.data || null
          : null,
      );
      setContactData(
        results[1].status === "fulfilled"
          ? results[1].value?.data || null
          : null,
      );
      setFunds(
        results[2].status === "fulfilled"
          ? pickArray(results[2].value).slice(0, 3)
          : [],
      );
      setPolicies(
        results[3].status === "fulfilled" ? pickArray(results[3].value) : [],
      );
    });

    return () => {
      mounted = false;
    };
  }, []);

  const footerLinks = useMemo(
    () =>
      Array.isArray(footerData?.links)
        ? footerData.links.filter((item) => item?.isActive)
        : [],
    [footerData],
  );

  const socialLinks = useMemo(
    () =>
      socialConfig
        .filter((item) => footerData?.[item.key])
        .map((item) => ({ ...item, href: footerData[item.key] })),
    [footerData],
  );

  const branches = Array.isArray(contactData?.branches)
    ? contactData.branches.filter((item) => item?.isActive !== false)
    : [];

  const mainAddress =
    localize(contactData?.address, lang) ||
    defaultAddress[lang] ||
    defaultAddress.en;

  const currentYear = new Date().getFullYear();

  return (
    <section className=" footer-premium">
      <div className="footer-premium-pattern" />
      <div className="widget-section footer-premium-main">
        <div className="auto-container">
          <div className="row ">
            <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
              <div className="footer-widget logo-widget footer-premium-brand">
                <div className="footer-logo footer-premium-logo">
                  <Link href="/">
                    <img
                      className="footer-premium-logo-img"
                      src={
                        isRtl
                          ? "/assets/images/logos/jadwa-ar-light.png"
                          : "/assets/images/logos/jadwa-en-light.png"
                      }
                      alt="Jadwa"
                    />
                  </Link>
                </div>

                <p className="footer-premium-desc">
                  {localize(footerData?.description, lang) ||
                    t("companySpecialization")}
                </p>

                <div className="footer-premium-socials">
                  {socialLinks.map((item) => (
                    <a
                      key={item.key}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
                      className="footer-premium-social-link"
                    >
                      <i className={item.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 col-sm-12 footer-column">
              <div className="footer-widget links-widget footer-premium-widget">
                <div className="widget-title footer-premium-widget-title">
                  <h3>{t("quick_links")}</h3>
                </div>
                <div className="widget-content">
                  <ul className="links-list clearfix footer-premium-links">
                    {footerLinks.map((item, index) => (
                      <li key={`${item?.link}-${index}`}>
                        <Link href={item?.link || "#"}>{item?.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
              <div className="footer-widget links-widget footer-premium-widget">
                <div className="widget-title footer-premium-widget-title">
                  <h3>{t("InvestmentFunds")}</h3>
                </div>
                <div className="widget-content">
                  <ul className="links-list clearfix footer-premium-links">
                    {funds.map((fund) => (
                      <li key={fund?._id || fund?.slug}>
                        <a
                          href={fund?.fundLink || "/funds"}
                          target={fund?.fundLink ? "_blank" : undefined}
                          rel={fund?.fundLink ? "noreferrer" : undefined}
                        >
                          {localize(fund?.title, lang)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-12 col-sm-12 footer-column">
              <div
                className="footer-widget contact-widget footer-premium-widget footer-premium-contact"
                dir="ltr"
              >
                <div className="widget-title footer-premium-widget-title">
                  <h3>{t("contact_us")}</h3>
                </div>

                <ul className="footer-premium-contact-list">
                  <li>
                    <span className="footer-premium-contact-icon">
                      <i className="fas fa-phone-alt"></i>
                    </span>
                    <a
                      href={`tel:${(
                        contactData?.phones?.[0] ||
                        footerData?.phone ||
                        ""
                      ).replace(/\s+/g, "")}`}
                    >
                      {contactData?.phones?.[0] ||
                        footerData?.phone ||
                        "+90 537 306 38 91"}
                    </a>
                  </li>

                  <li>
                    <span className="footer-premium-contact-icon">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <a
                      href={`mailto:${
                        contactData?.emails?.[0] ||
                        footerData?.email ||
                        "info@jadwainvest.com"
                      }`}
                    >
                      {contactData?.emails?.[0] ||
                        footerData?.email ||
                        "info@jadwainvest.com"}
                    </a>
                  </li>

                  <li>
                    <span className="footer-premium-contact-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </span>
                    <a
                      href={
                        contactData?.mapLink ||
                        "https://maps.app.goo.gl/9GYrWv7hNnnmPyZf9"
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      {mainAddress}
                    </a>
                  </li>

                  {branches.slice(0, 2).map((branch) => (
                    <li key={branch?._id || branch?.name?.en}>
                      <span className="footer-premium-contact-icon">
                        <i className="fas fa-location-dot"></i>
                      </span>
                      <a
                        href={branch?.mapLink || contactData?.mapLink || "#"}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {localize(branch?.name, lang)}:{" "}
                        {localize(branch?.address, lang)}
                      </a>
                    </li>
                  ))}

                  {footerData?.workDays && (
                    <li>
                      <span className="footer-premium-contact-icon">
                        <i className="fas fa-calendar-alt"></i>
                      </span>
                      <span style={{ color: "rgba(255,255,255,0.72)" }}>
                        {footerData?.workDays || t("footer.mondayFriday")}
                      </span>
                    </li>
                  )}

                  {footerData?.workingHours && (
                    <li>
                      <span className="footer-premium-contact-icon">
                        <i className="fas fa-clock"></i>
                      </span>
                      <span style={{ color: "rgba(255,255,255,0.72)" }}>
                        {footerData?.workingHours || "09:00 - 17:00"}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-premium-newsletter-wrap">
            <div className="row clearfix align-items-center">
              <div className="col-lg-5 col-md-12 col-sm-12">
                <div className="footer-widget mb-3 mb-lg-0 footer-premium-widget">
                  <div className="widget-title footer-premium-widget-title">
                    <h3>{t("footer.newsletter.title")}</h3>
                  </div>
                  <p className="footer-premium-newsletter-text">
                    {t("footer.newsletter.text")}
                  </p>
                </div>
              </div>

              <div className="col-lg-7 col-md-12 col-sm-12">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div
                    className={`footer-premium-newsletter-form ${
                      isRtl ? "rtl" : ""
                    }`}
                  >
                    <input
                      type="email"
                      placeholder={t("footer.newsletter.email")}
                      className="footer-premium-input"
                    />
                    <button
                      type="submit"
                      className="theme-btn btn-two footer-premium-btn"
                    >
                      <span>{t("footer.newsletter.button")}</span>
                      <i className="fas fa-paper-plane" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-premium-bottom">
        <div className="auto-container">
          <div className="footer-premium-bottom-inner">
            <div className="footer-premium-bottom-left">
              <div className="footer-premium-bottom-brand">
                <Link href="/" className="footer-premium-mini-logo">
                  <img src="/assets/jadwa.ico" alt="Jadwa" />
                </Link>

                <p>
                  &copy; {currentYear}, {t("all_rights_reserved")}
                </p>
              </div>

              <ul className=" clearfix footer-premium-bottom-nav">
                {policies?.map((item) => {
                  return (
                    <li key={item?._id}>
                      <Link
                        href={
                          item?.slug ? `/policies/${item?.slug}` : "/policies"
                        }
                      >
                        {item?.title[lang]}
                      </Link>
                    </li>
                  );
                })}

                <li className="footer-premium-credit-item">
                  <a
                    href="https://www.smartinb.com"
                    target="_blank"
                    rel="noreferrer"
                    className="footer-premium-credit"
                    aria-label="Built by Smartinb"
                  >
                    <span className="footer-premium-credit-label">
                      {t("footer.builtBy")}
                    </span>
                    <span className="footer-premium-credit-brand">
                      <span className="footer-premium-credit-dot" />
                      smartinb.com
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomFooter;
