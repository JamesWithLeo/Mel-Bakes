import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";

import { IOrder, orderSliceReducer } from "../slice/orderSlice";
import { memo } from "react";

export const OrderCard = ({
  orderObj,
  setState,
}: {
  orderObj: IOrder;
  setState: React.Dispatch<React.SetStateAction<React.JSX.Element[]>>;
}) => {
  const orderState = useSelector((state: AppState) => state.order);
  const auth = useSelector((state: AppState) => state.auth);
  const dispatch = useDispatch();

  async function cancelOrder() {
    if (auth.User) {
      const id = auth.User._id;
      const orderToRemove = JSON.stringify(orderObj);

      await fetch("/melbake/order/remove/" + id, {
        method: "POST",
        body: orderToRemove,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then(async (response) => {
        await response.json().then((value) => {
          console.log(value);
        });
      });
    }
  }

  return (
    <div className="rounded bg-gray-100 p-2">
      <h1>{orderObj.Name}</h1>
      <h1>{orderObj._id}</h1>
      <img src={orderObj.Url} className="w-24" alt="cupcake" />
      <h1>Quantity: {orderObj.Quantity}</h1>
      <h1>Total Price: {orderObj.Price}</h1>
      <button
        onClick={cancelOrder}
        className="rounded bg-red-200 px-2 py-1 text-sm text-red-500"
      >
        Cancel Order
      </button>
      <div className="flex items-center gap-2">
        <h1 className="text-sm text-gray-600"> Recieved order confirmation</h1>
        <button className="rounded bg-primary px-2 py-1 text-sm text-white">
          Confirm
        </button>
      </div>
    </div>
  );
};
export default OrderCard;
