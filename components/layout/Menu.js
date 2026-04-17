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
      label: { ar: "من نحن", en: "About Us", tr: "Hakkımızda" },
    },
    {
      href: "/investments",
      label: { ar: "الاستثمارات", en: "Investments", tr: "Yatırımlar" },
    },
    {
      href: "/research",
      label: {
        ar: "التحليلات والبحوث",
        en: "Analytics & Research",
        tr: "Analiz ve Araştırma",
      },
    },
    {
      href: "/blog-2",
      label: { ar: "الأخبار", en: "News", tr: "Haberler" },
    },
    {
      href: "/comingsoon",
      label: { ar: "التوظيف", en: "Careers", tr: "Kariyer" },
    },

    {
      href: "/Contact-us",
      label: { ar: "تواصل معنا", en: "Contact Us", tr: "İletişim" },
    },
  ];

  return (
    <ul className="navigation clearfix">
      {links.map(({ href, label }, idx) => (
        <li key={idx}>
          <Link href={href}>{label[lang] || label.en}</Link>
        </li>
      ))}
    </ul>
  );
}
