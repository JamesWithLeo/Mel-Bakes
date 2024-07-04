import { useState } from "react";

function AddProduct({ setVisibility }) {
  const [result, setResult] = useState("Pending");

  // send document to the Api
  async function writeProduct(objBody) {
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

  const handleAddProduct = (event) => {
    // get the values,
    // then create object, keys will match in the database;
    const name = document.getElementById("nameTB").value;
    const price = document.getElementById("priceTB").value;
    const flavor = document.getElementById("flavorTB").value;
    const description = document.getElementById("descriptionTB").value;
    const itemQuantity = document.getElementById("itemQuantityTB").value;
    const publicId = document.getElementById("publicIdTB").value;

    const body = JSON.stringify({
      Name: name,
      Price: price,
      Flavor: flavor,
      Description: description,
      Quantity: itemQuantity,
      PublicId: publicId,
      Url: "",
    });
    console.log(body.Price);
    writeProduct(body);
  };

  const handleClear = (event) => {
    // clear the input box for later use .
    document.getElementById("nameTB").value = null;
    document.getElementById("priceTB").value = null;
    document.getElementById("flavorTB").value = null;
    document.getElementById("descriptionTB").value = null;
    document.getElementById("itemQuantityTB").value = null;
    document.getElementById("publicIdTB").value = null;
  };

  return (
    <div className="flex h-full max-h-full w-full flex-col bg-white">
      <div className="flex justify-between p-4">
        <h1 className="text-primary">Add/Edit Product</h1>
        <h1 className="text-primary">{result}</h1>
      </div>
      {/* grid grid-cols-2 gap-2 p-4 */}
      <div className="flex flex-col justify-evenly gap-4 sm:flex-row sm:py-8">
        <div className="flex flex-col rounded p-4 sm:grid sm:w-1/2 sm:grid-cols-3 sm:gap-4">
          <h1 className="text-primary">Name</h1>
          <input
            id="nameTB"
            className="col-span-2 mb-2 h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:mb-0 sm:w-full"
          />
          <h1 className="text-primary">Price</h1>
          <input
            id="priceTB"
            className="col-span-2 mb-2 h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:mb-0 sm:w-full"
          />
          <h1 className="text-primary">Flavor</h1>
          <input
            id="flavorTB"
            className="col-span-2 mb-2 h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:mb-0 sm:w-full"
          />
          <h1 className="text-primary">Description</h1>
          <input
            id="descriptionTB"
            className="col-span-2 mb-2 h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:mb-0 sm:w-full"
          />
          <h1 className="text-primary">Item Quantity</h1>
          <input
            id="itemQuantityTB"
            className="col-span-2 mb-2 h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:mb-0 sm:w-full"
          />
          <h1 className="text-primary">Public Id</h1>
          <input
            id="publicIdTB"
            className="col-span-2 mb-2 h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:mb-0 sm:w-full"
          />
        </div>
        <div className="flex flex-col gap-2 p-4 sm:w-1/3">
          <button
            onClick={handleAddProduct}
            className="rounded bg-primary py-1 text-sm text-white"
          >
            Save
          </button>
          <button
            className="rounded border border-primary bg-white py-1 text-sm"
            onClick={() => {
              setVisibility(false);
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleClear}
            className="rounded bg-red-400 py-1 text-sm text-white"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
export default AddProduct;
