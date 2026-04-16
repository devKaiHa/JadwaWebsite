import Layout from "./layout";
import "../i18n";
import "./global.css";
import "../components/layout/header/Header.css";
import "../components/layout/footer/footer.css";
import "../pages/about/about-us.css";
import "./blog-2/blogs.css";
import "../pages/blog-details/blog-details.css";
import "../pages/Contact-us/contact-us.css";
import "../pages/investments/investment.css";
import "../pages/fund-details/fund_details.css";
import "../pages/company-details/company-details.css";
import "./utils.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
