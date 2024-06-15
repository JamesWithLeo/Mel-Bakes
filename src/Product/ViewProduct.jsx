import React from "react";
import './ViewProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark  } from "@fortawesome/free-solid-svg-icons";

function ViewProduct({displayProp, setDisplay, productName, productPrice}){
  
  const exitViewProduct = () => {
    setDisplay(false)
    document.body.style.overflowY = 'scroll'
  }

  return (
  <>
    <div id="ViewProduct__OutsideWrapper" 
        onClick={exitViewProduct}>

    </div>
    <div id="ViewProduct__wrapper">
      <FontAwesomeIcon icon={faXmark} id="exitViewProductIcon" 
        onClick={exitViewProduct}
      />
    </div>
  </>
)}

export default ViewProduct;