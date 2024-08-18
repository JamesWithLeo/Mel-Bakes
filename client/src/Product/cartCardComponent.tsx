import axios from "axios";
import { IOrder } from "../slice/orderSlice";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import { useDeleteCart } from "../services/cartService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

export default function CartCardComponent({
  OrderObj,
  selectThis,
  unSelectThis,
}: {
  OrderObj: IOrder;
  selectThis: (item: IOrder) => void;
  unSelectThis: (item: IOrder) => void;
}) {
  const user = useSelector((state: AppState) => state.auth.User);

  const { mutateAsync: DeleteCart, isPending: isDeletingCart } =
    useDeleteCart();
  const handleRemove = async () => {
    if (!isDeletingCart) DeleteCart(OrderObj._id);
  };

  const HandleCheckOut = async () => {
    if (!user) return;
    OrderObj.U_id = user._id;
    OrderObj.Amount = OrderObj.Quantity * OrderObj.Price;
    OrderObj.DateOrdered = new Date().toLocaleString();
    await axios.post("/order/checkout", OrderObj).then(async (response) => {
      console.log(response);
      if (response.data.acknowledged) {
        DeleteCart(OrderObj._id);
      }
    });
  };

  return (
    <div className="group flex h-max w-full grid-cols-6 items-center justify-between gap-2 border border-transparent px-2 hover:border-gray-300 md:px-4">
      <div className="flex w-full max-w-md items-center justify-between">
        <input
          type="checkbox"
          onClick={(e) => {
            if (e.currentTarget.checked) {
              selectThis(OrderObj);
            } else {
              unSelectThis(OrderObj);
            }
          }}
        />
        {OrderObj.Url ? (
          <img src={OrderObj.Url} alt="cupcake" className="h-16 w-16" />
        ) : (
          <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded bg-slate-100 text-xl text-primarylight">
            <FontAwesomeIcon icon={faImage} />
          </div>
        )}

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
          onClick={HandleCheckOut}
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
