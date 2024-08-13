import { useContext, useEffect } from "react";
import { orderContext } from "./CartComponent";
import axios from "axios";

export default function CartCardComponent({ OrderObj }) {
  // const SetSelectedOrder = useContext(orderContext);
  function selectSelf() {
    // SetSelectedOrder(OrderObj);
  }

  const handleRemove = () => {
    console.log(OrderObj);
    axios
      .post("/melbake/mycart/remove/" + OrderObj._id, OrderObj)
      .then((response) => {
        if (response.status === 200) {
        }
        console.log(response);
      });
  };

  const handleCheckOut = () => {
    axios.post("/melbake/order/:id", { OrderObj }).then((response) => {
      console.log(response);
    });
  };
  return (
    <div
      className="group flex h-max w-full grid-cols-6 items-center justify-between gap-2 bg-gray-50 p-2 hover:border hover:bg-gray-100 md:px-4"
      onClick={selectSelf}
    >
      <div className="flex w-full max-w-md items-center justify-between">
        <div className="h-16 w-16">
          <img src={OrderObj.Url} alt="cupcake" />
        </div>

        <div>
          <h1 className="col-span-3 font-[Raleway] text-xs text-gray-700 sm:text-sm">
            {OrderObj.Name}
          </h1>
          <h1 className="col-span-3 font-[Raleway] text-xs text-gray-700 sm:text-sm">
            {OrderObj.Flavor}
          </h1>
        </div>

        <div className="">
          <h1 className="text-end font-[Raleway] text-xs text-gray-700">
            Quantity : {OrderObj.Quantity}
          </h1>
          {OrderObj.Price ? (
            <h1 className="text-end font-[Raleway] text-xs text-gray-700">
              Price : &#8369;{OrderObj.Price}.00
            </h1>
          ) : (
            <h1 className="text-end font-[Raleway] text-xs text-gray-700">
              Price : --.--
            </h1>
          )}
        </div>
      </div>
      <div className="hidden flex-col gap-1 group-hover:flex">
        <button
          className="w-full self-end bg-slate-500 px-2 py-1 text-xs text-white md:text-sm"
          onClick={handleCheckOut}
        >
          Check Out
        </button>
        <button
          className="w-full self-end bg-red-300 px-2 py-1 text-xs text-white md:text-sm"
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
