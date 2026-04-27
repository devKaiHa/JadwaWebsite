"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import BackToTop from "../elements/BackToTop";
import Breadcrumb from "./Breadcrumb";
import Header from "./header/Header";
import CustomFooter from "./footer/CustomFooter";
import MobileMenu from "./MobileMenu";
import baseURL from "@/api/GlobalData";
import { fetchJSON } from "@/GlobalHooks/GlobalHooks";
import {
  getPageBanners,
  pagePathToBannerKey,
  resolvePageBanner,
} from "@/lib/pageBanner";

export default function Layout({
  breadcrumbTitle,
  image,
  pageBannerKey,
  children,
  wrapperCls,
  sticky,
}) {
  const router = useRouter();
  const [scroll, setScroll] = useState(false);
  const [isMobileMenu, setMobileMenu] = useState(false);
  const [footerData, setFooterData] = useState(null);
  const [pageBanners, setPageBanners] = useState({});

  const resolvedPageBannerKey = useMemo(
    () => pageBannerKey || pagePathToBannerKey(router?.pathname || ""),
    [pageBannerKey, router?.pathname],
  );

  const breadcrumbImage = useMemo(
    () => resolvePageBanner(resolvedPageBannerKey, pageBanners, image),
    [resolvedPageBannerKey, pageBanners, image],
  );

  const handleMobileMenu = () => {
    setMobileMenu((prev) => {
      const next = !prev;

      if (typeof document !== "undefined") {
        if (next) {
          document.body.classList.add("mobile-menu-visible");
        } else {
          document.body.classList.remove("mobile-menu-visible");
        }
      }

      return next;
    });
  };

  useEffect(() => {
    const onScroll = () => {
      setScroll(window.scrollY > 100);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.body.classList.remove("mobile-menu-visible");
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    fetchJSON(`${baseURL}footer`)
      .then((payload) => {
        if (mounted) setFooterData(payload?.data || null);
      })
      .catch(() => {
        if (mounted) setFooterData(null);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!breadcrumbTitle) return undefined;

    let mounted = true;

    getPageBanners().then((banners) => {
      if (mounted) setPageBanners(banners);
    });

    return () => {
      mounted = false;
    };
  }, [breadcrumbTitle]);

  return (
    <>
      <div className={`boxed_wrapper ${wrapperCls || ""}`} id="top">
        <Header
          scroll={scroll}
          handleMobileMenu={handleMobileMenu}
          sticky={sticky}
          footerData={footerData}
        />

        <MobileMenu
          handleMobileMenu={handleMobileMenu}
          isMobileMenu={isMobileMenu}
          footerData={footerData}
        />

        {breadcrumbTitle && (
          <Breadcrumb breadcrumbTitle={breadcrumbTitle} img={breadcrumbImage} />
        )}

        {children}
        <CustomFooter />
      </div>

      <BackToTop scroll={scroll} />
    </>
  );
}
