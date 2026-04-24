import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { fetchJSON, pickArray } from "@/GlobalHooks/GlobalHooks";
import baseURL from "@/api/GlobalData";

export default function PoliciesPage({ policies = [] }) {
  const { t, i18n } = useTranslation();
  const lang = i18n?.language || "en";
  const isAr = lang === "ar";

  return (
    <Layout breadcrumbTitle={t("policiesPage.breadcrumb")}>
      <section className="policies-page-section sec-pad">
        <div className="auto-container">
          <div className="policies-page-heading centred">
            <span className="policies-page-subtitle">
              {t("policiesPage.subtitle")}
            </span>
            <h2>{t("policiesPage.title")}</h2>
            <p>{t("policiesPage.description")}</p>
          </div>

          {policies?.length ? (
            <div className="row clearfix">
              {policies.map((policy) => {
                const title = policy?.title?.[lang] || policy?.title?.en || "-";
                const summary =
                  policy?.summary?.[lang] || policy?.summary?.en || "";
                const type = policy?.policyType || t("policiesPage.defaultType");

                return (
                  <div
                    key={policy?._id}
                    className="col-lg-4 col-md-6 col-sm-12"
                  >
                    <article className="policy-card-item">
                      <div className="policy-card-inner">
                        <div className="policy-card-top">
                          <span className="policy-card-badge">{type}</span>
                        </div>

                        <div className="policy-card-content">
                          <h3 className="policy-card-title">
                            <Link href={`/policies/${policy?.slug}`}>
                              {title}
                            </Link>
                          </h3>

                          <p className="policy-card-summary">{summary}</p>
                        </div>

                        <div className="policy-card-footer">
                          <Link
                            href={`/policies/${policy?.slug}`}
                            className="policy-card-link"
                          >
                            <span>{t("read_more")}</span>
                            <i
                              className={`fas ${
                                isAr ? "fa-arrow-left" : "fa-arrow-right"
                              }`}
                            />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="policies-empty-state">
              <div className="policies-empty-state-inner">
                <h3>{t("policiesPage.emptyTitle")}</h3>
                <p>{t("policiesPage.emptyDescription")}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const payload = await fetchJSON(`${baseURL}policies/public`);

    return {
      props: {
        policies: pickArray(payload),
      },
      revalidate: 300,
    };
  } catch (error) {
    return {
      props: {
        policies: [],
      },
      revalidate: 60,
    };
  }
}
