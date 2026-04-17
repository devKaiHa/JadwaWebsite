import Link from "next/link";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

import { imageURL } from "@/api/GlobalData";
import { getOtherData } from "@/api/getOtherData";
import { pickLocalized } from "@/api/serverData";
import Layout from "@/components/layout/Layout";

const PAGE_COPY = {
  en: {
    title: "Investments",
    subtitle: "Investment opportunities",
    description:
      "Explore our investment ecosystem through funds, companies, and featured projects.",
    searchPlaceholder: "Search within this section...",
    sections: {
      funds: {
        tab: "Funds",
        label: "Investment funds",
        title: "Funds built for structured growth",
        description:
          "Review our available funds, their sector focus, and the investment profile behind each opportunity.",
        cta: "See more",
        empty: "No funds are available right now.",
      },
      companies: {
        tab: "Companies",
        label: "Companies",
        title: "Companies within our portfolio",
        description:
          "Discover the companies we support and the industries they operate in.",
        cta: "See more",
        empty: "No companies are available right now.",
      },
      projects: {
        tab: "Projects",
        label: "Projects",
        title: "Projects with real market presence",
        description:
          "Browse selected projects and open the published project links when available.",
        cta: "See more",
        empty: "No projects are available right now.",
      },
    },
  },
  tr: {
    title: "Yatirimlar",
    subtitle: "Yatirim firsatlari",
    description:
      "Fonlar, sirketler ve one cikan projeler araciligiyla yatirim ekosistemimizi kesfedin.",
    searchPlaceholder: "Bu alanda ara...",
    sections: {
      funds: {
        tab: "Fonlar",
        label: "Yatirim fonlari",
        title: "Yapilandirilmis buyume icin fonlar",
        description:
          "Mevcut fonlari, sektor odaklarini ve her firsatin yatirim profilini inceleyin.",
        cta: "daha goster",
        empty: "Su anda kullanilabilir fon bulunmuyor.",
      },
      companies: {
        tab: "Sirketler",
        label: "Sirketler",
        title: "Portfoyumuzdeki sirketler",
        description:
          "Destekledigimiz sirketleri ve faaliyet gosterdikleri sektorleri kesfedin.",
        cta: "daha goster",
        empty: "Su anda kullanilabilir sirket bulunmuyor.",
      },
      projects: {
        tab: "Projeler",
        label: "Projeler",
        title: "Piyasada yer alan projeler",
        description:
          "Secili projeleri inceleyin ve varsa yayinlanmis proje baglantilarini acin.",
        cta: "daha goster",
        empty: "Su anda kullanilabilir proje bulunmuyor.",
      },
    },
  },
  ar: {
    title: "الاستثمارات",
    subtitle: "فرص استثمارية",
    description:
      "استكشف منظومة الاستثمار لدينا من خلال الصناديق والشركات والمشاريع المميزة.",
    searchPlaceholder: "ابحث داخل هذا القسم...",
    sections: {
      funds: {
        tab: "الصناديق",
        label: "الصناديق الاستثمارية",
        title: "صناديق مصممة للنمو المنظم",
        description:
          "اطلع على الصناديق المتاحة وتركيزها القطاعي وملف كل فرصة استثمارية.",
        cta: "عرض المزيد ",
        empty: "لا توجد صناديق متاحة حالياً.",
      },
      companies: {
        tab: "الشركات",
        label: "الشركات",
        title: "شركات ضمن محفظتنا",
        description: "تعرّف على الشركات التي ندعمها والقطاعات التي تعمل فيها.",
        cta: "عرض المزيد ",
        empty: "لا توجد شركات متاحة حالياً.",
      },
      projects: {
        tab: "المشاريع",
        label: "المشاريع",
        title: "مشاريع ذات حضور في السوق",
        description:
          "تصفح المشاريع المختارة وافتح روابط المشاريع المنشورة عند توفرها.",
        cta: "عرض المزيد ",
        empty: "لا توجد مشاريع متاحة حالياً.",
      },
    },
  },
};

function stripHtml(value = "") {
  return String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(value = "", maxLength = 140) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trim()}...`;
}

const SECTION_CONFIG = {
  funds: {
    href: "/funds",
    limit: 6,
    getTitle: (item, lang) =>
      pickLocalized(item?.title, lang) || "Untitled fund",
    getText: (item, lang) =>
      stripHtml(
        pickLocalized(item?.description, lang) ||
          pickLocalized(item?.subtitle, lang)
      ),
    getImage: (item) =>
      item?.image
        ? `${imageURL}investmentFunds/${item.image}`
        : "/assets/images/funds.jpg",
    matches: (item, lang, search) =>
      [
        pickLocalized(item?.title, lang),
        pickLocalized(item?.description, lang),
        pickLocalized(item?.subtitle, lang),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(search),
    getItemHref: (item) => `/fund-details/${item?.slug || ""}`,
    onCardClick: (item, router) => {
      if (item?.slug) router.push(`/fund-details/${item.slug}`);
    },
  },

  companies: {
    href: "/companies",
    limit: 6,
    getTitle: (item, lang) =>
      pickLocalized(item?.companyName, lang) || "Untitled company",
    getText: (item, lang) =>
      stripHtml(
        pickLocalized(item?.about, lang) ||
          pickLocalized(item?.ExperienceField, lang) ||
          pickLocalized(item?.content, lang)
      ),
    getImage: (item) =>
      item?.background
        ? `${imageURL}companies/${item.background}`
        : "/assets/images/companies.jpg",
    matches: (item, lang, search) =>
      [
        pickLocalized(item?.companyName, lang),
        pickLocalized(item?.about, lang),
        pickLocalized(item?.ExperienceField, lang),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(search),
    getItemHref: (item) => `/company-details/${item?.slug || ""}`,
    onCardClick: (item, router) => {
      if (item?.slug) router.push(`/company-details/${item.slug}`);
    },
  },

  projects: {
    href: "/projects",
    limit: 6,
    getTitle: (item, lang) =>
      pickLocalized(item?.title, lang) || "Untitled project",
    getText: (item, lang) =>
      stripHtml(
        pickLocalized(item?.brief, lang) ||
          pickLocalized(item?.description, lang)
      ),
    getImage: (item) =>
      item?.image
        ? `${imageURL}projects/${item.image}`
        : "/assets/images/about-banner.jpg",
    matches: (item, lang, search) =>
      [
        pickLocalized(item?.title, lang),
        pickLocalized(item?.brief, lang),
        pickLocalized(item?.description, lang),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(search),
    getItemHref: (item) =>
      item?.projectLink || "https://www.investment.jadwainvest.com",
    onCardClick: (item) => {
      if (item?.projectLink) window.open(item.projectLink, "_blank");
    },
  },
};

function InvestmentCard({
  item,
  title,
  text,
  image,
  itemHref,
  sectionHref,
  actionLabel,
  onCardClick,
}) {
  const router = useRouter();

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
      <article className="investment-preview-card h-100">
        <div
          className="investment-preview-card-media"
          onClick={() => onCardClick(item, router)}
        >
          <img src={image} alt={title} />
        </div>

        <div className="investment-preview-card-body d-flex flex-column">
          <h3
            className="investment-preview-card-title"
            onClick={() => onCardClick(item, router)}
          >
            {title}
          </h3>

          <p className="investment-preview-card-text flex-grow-1">{text}</p>

          <div className="investment-preview-card-footer">
            <button
              type="button"
              className="investment-preview-card-more"
              onClick={() => onCardClick(item, router)}
            >
              <span>{actionLabel}</span>
              <i className="fa-solid fa-arrow-right investment-preview-card-more-icon" />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function InvestmentsPage({
  funds = [],
  companies = [],
  projects = [],
}) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const isArabic = lang === "ar";
  const copy = PAGE_COPY[lang] || PAGE_COPY.en;
  console.log(funds);
  const [activeTab, setActiveTab] = useState("funds");
  const [search, setSearch] = useState("");

  const dataMap = { funds, companies, projects };
  const activeConfig = SECTION_CONFIG[activeTab];
  const activeCopy = copy.sections[activeTab];

  const filteredItems = useMemo(() => {
    const source = Array.isArray(dataMap[activeTab]) ? dataMap[activeTab] : [];
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) return source;
    return source.filter((item) =>
      activeConfig.matches(item, lang, normalizedSearch)
    );
  }, [activeTab, dataMap, activeConfig, lang, search]);

  const visibleItems = filteredItems.slice(0, activeConfig.limit);

  return (
    <Layout
      breadcrumbTitle={copy.title}
      image="/assets/images/about-page-title.jpg"
      sticky
    >
      <section
        className={`investments-page sec-pad ${isArabic ? "rtl" : ""}`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        <div className="auto-container">
          <div className="jadwa-testimonials-head investments-page-head">
            <div className="jadwa-pill">
              <span className="jadwa-pill-dot" />
              <span>{copy.subtitle}</span>
            </div>

            <h2 className="jadwa-testimonials-title">{copy.title}</h2>

            <p className="jadwa-testimonials-subtitle">{copy.description}</p>
          </div>

          <div className="investments-toolbar">
            <div className="investments-tabs">
              {Object.keys(copy.sections).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setActiveTab(key);
                    setSearch("");
                  }}
                  className={`investments-tab-btn ${
                    activeTab === key ? "active" : ""
                  }`}
                >
                  {copy.sections[key].tab}
                </button>
              ))}
            </div>

            <div className="investments-search">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={copy.searchPlaceholder}
              />
              <i className="fa-solid fa-magnifying-glass" />
            </div>
          </div>

          <div className="investments-section-head">
            <div className="investments-section-head-copy">
              {/* <span className="sub-title">{activeCopy.label}</span> */}
              <h2>{activeCopy.title}</h2>
              <p>{activeCopy.description}</p>
            </div>

            {/* <div className="btn-box">
              <Link href={activeConfig.href} className="theme-btn btn-one">
                {activeCopy.cta}
              </Link>
            </div> */}
          </div>

          {visibleItems.length ? (
            <div className="row clearfix">
              {visibleItems.map((item, index) => (
                <InvestmentCard
                  key={item?._id || item?.slug || `${activeTab}-${index}`}
                  item={item}
                  title={activeConfig.getTitle(item, lang)}
                  text={truncate(
                    activeConfig.getText(item, lang) || activeCopy.description
                  )}
                  image={activeConfig.getImage(item)}
                  itemHref={activeConfig.getItemHref(item)}
                  sectionHref={activeConfig.href}
                  actionLabel={activeCopy.cta}
                  onCardClick={activeConfig.onCardClick}
                />
              ))}
            </div>
          ) : (
            <p className="investments-empty">{activeCopy.empty}</p>
          )}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const { funds = [], companies = [], projects = [] } = await getOtherData();

    return {
      props: {
        funds,
        companies,
        projects,
      },
      revalidate: 300,
    };
  } catch (error) {
    console.error("Investments page data error:", error);

    return {
      props: {
        funds: [],
        companies: [],
        projects: [],
      },
      revalidate: 300,
    };
  }
}
