"use client";
import { useTranslation } from "react-i18next";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 2,
  spaceBetween: 30,
  loop: true,

  // Navigation
  navigation: {
    nextEl: ".h1n",
    prevEl: ".h1p",
  },

  // Pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      // spaceBetween: 30,
    },
    575: {
      slidesPerView: 1,
      // spaceBetween: 30,
    },
    767: {
      slidesPerView: 2,
      // spaceBetween: 30,
    },
    991: {
      slidesPerView: 3,
      // spaceBetween: 30,
    },
    1199: {
      slidesPerView: 3,
      // spaceBetween: 30,
    },
    1350: {
      slidesPerView: 3,
      // spaceBetween: 30,
    },
  },
};
export default function TestimonialSlider03({ testimonials }) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  return (
    <>
      <Swiper {...swiperOptions} className="theme_carousel owl-theme">
        {testimonials?.map((item, index) => {
          return (
            <SwiperSlide className="slide shadow m-3">
              <div className="chooseus-block-three">
                <div className="inner-box">
                  <span className="count-text">{index + 1}</span>
                  {[...Array(item?.rating || 5)].map((_, i) => (
                    <i
                      key={i}
                      className="fa-solid fa-star"
                      style={{
                        color: "#f5b301",
                        marginRight: "4px",
                        fontSize: "14px",
                      }}
                    />
                  ))}
                  <h4 className="mt-2">{item?.name}</h4>
                  <h6 style={{ color: "rgb(116, 116, 116)" }}>
                    {item?.role?.[lang]}
                  </h6>
                  <p className="mt-2">{item?.content?.[lang]}</p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
