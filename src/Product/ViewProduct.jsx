import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPlus, faMinus  } from "@fortawesome/free-solid-svg-icons";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

function ViewProduct({setDisplay, productIndex, setProductIndex ,ProductsObj}){
  
  const exitViewProduct = () => {
    setDisplay(false);
    document.body.style.overflowY = 'scroll';
  }
  
  // const moveToPrevious = ()=> {setProductIndex(productIndex++)}
  // const moveToNext = () => {setProductIndex(productIndex++)}

  return (
  <>
    <div className='w-full h-svh z-10 fixed bg-[#393664] opacity-90 flex justify-center items-center'  
      id="ViewProduct__OutsideWrapper"></div>

    <PanelGroup className="fixed bg-transparent flex flex-col justify-end z-10 bottom-0 sm:bottom-auto inset-x-0 mx-auto max-w-7xl" >
      
      <Panel className='bg-transparent h-full' onClick={exitViewProduct} defaultSize={25}></Panel>
      <PanelResizeHandle className='bg-gray-100 w-full h-4 self-center rounded'/>

      <Panel className='bg-none flex justify-center' defaultSize={75}>
        <div className="bg-white h-full flex flex-col justify-start z-10 inset-x-0 mx-auto max-w-7xl" id="ViewProduct__wrapper">
          <button className='text-gray-300 w-max self-end m-1' onClick={exitViewProduct}>
            <FontAwesomeIcon icon={faXmark} id="exitViewProductIcon" />
          </button>
              
          <div className='flex flex-col' 
            id="productDetailsWrapper">
            <div className='flex flex-row bg-transparent' 
              id="productProfile">
              <div className="h-full flex flex-col items-center w-1/2" 
                id="cupcakeImgWrapper">
                <img className="w-auto h-32 md:h-52 lg:h-72"
                  src={ProductsObj[productIndex].image} alt="cupcake" id="productImgView"/>
                <div className="bg-white p-2 rounded">
                  <h3 id="productName">{ProductsObj[productIndex].name}</h3>
                  <p id="productPrice">{ProductsObj[productIndex].price}</p>
                </div>
              </div>
              <div className="w-1/2 bg-white rounded p-2">
                <p className="text-xs">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur placeat iusto harum odit ipsam fugiat! Voluptatum corrupti provident commodi. Vel, facilis officia? Mollitia ratione in repellendus quisquam dolor vero veritatis?
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-around  gap-4 bg-transparent" 
              id="cartNav">
              <div className="flex align-middle gap-4 ">
                <label id="quantityLabel">Quantity</label>
                <div className="grid grid-cols-3 grid-rows-1 gap-1 h-max w-max align-middle justify-center items-center"
                  id="quantityWrapper">
                  <FontAwesomeIcon icon={faMinus} className="quantityBttn" id="minusQuantity"/>
                  <p id="quantityIndicator">3</p>
                  <FontAwesomeIcon icon={faPlus} className="quantityBttn" id="plusQuantity" />
                </div>
              </div>
              <button className="text-xs sm:text-sm md:text-base h-8 bg-[#f4eeff]" 
                id="addToCartButton">Add to Cart</button>
              <button className="text-xs sm:text-sm md:text-base h-8 bg-[#f4eeff]" 
                id="chechOutButton">Buy Now</button>
            </div>
            
          </div>
        </div>
      </Panel>
    </PanelGroup>

  </>
)}

export default ViewProduct;