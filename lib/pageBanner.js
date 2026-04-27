import baseURL, { PageBannersEndPoint, imageURL } from "@/api/GlobalData";
import { fetchJSON, pickArray, pickObject } from "@/GlobalHooks/GlobalHooks";

export const PAGE_BANNER_DEFAULTS = {
  about: "/assets/images/background/partners.png",
  services: "/assets/images/background/services.png",
  companies: "/assets/images/background/partners.png",
  investments: "/assets/images/about-page-title.jpg",
  funds: "/assets/images/about-page-title.jpg",
  projects: "/assets/images/background/partners.png",
  analytics_research: "/assets/images/background/blogs.png",
  blogs: "/assets/images/background/blogs.png",
  policies: "/assets/images/background/partners.png",
  team: "/assets/images/background/partners.png",
  careers: "/assets/images/background/partners.png",
  search: "/assets/search-bg.jpg",
  contact: "/assets/images/background/partners.png",
  customPages: "/assets/images/background/partners.png",
  faq: "/assets/images/background/partners.png",
  creditCards: "/assets/images/background/partners.png",
  notFound: "/assets/images/background/404.jpg",
};

const PAGE_BANNER_ROUTE_KEYS = {
  "/about": "about",
  "/Services": "services",
  "/companies": "companies",
  "/country-companies/[id]": "companies",
  "/company-details/[slug]": "companies",
  "/investments": "investments",
  "/fund-details/[slug]": "funds",
  "/projects": "projects",
  "/research": "analytics_research",
  "/research/[slug]": "analytics_research",
  "/blog-2": "blogs",
  "/blog-details/[slug]": "blogs",
  "/policies": "policies",
  "/policies/[slug]": "policies",
  "/team": "team",
  "/member/[slug]": "team",
  "/Contact-us": "contact",
  "/custom-pages/[slug]": "customPages",
  "/faq/page": "faq",
  "/credit-cards/page": "creditCards",
  "/not-found": "notFound",
};

const PAGE_BANNER_ALIASES = {
  blog: "blogs",
  blog2: "blogs",
  "blog-2": "blogs",
  "blog-details": "blogs",
  contactUs: "contact",
  "contact-us": "contact",
  contacts: "contact",
  service: "services",
  ourServices: "services",
  "our-services": "services",
  company: "companies",
  "company-details": "companies",
  "country-companies": "companies",
  investment: "investments",
  investmentFunds: "funds",
  "investment-funds": "funds",
  policy: "policies",
  member: "team",
  members: "team",
  "custom-pages": "customPages",
  customPage: "customPages",
  custom_pages: "customPages",
  "credit-cards": "creditCards",
  creditCards: "creditCards",
  "not-found": "notFound",
  notFound: "notFound",
};

const IMAGE_FIELDS = [
  "image",
  "banner",
  "bannerImage",
  "pageBanner",
  "desktopImage",
  "background",
  "photo",
  "url",
  "path",
];

const KEY_FIELDS = [
  "key",
  "pageKey",
  "page",
  "slug",
  "name",
  "type",
  "identifier",
];

const normalizeBannerKey = (key = "") => {
  const rawKey = String(key).trim();
  if (!rawKey) return "";

  const withoutPath = rawKey.replace(/^\/+|\/+$/g, "");
  const directKey = PAGE_BANNER_ALIASES[withoutPath] || withoutPath;

  return PAGE_BANNER_DEFAULTS[directKey]
    ? directKey
    : directKey.replace(/[-_](\w)/g, (_, char) => char.toUpperCase());
};

export const pagePathToBannerKey = (pathname = "") => {
  if (!pathname) return "";
  if (PAGE_BANNER_ROUTE_KEYS[pathname]) return PAGE_BANNER_ROUTE_KEYS[pathname];

  const firstSegment = pathname.split("/").filter(Boolean)[0] || "";
  return normalizeBannerKey(firstSegment);
};

const getBannerImageValue = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value;

  if (typeof value === "object") {
    for (const field of IMAGE_FIELDS) {
      const fieldValue = getBannerImageValue(value[field]);
      if (fieldValue) return fieldValue;
    }
  }

  return "";
};

export const toBannerImageUrl = (value = "") => {
  const imageValue = getBannerImageValue(value);
  if (!imageValue) return "";
  if (/^(https?:)?\/\//i.test(imageValue) || imageValue.startsWith("/")) {
    return imageValue;
  }
  return `${imageURL}${imageValue.replace(/^\/+/, "")}`;
};

export function normalizePageBanners(payload) {
  const data = pickObject(payload);
  const pageBanners = {};

  const addBanner = (key, value) => {
    const bannerKey = normalizeBannerKey(key);
    const image = getBannerImageValue(value);

    if (bannerKey && image) {
      pageBanners[bannerKey] = image;
    }
  };

  const addBannerItem = (item) => {
    if (!item || typeof item !== "object") return;

    const key = KEY_FIELDS.map((field) => item[field]).find(
      (value) => typeof value === "string" && value,
    );
    addBanner(key, item);
  };

  const arrayData = pickArray(payload);
  if (arrayData.length) {
    arrayData.forEach(addBannerItem);
  } else if (Array.isArray(data)) {
    data.forEach(addBannerItem);
  } else if (data && typeof data === "object") {
    const singleItemKey = KEY_FIELDS.map((field) => data[field]).find(
      (value) => typeof value === "string" && value,
    );

    if (singleItemKey && getBannerImageValue(data)) {
      addBannerItem(data);
    } else {
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(addBannerItem);
        } else {
          addBanner(key, value);
        }
      });
    }
  }

  return pageBanners;
}

export async function getPageBanners() {
  try {
    const payload = await fetchJSON(`${baseURL}${PageBannersEndPoint}/public`);
    return normalizePageBanners(payload);
  } catch (error) {
    return {};
  }
}

export function resolvePageBanner(pageKey, pageBanners = {}, fallback = "") {
  const bannerKey = normalizeBannerKey(pageKey);
  const configuredBanner = toBannerImageUrl(pageBanners?.[bannerKey] || "");
  return configuredBanner || fallback || PAGE_BANNER_DEFAULTS[bannerKey] || "";
}
