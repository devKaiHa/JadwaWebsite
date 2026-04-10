"use client";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { truncateText } from "@/GlobalHooks/GlobalHooks";
import { formatNumberSuff } from "@/components/utils/helpers";

export default function Working({ funds }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";

  if (!funds?.length) return null;

  return (
    <>
      <section className="working-style-two sec-pad">
        <div className="auto-container">
          <div className="sec-title centred">
            <span className="sub-title">
              {lang === "ar"
                ? "الصناديق الاستثمارية"
                : lang === "tr"
                  ? "Yatirim Fonlari"
                  : "Investment Funds"}
            </span>
            <h2>
              {lang === "ar"
                ? "الصناديق المتاحة من مصدر البيانات"
                : lang === "tr"
                  ? "Veri kaynagindaki mevcut fonlar"
                  : "Funds Available In The Data Source"}
            </h2>
          </div>
          <div className="inner-container">
            <div className="row clearfix">
              {funds?.map((item, index) => (
                <div
                  className="col-lg-4 col-md-6 col-sm-12 working-block"
                  key={index}
                >
                  <div className="working-block-two">
                    <div className="inner-box">
                      <div
                        className="upper-box centred"
                        style={{ height: "17em" }}
                      >
                        <span className="count-text">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="icon-box">
                          <h1
                            style={{ paddingTop: "30px" }}
                            className="fs-sm-custom-175"
                          >
                            {item?.title?.[lang] || item?.title?.en}
                          </h1>
                        </div>
                        <p
                          style={{
                            textAlign: "center",
                            fontSize: "20px",
                            lineHeight: "20px",
                          }}
                        >
                          {truncateText(
                            item?.shortAbout?.[lang] ||
                              item?.shortAbout?.en ||
                              item?.content?.[lang] ||
                              item?.content?.en,
                            110,
                          )}
                        </p>
                        <p
                          style={{ textAlign: "center" }}
                          className="invest_num fs-sm-custom-225"
                        >
                          {item?.assetsVolume
                            ? `${formatNumberSuff(item.assetsVolume)}${item?.irr ? ` | IRR ${item.irr}%` : ""}`
                            : item?.minInvestAmount
                              ? `${item.minInvestAmount}`
                              : ""}
                        </p>
                      </div>
                      <div className="lower-box mb-sm-custom-4">
                        <Link href={item?.fundLink || "/funds"}>
                          <span>{t("see_more")}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
