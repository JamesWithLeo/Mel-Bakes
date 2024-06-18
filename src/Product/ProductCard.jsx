import React, { useContext } from 'react';
import './ProductCard.css'
import { ViewProductContext, ProductIndexContext } from '../app';


function ProductCard({productObj}) {
  const ViewProduct = useContext(ViewProductContext);
  const ProductIndex = useContext(ProductIndexContext);

  function onOpen(){
    ViewProduct(true);
    ProductIndex(productObj.id);
    document.body.style.overflowY = 'hidden';
  }

  return (
    <div id='card' onClick={onOpen}>
      <div id='productImgContainer'>
        <img id='productImg' src={productObj.image} alt='cupcake'/>
      </div>
      <div id='productDescription'>
        <h3 id='productName'>{productObj.name}</h3>
        <p id='productPrice'>&#8369; {productObj.price}	</p>
      </div>
    </div>
  );
}
export default ProductCard