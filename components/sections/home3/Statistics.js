import { useTranslation } from "react-i18next";

export default function Statistics({ statistics = [] }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  if (!statistics.length) return null;

  return (
    <section className="service-style-three" style={{ marginTop: "100px" }}>
      <div className="auto-container">
        <div className="sec-title centred light">
          <span className="sub-title" style={{ color: "#fff" }}>
            {lang === "ar"
              ? "إحصاءات"
              : lang === "tr"
                ? "Istatistikler"
                : "Statistics"}
          </span>
          <h2>
            {lang === "ar"
              ? "نظرة سريعة على بيانات الشركة"
              : lang === "tr"
                ? "Sirket verilerine hizli bakis"
                : "A Quick Look At Company Data"}
          </h2>
        </div>
        <div className="row clearfix">
          {statistics.map((item) => (
            <div
              key={item?._id}
              className="col-lg-3 col-md-6 col-sm-12 chooseus-block"
            >
              <div className="chooseus-block-three shadow-lg">
                <div
                  className="inner-box text-center"
                  style={{ minHeight: "220px" }}
                >
                  <h2>
                    {item?.value} {item?.suffix?.[lang] || item?.suffix?.en}
                  </h2>
                  <h3>{item?.title?.[lang] || item?.title?.en}</h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        item?.description?.[lang] ||
                        item?.description?.en ||
                        "",
                    }}
                  ></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
