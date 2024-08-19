import React, { useContext } from "react";
import { ViewProductContext, ProductIdContext } from "../app";

function ProductCard({ productObj }) {
  const ViewProduct = useContext(ViewProductContext);
  const productId = useContext(ProductIdContext);
  function onOpen() {
    ViewProduct(true);
    // once the card is click, Save the Id of that product to
    // context then if can be use later on the View product;
    productId(productObj._id);
    document.body.style.overflowY = "hidden";
  }

  return (
    <div
      className="group grid h-max min-h-max w-full min-w-48 grid-cols-10 grid-rows-1 flex-col items-center gap-4 rounded-xl bg-white p-2 shadow-[0px_5px_14px_0px_#0000004d] delay-150 duration-200 ease-in sm:flex sm:w-1/4 sm:p-4 sm:pb-8 md:w-1/5 lg:w-1/6"
      id="card"
      onClick={onOpen}
    >
      {productObj.Url ? (
        <>
          <div
            className="col-span-3 flex w-full justify-center rounded-md bg-slate-100 group-hover:bg-transparent"
            id="productImgContainer"
          >
            <img
              className="h-auto w-24 delay-150 duration-200 ease-in-out group-hover:scale-[1.05] sm:w-28 md:w-36 lg:w-96"
              id="productImg"
              src={productObj.Url}
              alt="cupcake"
            />
          </div>
        </>
      ) : (
        <div
          className="col-span-3 flex h-full w-full animate-pulse justify-center rounded-md bg-secondarylight group-hover:bg-transparent sm:min-h-32"
          id="productImgContainer"
        />
      )}
      <div
        className="col-span-7 flex h-full w-full flex-col"
        id="productDescription"
      >
        <h1
          className="text-left font-[Raleway] text-base text-primary lg:text-xl"
          id="productName"
        >
          {productObj.Name}
        </h1>
        <p
          className="text-left font-[Raleway] text-xs text-[Goldenrod] sm:text-sm lg:text-lg"
          id="productPrice"
        >
          &#8369; {productObj.Price}
        </p>
      </div>
    </div>
  );
}
export default ProductCard;
