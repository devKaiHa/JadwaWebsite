import Layout from "@/components/layout/Layout";
import parse from "html-react-parser";
import { useTranslation } from "react-i18next";
import { fetchJSON } from "@/GlobalHooks/GlobalHooks";
import baseURL from "@/api/GlobalData";

export default function PolicyDetailsPage({ policy }) {
  const { i18n } = useTranslation();
  const lang = i18n?.language || "en";
  const isAr = lang === "ar";

  if (!policy) return null;

  const title = policy?.title?.[lang] || policy?.title?.en || "";
  const summary = policy?.summary?.[lang] || policy?.summary?.en || "";
  const content = policy?.content?.[lang] || policy?.content?.en || "";
  const type = policy?.policyType || (isAr ? "سياسة" : "Policy");

  return (
    <Layout breadcrumbTitle={title}>
      <section className="policy-details-section sec-pad">
        <div className="auto-container">
          <div className="policy-details-wrapper">
            <div className="policy-details-header centred">
              <span className="policy-details-badge">{type}</span>
              <h1>{title}</h1>
              {summary ? (
                <p className="policy-details-summary">{summary}</p>
              ) : null}
            </div>

            <div className="policy-details-body">
              <div className="policy-details-content">{parse(content)}</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const payload = await fetchJSON(`${baseURL}policies/public`);
    const policies = Array.isArray(payload?.data) ? payload.data : [];

    return {
      paths: policies
        .filter((policy) => policy?.slug)
        .map((policy) => ({
          params: { slug: policy.slug },
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
      `${baseURL}policies/public/slug/${params.slug}`
    );

    return {
      props: {
        policy: payload?.data || null,
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
