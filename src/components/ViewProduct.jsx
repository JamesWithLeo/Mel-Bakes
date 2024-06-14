import React from "react";
import './ViewProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark  } from "@fortawesome/free-solid-svg-icons";

function ViewProduct({displayProp, setDisplay}){
  return (
  <div id="ViewProduct__wrapper">
    <FontAwesomeIcon icon={faXmark} id="exitViewProductIcon" onClick={()=> setDisplay(false)}/>
  </div>
)}

export default ViewProduct;