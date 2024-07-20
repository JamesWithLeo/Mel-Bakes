import { useContext, useEffect } from "react";
import { orderContext } from "./CartComponent";

export default function OrderComponent({ OrderObj }) {
  const SetSelectedOrder = useContext(orderContext);
  function selectSelf() {
    SetSelectedOrder(OrderObj);
  }
  return (
    <div
      className="group grid h-max w-full grid-cols-6 items-center justify-between bg-gray-50 p-2 hover:border hover:bg-gray-100 md:px-4"
      onClick={selectSelf}
    >
      <div className="h-16 w-16 bg-slate-400"></div>
      <h1 className="col-span-3 font-[Raleway] text-xs text-gray-700 sm:text-sm">
        {OrderObj.Cupcake}
      </h1>
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
  );
}
