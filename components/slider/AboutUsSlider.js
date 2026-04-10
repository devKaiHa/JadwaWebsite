"use client";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 2,
  spaceBetween: 30,
  autoplay: { delay: 10000, disableOnInteraction: false },
  loop: true,
  navigation: { nextEl: ".h1n", prevEl: ".h1p" },
  pagination: { el: ".swiper-pagination", clickable: true },
  breakpoints: {
    320: { slidesPerView: 1 },
    575: { slidesPerView: 1 },
    767: { slidesPerView: 1 },
    991: { slidesPerView: 1 },
    1199: { slidesPerView: 1 },
    1350: { slidesPerView: 1 },
  },
};

export default function AboutUsSlider({ slides = [] }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  if (!slides.length) return null;

  return (
    <Swiper {...swiperOptions} className="theme_carousel owl-theme">
      {slides?.map((slide, idx) => (
        <SwiperSlide className="slide" key={idx}>
          <div className="inner-box">
            <div className="icon-box">
              <div className="icon">
                <i className="flaticon-knowledge" />
              </div>
              <span className="count-text">
                {String(idx + 1).padStart(2, "0")}
              </span>
            </div>
            <h3>{slide?.title?.[lang] || ""}</h3>
            <p dangerouslySetInnerHTML={{ __html: slide?.content?.[lang] }} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
