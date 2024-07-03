import React, { useEffect, useState, useRef, useMemo } from "react";
import ccg1 from "../assets/images/ccG1.jpg";
import ccg2 from "../assets/images/ccG2.jpg";

import SlideShow from "./Slideshow";

function Gallary() {
  // let images = useMemo(() => {}, [ccg1, ccg2]);
  let images = [ccg1, ccg2];
  const [image, setImage] = useState(images[0]);
  let index = useRef(0);
  useEffect(() => {
    setTimeout(() => {
      if (index.current === images.length) {
        index.current = 0;
        setImage(images[index.current]);
        // console.log("RESET", index.current);
      } else {
        setImage(images[index.current]);
        index.current++;
        console.log("working here", index.current);
      }
      setImage(images[index.current]);
    }, 4000);
  }, [image, index]);
  return (
    <div id="gallery" className="w-11/12 bg-white p-8 shadow-2xl">
      <SlideShow url={image} />
    </div>
  );
}
export default Gallary;
