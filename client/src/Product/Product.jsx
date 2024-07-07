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
            console.log(cupcake.Url);
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

  return <>{cupcakesElement ? cupcakesElement : null}</>;
}
export default Product;
