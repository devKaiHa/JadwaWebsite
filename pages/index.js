import Layout from "@/components/layout/Layout";
import Banner from "@/components/sections/home1/Banner";
import About from "@/components/sections/home3/About";
// import Sectors from "@/components/sections/home1/Sectors";
import Statistics from "@/components/sections/home3/Statistics";
// import Services from "@/components/sections/home3/Services";
import News from "@/components/sections/home2/News";
// import Project from "@/components/sections/home1/Project";
// import Industries from "@/components/sections/home1/Industries";
// import Partners from "@/components/sections/home2/Partners";
import Working from "@/components/sections/home2/Working";
import { getHomeData } from "@/api/getHomeData";
import TestimonialSlider03 from "@/components/slider/TestimonialSlider03";
import { getOtherData } from "@/api/getOtherData";
import CompaniesBrief from "@/components/pages/AboutUs/CompaniesBrief";

export async function getStaticProps() {
  try {
    const data = await getHomeData();
    const otherData = await getOtherData();

    return {
      props: {
        data,
        otherData,
      },
      revalidate: 300,
    };
  } catch (err) {
    console.error("Home data error:", err);

    return {
      props: {
        data: {},
        otherData: {},
      },
      revalidate: 300,
    };
  }
}

export default function Home({ data = {}, otherData = {} }) {
  const {
    banners = [],
    about = {},
    news = [],
    funds = [],
    statistics = [],
    // partners = [],
  } = data;

  const { testimonials = [], companies = [] } = otherData;

  return (
    <div className="homePage">
      <Layout>
        <Banner HomeSlides={banners} />
        <About aboutUs={about} ishomePage={true} />
        <Statistics statistics={statistics} />
        <Working funds={funds} />

        <TestimonialSlider03 testimonials={testimonials} />

        <CompaniesBrief companies={companies} />

        <News news={news} />

        {/* <Project projects={projects} companies={companies} /> */}

        {/* <Partners partners={partners} /> */}
      </Layout>
    </div>
  );
}
