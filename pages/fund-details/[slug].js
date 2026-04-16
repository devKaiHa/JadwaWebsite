import Layout from "@/components/layout/Layout";
import LoadingCard from "@/components/utils/LoadingCard";
import FundHero from "@/components/pages/Funds/FundHero";
import FundOverviewSection from "@/components/pages/Funds/FundOverviewSection";
import FundAssociatedCompanies from "@/components/pages/Funds/FundAssociatedCompanies";
import { useTranslation } from "react-i18next";
import { getOtherData } from "@/api/getOtherData";

export default function FundDetailsPage({ fund }) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";

  if (!fund) return <LoadingCard />;

  const pageTitle =
    fund?.title?.[lang] || fund?.title?.en || t("InvestmentFunds");

  return (
    <Layout>
      <FundHero fund={fund} />
      <FundOverviewSection fund={fund} />
      <FundAssociatedCompanies fund={fund} />
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const { funds = [] } = await getOtherData();

    const paths = (Array.isArray(funds) ? funds : [])
      .filter((fund) => fund?.slug)
      .map((fund) => ({
        params: { slug: fund.slug },
      }));

    return {
      paths,
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
    const { funds = [] } = await getOtherData();

    const fund =
      (Array.isArray(funds) ? funds : []).find(
        (item) => item?.slug === params?.slug
      ) || null;

    if (!fund) {
      return {
        notFound: true,
        revalidate: 300,
      };
    }

    return {
      props: {
        fund,
      },
      revalidate: 300,
    };
  } catch (error) {
    return {
      notFound: true,
      revalidate: 300,
    };
  }
}
