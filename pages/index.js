import Layout from "@/components/layout/Layout";
import Banner from "@/components/sections/home1/Banner";
import About from "@/components/sections/home3/About";
import Sectors from "@/components/sections/home1/Sectors";
import Statistics from "@/components/sections/home3/Statistics";
import Services from "@/components/sections/home3/Services";
import News from "@/components/sections/home2/News";
import Project from "@/components/sections/home1/Project";
import Industries from "@/components/sections/home1/Industries";
import Partners from "@/components/sections/home2/Partners";
import Working from "@/components/sections/home2/Working";
import { getHomeData } from "@/api/getHomeData";

export async function getStaticProps() {
  try {
    const data = await getHomeData();
    return { props: { data }, revalidate: 300 };
  } catch (err) {
    console.error("Home data error:", err);
    return { props: { data: {} }, revalidate: 300 };
  }
}

export default function Home({ data = {} }) {
  const {
    banners = [],
    about = {},
    services = [],
    sectors = [],
    news = [],
    projects = [],
    funds = [],
    statistics = [],
    partners = [],
    values = [],
    companies = [],
  } = data;

  return (
    <div className="homePage">
      <Layout>
        <Banner HomeSlides={banners} />
        <About aboutUs={about} />
        <Services services={services} />

        <Sectors values={values} />

        <Industries sectors={sectors} />

        <News news={news} />

        <Project projects={projects} companies={companies} />

        <Working funds={funds} />
        <Statistics statistics={statistics} />
        <Partners partners={partners} />
      </Layout>
    </div>
  );
}
