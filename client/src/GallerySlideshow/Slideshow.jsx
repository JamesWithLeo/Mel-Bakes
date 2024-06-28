import ccg1 from "../assets/images/ccG1.jpg";
import ccg2 from "../assets/images/ccG2.jpg";

function SlideShow() {
  const ImgSlides = [{ url: ccg1 }, { url: ccg2 }];

  return (
    <>
      <img
        src={ImgSlides[0].url}
        alt="gallery of cupcake"
        className="imgInGallery"
        height="100%"
        width="100%"
      />
    </>
  );
}
export default SlideShow;
