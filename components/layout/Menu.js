"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Menu() {
  const { t } = useTranslation();

  const links = [
    { href: "/", label: t("menu.home") },
    { href: "/about", label: t("menu.aboutUs") },
    { href: "/investments", label: t("menu.investments") },
    { href: "/research", label: t("menu.analyticsResearch") },
    { href: "/blog-2", label: t("menu.news") },
    { href: "/comingsoon", label: t("menu.careers") },
    { href: "/Contact-us", label: t("menu.contactUs") },
  ];

  return (
    <ul className="navigation clearfix">
      {links.map(({ href, label }, idx) => (
        <li key={idx}>
          <Link href={href}>{label}</Link>
        </li>
      ))}
    </ul>
  );
}
