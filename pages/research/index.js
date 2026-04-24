import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { getOtherData } from "@/api/getOtherData";
import { useTranslation } from "react-i18next";
import { truncateText } from "@/GlobalHooks/GlobalHooks";
import { imageURL } from "@/api/GlobalData";

export default function ResearchPage({ research = [] }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";

  return (
    <Layout breadcrumbTitle={t("researchPage.breadcrumb")}>
      <section className="news-style-two sec-pad">
        <div className="auto-container">
          <div className="sec-title">
            <span className="sub-title">{t("researchPage.subtitle")}</span>
            <h2>{t("researchPage.title")}</h2>
          </div>
          <div className="row clearfix">
            {research.map((item) => (
              <div
                key={item?._id}
                className="col-lg-4 col-md-6 col-sm-12 news-block"
              >
                <div className="news-block-one h-100">
                  <div className="inner-box h-100">
                    <div className="image-box">
                      <figure className="image">
                        <img
                          src={
                            `${imageURL}research/${item?.image}` ||
                            "/assets/images/news/news-1.jpg"
                          }
                          alt={item?.title?.[lang] || item?.title?.en}
                          style={{ height: "250px", objectFit: "cover" }}
                        />
                      </figure>
                    </div>
                    <div className="lower-box">
                      <h3>{item?.title?.[lang] || item?.title?.en}</h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: truncateText(
                            item?.content?.[lang] || item?.content?.en,
                            140,
                          ),
                        }}
                      />
                      <div className="link">
                        <Link href={`/research/${item?.slug}`}>
                          <span>{t("read_more")}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const { research = [] } = await getOtherData();

  return {
    props: { research },
    revalidate: 300,
  };
}
