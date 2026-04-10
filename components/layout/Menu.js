"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Menu() {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  const links = [
    {
      href: "/",
      label: { ar: "الرئيسية", en: "Home", tr: "Ana Sayfa" },
    },
    {
      href: "/about",
      label: { ar: "من نحن", en: "About", tr: "Hakkinda" },
    },
    {
      href: "/investments",
      label: { ar: "الاستثمارات", en: "Investments", tr: "Yatirimlar" },
    },
    {
      href: "/research",
      label: { ar: "الأبحاث", en: "Research", tr: "Arastirma" },
    },
    {
      href: "/blog-2",
      label: { ar: "المدونة", en: "Blog", tr: "Blog" },
    },
    {
      href: "/Contact-us",
      label: { ar: "تواصل معنا", en: "Contact", tr: "Iletisim" },
    },
    {
      href: "https://investment.jadwainvest.com",
      label: { ar: "استثمر الآن", en: "Invest now", tr: "Yatirim yap" },
    },
  ];

  return (
    <ul className="navigation clearfix">
      {links.map(({ href, label }, idx) => (
        <li key={idx}>
          <Link
            style={{ fontSize: "14px" }}
            href={href}
            className={label?.en === "Invest now" ? "text-info" : ""}
          >
            {label[lang] || label.en}
          </Link>
        </li>
      ))}
    </ul>
  );
}
