import React from "react";
import './ViewProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus, faMinus  } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Styled/Styled";

function ViewProduct({setDisplay, productIndex, setProductIndex ,ProductsObj}){
  
  const exitViewProduct = () => {
    setDisplay(false);
    document.body.style.overflowY = 'scroll';
  }
  
  // const moveToPrevious = ()=> {setProductIndex(productIndex++)}
  // const moveToNext = () => {setProductIndex(productIndex++)}

  return (
  <>
    <div id="ViewProduct__OutsideWrapper" 
        onClick={exitViewProduct}>

    </div>
    <div id="ViewProduct__wrapper">
      <FontAwesomeIcon icon={faXmark} id="exitViewProductIcon" 
          onClick={exitViewProduct}
        />
      <div id="productDetailsWrapper">
        <div id="productProfile">
          <div id="cupcakeImgWrapper">
            <img src={ProductsObj[productIndex].image} alt="cupcake" id="productImgView"/>
          </div>
          <div>
            <h3 id="productName">{ProductsObj[productIndex].name}</h3>
            <p id="productPrice">{ProductsObj[productIndex].price}</p>
          </div>
          <div>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur placeat iusto harum odit ipsam fugiat! Voluptatum corrupti provident commodi. Vel, facilis officia? Mollitia ratione in repellendus quisquam dolor vero veritatis?
            </p>
          </div>
        </div>

        <div id="cartNav">
          <div id="quantityWrapper_outside">
            <label id="quantityLabel">Quantity</label>
            <div id="quantityWrapper">
              <FontAwesomeIcon icon={faMinus} className="quantityBttn" id="minusQuantity"/>
              <p id="quantityIndicator">3</p>
              <FontAwesomeIcon icon={faPlus} className="quantityBttn" id="plusQuantity" />
            </div>
          </div>
          <button id="addToCartButton">Add to Cart</button>
          <button id="chechOutButton">Buy Now</button>
        </div>
        
      </div>
    </div>
  </>
)}

export default ViewProduct;