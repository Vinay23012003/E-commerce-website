import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slide = () => {
  const slides = [
    {
      src: "/images/1.webp",
      label: "First Slide Label",
      text: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
    },
    {
      src: "/images/2.webp",
      label: "Second Slide Label",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      src: "/images/3.webp",
      label: "Third Slide Label",
      text: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    },
    {
      src: "/images/5.webp",
      label: "Fourth Slide Label",
      text: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    },
  ];

  return (
    <div className="w-full mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="rounded-lg shadow-lg m-1 "
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <img
                src={slide.src}
                alt={slide.label}
                className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-lg"
              />
              <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-center bg-black/60 text-white p-4 rounded-lg shadow-lg w-3/4">
                <h3 className="text-2xl md:text-3xl font-bold">{slide.label}</h3>
                <p className="text-lg md:text-xl">{slide.text}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slide;
