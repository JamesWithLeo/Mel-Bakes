import ccg3 from "../assets/images/ccg3.jpg";
import ccg1 from "../assets/images/ccG1.jpg";
import ccg2 from "../assets/images/ccG2.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Gallary() {
  var settings = {
    dots: false,
    infinite: true,
    centerMode: false,
    arrows: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    adaptiveHeight: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          centerMode: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div
      id="gallery"
      className="-z-0 h-max w-96 max-w-xs overflow-hidden rounded bg-white p-1 shadow-2xl drop-shadow sm:w-full sm:max-w-lg sm:rounded-lg sm:p-3 lg:w-[30rem]"
    >
      <Slider {...settings} className="">
        <img
          src={ccg1}
          alt="cupcake"
          className="h-auto w-full overflow-hidden"
        />

        <img
          src={ccg2}
          alt="cupcake"
          className="h-auto w-full overflow-hidden"
        />
        <img
          src={ccg3}
          alt="cupcake"
          className="h-auto w-full overflow-hidden"
        />
      </Slider>
    </div>
  );
}
export default Gallary;
