import { useSelector } from "react-redux";
import { AppState } from "../store";

import { IOrder } from "../slice/orderSlice";
import axios from "axios";
import { response } from "express";
import { useCancelOrder } from "../services/orderService";

export const OrderCard = ({
  orderObj,
  // setState,
}: {
  orderObj: IOrder;
  // setState: React.Dispatch<React.SetStateAction<React.JSX.Element[]>>;
}) => {
  const auth = useSelector((state: AppState) => state.auth);
  const { mutateAsync: CancelOrder } = useCancelOrder();
  async function HandleCancel() {
    if (auth.User) {
      const id = auth.User._id;
      const orderId = orderObj._id;
      CancelOrder({ _id: id, OrderId: orderId });
    }
  }

  return (
    <div className="flex flex-row items-center justify-evenly rounded bg-gray-100 p-4 shadow">
      <img
        src={orderObj.Url}
        className="w-28 select-none sm:w-40"
        alt="cupcake"
      />
      <div className="flex flex-1 flex-col text-darker">
        <h1 className="font-raleway text-lg">{orderObj.Name}</h1>
        <h1 className="text-xs font-thin">{orderObj._id}</h1>
        <h1 className="font-raleway">Quantity: {orderObj.Quantity}</h1>
        <h1 className="font-raleway text-lg">
          Total Price: &#8369;{orderObj.Price}.00
        </h1>

        <h1 className="font-raleway">Date Ordered : {orderObj.DateOrdered}</h1>
        <button
          onClick={HandleCancel}
          className="mt-4 select-none self-end rounded bg-red-200 px-2 py-1 text-sm text-red-500 ring-red-500 active:ring"
        >
          Cancel Order
        </button>
      </div>
    </div>
  );
};
export default OrderCard;
