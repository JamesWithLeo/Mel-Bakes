import React from "react";
import ccg1 from '../assets/images/ccG1.jpg';
import ccg2 from '../assets/images/ccG2.jpg'; 

import './GalleryAsGuest.css';
function Gallary(){
  return (
    <div id="gallery">
        <img src={ccg1} alt="gallery of cupcake" className="imgInGallery" 
        height='100%' width='100%'/>
{/* 
        <img src={ccg2} alt="gallery of cupcake" className="imgInGallery" 
        height='100%' width='100%'/> */}
    </div>
  )
};
export default Gallary;