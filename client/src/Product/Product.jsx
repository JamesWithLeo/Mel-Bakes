import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
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
          let indexId;
          const element = value.map((cupcake) => {
            indexId++;
            return (
              <>
                <ProductCard key={indexId} productObj={cupcake} />
              </>
            );
          });
          setCupcakesElement(element);
        })
        .catch((value) => {
          console.log("error, can't fetch cupcakes", value);
        });
    }
    fetchCupcakes();
  }, []);

  return (
    <>
      {cupcakesElement.length ? (
        <div
          id="productContainer"
          className="row-span-2 flex flex-row flex-wrap justify-center gap-4 sm:gap-5 md:gap-6"
        >
          {cupcakesElement}
        </div>
      ) : (
        <div
          id="productContainer"
          className="row-span-2 flex flex-col flex-wrap items-center justify-center gap-4 sm:gap-5 md:gap-6"
        >
          <FontAwesomeIcon
            icon={faCircleNotch}
            className="ml-2 animate-spin text-3xl text-secondarylight"
          />
          <h1 className="text-middle font-[Redhat] text-secondarylight">
            Looking for baked cupcakes
          </h1>
        </div>
      )}
    </>
  );
}
export default Product;
