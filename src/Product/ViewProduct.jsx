import React from "react";
import './ViewProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark  } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Styled/Styled";

function ViewProduct({setDisplay, productIndex, setProductIndex ,ProductsObj}){
  
  const exitViewProduct = () => {
    setDisplay(false);
    document.body.style.overflowY = 'scroll';
  }
  
  const moveToPrevious = ()=> {setProductIndex(productIndex++)}
  const moveToNext = () => {setProductIndex(productIndex++)}

  return (
  <>
    <div id="ViewProduct__OutsideWrapper" 
        onClick={exitViewProduct}>

    </div>
    <div id="ViewProduct__wrapper">
      <FontAwesomeIcon icon={faXmark} id="exitViewProductIcon" 
        onClick={exitViewProduct}
      />
      <h1>{ProductsObj[productIndex].name}</h1>
      <img src={ProductsObj[productIndex].image} alt="cupcake"/>
      <h2>{ProductsObj[productIndex].price}</h2>
      <Button onClick={moveToPrevious}>Prev</Button>
      <Button onClick={moveToNext}>next</Button>
    </div>
  </>
)}

export default ViewProduct;