import * as React from "react";
import { useState } from "react";
import { IProduct } from "../slice/orderSlice";
import ProductTable from "./productTable";
import { useLayoutEffect } from "react";
import axios from "axios";
function AddProduct() {
  const [result, setResult] = useState("Pending");
  const [products, SetProducts] = useState<IProduct[]>([]);

  // send document to the Api
  async function writeProduct(objBody: BodyInit) {
    await fetch("/melbake/admin/product/append/", {
      method: "POST",
      body: objBody,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      response.json().then((value) => {
        // console.log(value);
        setResult(value.result);
        setTimeout(() => {
          setResult("Pending");
        }, 3000);
      });
    });
  }

  const handleAddProduct = (event: React.MouseEvent<HTMLButtonElement>) => {
    // get the values,
    // then create object, keys will match in the database;
    const name = document.getElementById("nameTB") as HTMLInputElement;
    const price = document.getElementById("priceTB") as HTMLInputElement;
    const flavor = document.getElementById("flavorTB") as HTMLInputElement;
    const description = document.getElementById(
      "descriptionTB",
    ) as HTMLInputElement;
    const itemQuantity = document.getElementById(
      "itemQuantityTB",
    ) as HTMLInputElement;
    const publicId = document.getElementById("publicIdTB") as HTMLInputElement;

    const body = JSON.stringify({
      Name: name.value,
      Price: price.value,
      Flavor: flavor.value,
      Description: description.value,
      Quantity: itemQuantity.value,
      PublicId: publicId.value,
      Url: "",
    });
    writeProduct(body);
  };

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    // clear the input box for later use .
    document.getElementById("nameTB") as HTMLInputElement;
    document.getElementById("priceTB") as HTMLInputElement;
    document.getElementById("flavorTB") as HTMLInputElement;
    document.getElementById("descriptionTB") as HTMLInputElement;
    document.getElementById("itemQuantityTB") as HTMLInputElement;
    document.getElementById("publicIdTB") as HTMLInputElement;
  };
  useLayoutEffect(() => {
    axios.get("/melbake/cupcakes").then((value) => {
      SetProducts(value.data);
    });
  }, []);
  return (
    <div className="flex w-full flex-col bg-white">
      {products ? <ProductTable data={products} /> : null}
    </div>
  );
}
export default AddProduct;
