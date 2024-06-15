import React from "react";
import './ViewProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark  } from "@fortawesome/free-solid-svg-icons";

function ViewProduct({displayProp, setDisplay, productName, productPrice}){
  
  return (
  <>
    <div id="ViewProduct__OutsideWrapper">

    </div>
    <div id="ViewProduct__wrapper">
      <FontAwesomeIcon icon={faXmark} id="exitViewProductIcon" 
        onClick={ () =>  {
          setDisplay(false)
          document.body.style.overflowY = 'scroll'
        }
        }
      />
    </div>
  </>
)}

export default ViewProduct;