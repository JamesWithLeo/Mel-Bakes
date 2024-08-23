import { useSelector } from "react-redux";
import { AppState } from "../store";

import { IOrder } from "../appTypes";
import { useCancelOrder } from "../services/orderService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

export const OrderCard = ({ orderObj }: { orderObj: IOrder }) => {
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
      <div className="flex flex-1 flex-col justify-center text-darker">
        <h1 className="font-raleway text-lg">{orderObj.Name}</h1>
        <span className="mb-2 flex gap-2 text-xs font-light text-gray-500">
          <h1
            className="cursor-copy"
            onClick={() => {
              navigator.clipboard.writeText(orderObj._id);
            }}
          >
            {orderObj._id}
          </h1>
          <button
            className="cursor-copy text-gray-400 active:text-gray-300"
            onClick={() => {
              navigator.clipboard.writeText(orderObj._id);
            }}
          >
            <FontAwesomeIcon icon={faCopy} />
          </button>
        </span>
        <h1 className="font-redhat text-sm">Quantity: {orderObj.Quantity}</h1>
        <h1 className="font-redhat text-sm">
          Total Price: &#8369;{orderObj.Amount}.00
        </h1>

        <h1 className="font-redhat text-sm">
          Date Ordered : {orderObj.DateOrdered}
        </h1>
        {orderObj.IsShipping ? (
          <h1 className="self-end rounded bg-white px-2 py-1 text-sm">
            Shipping
          </h1>
        ) : (
          <button
            onClick={HandleCancel}
            className="mt-4 select-none self-end rounded bg-red-200 px-2 py-1 text-sm text-red-500 ring-red-300 active:ring"
          >
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );
};
export default OrderCard;
