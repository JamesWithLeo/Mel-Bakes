import React from 'react';
import './ProductCard.css'

function ProductCard({ProductName, ProductImg, ProductPrice, ProductSelected,}) {

  
  function onOpen(){
    ProductSelected(true)
    document.body.style.overflowY = 'hidden'
  }
  return (
    <div id='card' onClick={onOpen}>
      <div id='productImgContainer'>
        <img id='productImg' src={ProductImg} alt='cupcake'/>
      </div>
      <div id='productDescription'>
        <h3 id='productName'>{ProductName}</h3>
        <p id='productPrice'>&#8369; {ProductPrice}	</p>
      </div>
    </div>
  );
}
export default ProductCard