// import cupcakes from "../data";
import ProductCard from "./ProductCard";
import { useEffect, useState, useRef } from "react";

function Product() {
  // // const [cupcakes, setCupcakes] = useState([]);
  // // const ref = useRef();
  const [cupcakesElement, setCupcakesElement] = useState([]);
  useEffect(() => {
    async function fetchCupcakes() {
      const response = await fetch("melbake");
      await response
        .json()
        .then((value) => {
          console.log(value, "here");
          const element = value.map((cupcake) => {
            return (
              <ProductCard productObj={cupcake} key={crypto.randomUUID()} />
            );
          });
          setCupcakesElement(element);
        })
        .catch((value) => {
          console.log(value, "error");
        });
    }
    fetchCupcakes();
  }, []);

  // const cupcakesElement = cupcakes.map((cupcake) => {
  //   if (cupcake.isAvailable === true) {
  //     return <ProductCard productObj={cupcake} key={crypto.randomUUID()} />;
  //   } else {
  //     return null;
  //   }
  // });

  return <>{cupcakesElement}</>;
}
export default Product;
