import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faPlus,
  faMinus,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

function ViewProduct({
  setDisplay,
  productIndex,
  setProductIndex,
  ProductsObj,
}) {
  const exitViewProduct = () => {
    setDisplay(false);
    document.body.style.overflowY = "scroll";
  };
  const flavors = ProductsObj[productIndex].flavors.map((flavor) => {
    return (
      <h1 className="w-max rounded bg-gray-400 px-1 py-0 text-xs text-white sm:px-2 sm:py-1 sm:text-sm md:px-3">
        {flavor}
      </h1>
    );
  });
  return (
    <>
      <div
        className="fixed z-10 flex h-svh w-full items-center justify-center bg-[#393664] opacity-70"
        id="ViewProduct__OutsideWrapper"
      ></div>

      <PanelGroup className="fixed inset-x-0 bottom-0 z-10 mx-auto flex w-full flex-col bg-transparent sm:bottom-auto">
        <Panel
          className="h-full bg-transparent"
          onClick={exitViewProduct}
          defaultSize={25}
        ></Panel>
        <PanelResizeHandle className="h-4 w-full self-center rounded bg-gray-100" />

        <Panel
          className="flex flex-col items-center justify-between bg-white lg:justify-around"
          defaultSize={75}
        >
          <div className="flex w-full max-w-7xl flex-col">
            <button
              className="m-1 w-max self-end text-gray-300"
              onClick={exitViewProduct}
            >
              <FontAwesomeIcon icon={faXmark} id="exitViewProductIcon" />
            </button>
          </div>
          <div
            className="inset-x-0 z-10 mx-auto flex h-full max-w-7xl flex-col justify-end overflow-y-scroll md:justify-center lg:rounded"
            id="ViewProduct__wrapper"
          >
            <div
              className="flex flex-col md:flex-row"
              id="productDetailsWrapper"
            >
              <div
                className="flex flex-col bg-transparent sm:flex-col md:w-1/2"
                id="productProfile"
              >
                <div className="ml-4 flex h-max w-max justify-center gap-4 rounded-md px-2 py-2 md:flex-col">
                  {flavors}
                </div>
                <div
                  className="flex h-full w-full flex-col items-center"
                  id="cupcakeImgWrapper"
                >
                  <img
                    className="h-auto w-40 sm:w-64 md:w-80 lg:w-96"
                    src={ProductsObj[productIndex].image}
                    alt="cupcake"
                    id="productImgView"
                  />
                </div>
              </div>

              <div
                className="flex flex-col justify-center gap-1 md:w-1/2 md:gap-4"
                id="cartNav"
              >
                <div className="flex flex-col items-center rounded bg-white px-2">
                  <h1
                    className="text-center font-[Raleway] text-xl font-medium text-primary md:text-2xl lg:text-3xl"
                    id="ProductName"
                  >
                    {ProductsObj[productIndex].name}
                  </h1>
                  <p
                    className="items-center text-center font-[Raleway] text-sm text-[Goldenrod] md:text-2xl"
                    id="ProductPrice"
                  >
                    {ProductsObj[productIndex].price}
                  </p>
                </div>
                <div className="flex w-full justify-center rounded bg-white px-2">
                  <p className="text-justify text-xs">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Tenetur placeat iusto harum odit ipsam fugiat! Voluptatum
                    corrupti provident commodi. Vel, facilis officia? Mollitia
                    ratione in repellendus quisquam dolor vero veritatis?
                  </p>
                </div>
                <div className="flex w-full justify-center gap-4 px-2 align-middle">
                  <button>
                    <FontAwesomeIcon
                      id="hearIcon"
                      icon={faHeart}
                      className="text-gray-400 first-letter:text-sm"
                    />
                  </button>
                  <label
                    className="items-center text-center text-sm"
                    id="quantityLabel"
                  >
                    Quantity
                  </label>
                  <div
                    className="grid h-max w-max grid-cols-3 grid-rows-1 items-center justify-center gap-1 rounded border-2 border-gray-400 px-2 align-middle"
                    id="quantityWrapper"
                  >
                    <FontAwesomeIcon
                      className="text-gray-400 first-letter:text-sm"
                      icon={faMinus}
                      id="minusQuantity"
                    />
                    <p
                      className="text-center text-xs text-gray-400"
                      id="quantityIndicator"
                    >
                      3
                    </p>
                    <FontAwesomeIcon
                      className="text-sm text-gray-400"
                      icon={faPlus}
                      id="plusQuantity"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2 p-2 md:p-0">
                  <button
                    className="bg-secondarylight h-8 w-full text-xs text-primary sm:text-sm md:w-1/2 md:text-base"
                    id="addToCartButton"
                  >
                    Add to Cart
                  </button>
                  <button
                    className="h-8 w-full bg-primary text-xs text-white sm:text-sm md:w-1/2 md:text-base"
                    id="chechOutButton"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </>
  );
}

export default ViewProduct;
