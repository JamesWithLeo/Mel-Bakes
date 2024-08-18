import React, { useEffect, useState, useRef } from "react";
import ccg1 from "../assets/images/ccG1.jpg";
import ccg2 from "../assets/images/ccG2.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Gallary() {
  var settings = {
    dots: false,
    fade: true,
    infinite: true,
    centerMode: true,
    arrows: false,
    speed: 2000,
    slidesToShow: 1,
    autoplay: true,
    adaptiveHeight: true,
    autoplaySpeed: 2000,
    slidesToScroll: 1,
  };
  return (
    <div
      id="gallery"
      className="-z-0 h-max w-80 rounded bg-white py-10 shadow-2xl drop-shadow sm:w-96 lg:w-[30rem]"
    >
      <Slider {...settings} className="">
        <div className="h-full">
          <img
            src={ccg1}
            alt="cupcake"
            className="h-auto w-full overflow-hidden"
          />
        </div>

        <div className="h-full w-full">
          <img
            src={ccg2}
            alt="cupcake"
            className="h-auto w-full overflow-hidden"
          />
        </div>
      </Slider>
    </div>
  );
}
export default Gallary;
