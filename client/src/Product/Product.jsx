// import cupcakes from "../data";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

function Product() {
  const [cupcakesElement, setCupcakesElement] = useState([]);

  useEffect(() => {
    async function fetchCupcakes() {
      const response = await fetch("melbake");
      await response
        .json()
        .then((value) => {
          const element = value.map((cupcake) => {
            return (
              <>
                <ProductCard key={crypto.randomUUID()} productObj={cupcake} />
              </>
            );
          });
          setCupcakesElement(element);
        })
        .catch((value) => {
          console.log("error", value);
        });
    }
    fetchCupcakes();
  }, []);

  return (
    <>
      {cupcakesElement ? (
        <div
          id="productContainer"
          className="row-span-2 flex flex-row flex-wrap justify-center gap-4 sm:gap-5 md:gap-6"
        >
          {cupcakesElement}
        </div>
      ) : null}
    </>
  );
}
export default Product;
