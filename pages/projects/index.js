import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { getOtherData } from "@/api/getOtherData";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { imageURL } from "@/api/GlobalData";

export default function ProjectsPage({ projects = [] }) {
  const { t } = useTranslation();

  return (
    <Layout breadcrumbTitle={t("projectsPage.breadcrumb")}>
      <section className="news-style-two sec-pad">
        <div className="auto-container">
          <div className="sec-title">
            <span className="sub-title">{t("projectsPage.subtitle")}</span>
            <h2>{t("projectsPage.title")}</h2>
          </div>
          <div className="row clearfix">
            {projects.map((project) => {
              return (
                <div
                  key={project?._id}
                  className="col-lg-4 col-md-6 col-sm-12 news-block"
                >
                  <div className="news-block-one h-100">
                    <div className="inner-box h-100">
                      <div className="image-box">
                        <figure className="image">
                          <img
                            src={
                              `${imageURL}projects/${project?.image}` ||
                              "/assets/images/news/news-1.jpg"
                            }
                            alt={project?.title?.en}
                            style={{ height: "250px", objectFit: "cover" }}
                          />
                        </figure>
                      </div>
                      <ProjectBrief project={project} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

const ProjectBrief = ({ project }) => {
  const [expanded, setExpanded] = useState(false);
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";

  const brief = project?.brief?.[lang] || project?.brief?.en || "";
  const shortText = brief.slice(0, 120);

  return (
    <div className="lower-box">
      <h3>{project?.title?.[lang] || project?.title?.en}</h3>

      <p>
        {expanded ? brief : shortText}
        {brief.length > 120 && !expanded && "... "}

        {brief.length > 120 && (
          <span
            onClick={() => setExpanded(!expanded)}
            className="cursor-pointer text-primary ms-2"
          >
            {expanded ? t("projectsPage.seeLess") : t("projectsPage.seeMore")}
          </span>
        )}
      </p>

      {project?.projectLink && (
        <div className="link">
          <Link href={project.projectLink} target="_blank">
            <span>{t("projectsPage.openProject")}</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export async function getStaticProps() {
  const { projects = [] } = await getOtherData();

  return {
    props: { projects },
    revalidate: 300,
  };
}
