import { useTranslation } from "react-i18next";
import Layout from "@/components/layout/Layout";
import baseURL from "@/api/GlobalData";
import { fetchJSON } from "@/GlobalHooks/GlobalHooks";
import { normalizeCompany, pickLocalized } from "@/api/serverData";

import CompanyHero from "@/components/pages/Companies/CompanyHero";
import CompanyOverviewSection from "@/components/pages/Companies/CompanyOverviewSection";
import CompanyFundsSection from "@/components/pages/Companies/CompanyFundsSection";
import CompanyContactSection from "@/components/pages/Companies/CompanyContactSection";

export default function CompanyDetailsPage({ companyData }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  if (!companyData) return null;

  const companyName =
    pickLocalized(companyData.companyName, lang) ||
    pickLocalized(companyData.name, lang) ||
    "Company";

  return (
    <Layout>
      <div className="company-details-page">
        <CompanyHero company={companyData} />

        <section
          className={`company-details-main sec-pad ${
            lang === "ar" ? "rtl" : ""
          }`}
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          <div className="auto-container">
            <CompanyOverviewSection company={companyData} />
            <CompanyFundsSection company={companyData} />
            <CompanyContactSection company={companyData} />
          </div>
        </section>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const payload = await fetchJSON(`${baseURL}companies/public`);
    const companies = Array.isArray(payload?.data) ? payload.data : [];

    return {
      paths: companies
        .filter((company) => company?.slug)
        .map((company) => ({
          params: { slug: company.slug },
        })),
      fallback: "blocking",
    };
  } catch (error) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const payload = await fetchJSON(
      `${baseURL}companies/public/slug/${params.slug}`
    );

    return {
      props: {
        companyData: normalizeCompany(payload?.data || null),
      },
      revalidate: 300,
    };
  } catch (error) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }
}
