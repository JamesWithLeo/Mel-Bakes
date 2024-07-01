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
          const element = value.map((cupcake) => {
            // fetchImage(cupcake._id).then((val) => {
            //   // console.log(val);
            //   // cupcake.Url = val;
            //   console.log(cupcake);
            // });
            return (
              <>
                <ProductCard productObj={cupcake} key={crypto.randomUUID()} />
              </>
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
