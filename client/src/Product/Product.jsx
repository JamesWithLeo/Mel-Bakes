// import cupcakes from "../data";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

function Product() {
  const [cupcakesElement, setCupcakesElement] = useState([]);

  async function fetchImage(id) {
    let obj;
    const destinationUrl = "melbake/cupcake/" + id;
    const response = await fetch(destinationUrl);
    return await response.json().then((cupcakeJsonObj) => {
      obj = JSON.parse(cupcakeJsonObj);
      // console.log(obj.Url);
      return obj;
    });
  }

  useEffect(() => {
    async function fetchCupcakes() {
      const response = await fetch("melbake");
      await response
        .json()
        .then((value) => {
          // console.log(typeof value);
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

  return <>{cupcakesElement ? cupcakesElement : null}</>;
}
export default Product;
