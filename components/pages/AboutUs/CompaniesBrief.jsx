import Link from "next/link";
import { imageURL } from "@/api/GlobalData";
import { truncateText } from "@/GlobalHooks/GlobalHooks";
import { getCountryNameByCode } from "@/lib/helpers";
import { useTranslation } from "react-i18next";

export default function CompaniesBrief({ companies = [] }) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";
  const isRtl = lang === "ar";

  const visibleCompanies = [...companies]
    .filter(
      (company) => company?.companyName?.en || company?.companyName?.[lang]
    )
    .sort((a, b) => (a?.order || 0) - (b?.order || 0))
    .slice(0, 3);

  if (!visibleCompanies.length) return null;

  const fallbackLabel = (key, defaultValue) => {
    const value = t(key);
    return value === key ? defaultValue : value;
  };

  return (
    <section className="companies-brief-section sec-pad">
      <div className="auto-container">
        <div className="jadwa-testimonials-head companies-brief-head">
          <div className="jadwa-pill">
            <span className="jadwa-pill-dot" />
            <span>{fallbackLabel("companies.title", "Companies")}</span>
          </div>

          <h2 className="jadwa-testimonials-title">
            {fallbackLabel(
              "about.ourCompaniesBrief",
              "A Brief Look At Our Companies"
            )}
          </h2>

          <p className="jadwa-testimonials-subtitle">
            {fallbackLabel(
              "companies.description",
              "A curated view of selected companies within our ecosystem."
            )}
          </p>
        </div>

        <div className="row clearfix">
          {visibleCompanies.map((company, index) => {
            const companyName =
              company?.companyName?.[lang] ||
              company?.companyName?.en ||
              company?.aboutus?.[lang] ||
              company?.aboutus?.en ||
              "";

            const companyAbout =
              company?.about?.[lang] || company?.about?.en || "";

            const experienceField =
              company?.ExperienceField?.[lang] ||
              company?.ExperienceField?.en ||
              "";

            const companyCountry = company?.country
              ? getCountryNameByCode(company.country, lang)
              : "";

            const companyHref = `/company-details/${company?.slug}`;

            return (
              <div
                key={company?._id || company?.slug || index}
                className="col-lg-4 col-md-6 col-sm-12 mb-4"
              >
                <div className="companies-brief-card">
                  <div className="companies-brief-top-line" />

                  <div className="companies-brief-media">
                    <div className="companies-brief-media-overlay" />

                    {company?.logo ? (
                      <img
                        src={`${imageURL}companies/${company.logo}`}
                        alt={companyName}
                        className="companies-brief-logo"
                      />
                    ) : company?.background ? (
                      <img
                        src={`${imageURL}companies/${company.background}`}
                        alt={companyName}
                        className="companies-brief-background-image"
                      />
                    ) : (
                      <div className="companies-brief-fallback-icon">
                        {companyName?.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="companies-brief-content">
                    {(experienceField || companyCountry) && (
                      <div
                        className={`companies-brief-tags ${
                          isRtl ? "companies-brief-tags-rtl" : ""
                        }`}
                      >
                        {experienceField ? (
                          <span className="companies-brief-primary-tag">
                            {experienceField}
                          </span>
                        ) : null}

                        {companyCountry ? (
                          <span className="companies-brief-secondary-tag">
                            {companyCountry}
                          </span>
                        ) : null}
                      </div>
                    )}

                    <h3 className="companies-brief-company-title">
                      <Link href={companyHref}>{companyName}</Link>
                    </h3>

                    <div
                      className="companies-brief-company-text"
                      dangerouslySetInnerHTML={{
                        __html: truncateText(companyAbout, 110),
                      }}
                    />

                    <div className="companies-brief-footer">
                      <Link
                        href={companyHref}
                        className="companies-brief-read-more"
                      >
                        <span className="companies-brief-read-more-text">
                          {fallbackLabel("read_more", "Read more")}
                        </span>
                        <span className="companies-brief-arrow">
                          <i
                            className={`fas ${
                              isRtl ? "fa-arrow-left" : "fa-arrow-right"
                            }`}
                          />
                        </span>
                      </Link>

                      {company?.website ? (
                        <a
                          href={
                            /^https?:\/\//i.test(company.website)
                              ? company.website
                              : `https://${company.website}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="companies-brief-website"
                          aria-label={`${companyName} website`}
                        >
                          <span className="companies-brief-website-icon">
                            <i className="fas fa-globe-americas" />
                          </span>
                          <span>{fallbackLabel("website", "Website")}</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
