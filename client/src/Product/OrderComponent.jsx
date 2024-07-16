import { useContext } from "react";
import { orderContext } from "./CartComponent";

export default function OrderComponent({ OrderObj }) {
  const SetSelectedOrder = useContext(orderContext);
  function selectSelf() {
    SetSelectedOrder(OrderObj);
  }

  return (
    <button
      className="md:px-412 group flex h-max w-full items-center justify-between bg-gray-200 p-2 after:bg-secondarylight hover:bg-secondarylight focus:bg-secondarylight"
      onClick={selectSelf}
    >
      <h1 className="font-[Raleway] text-xs text-gray-700 sm:text-sm">
        {OrderObj.Cupcake}
      </h1>
      {/* <div> */}
      {/* <h1 className="text-xs text-gray-700">Cupcake id : {OrderObj.C_id}</h1> */}
      {/* <h1 className="text-xs">Order id : {OrderObj.OrderId}</h1> */}
      {/* </div> */}
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
    </button>
  );
}
