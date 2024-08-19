import axios from "axios";
import { IOrder, IProduct } from "../slice/orderSlice";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import { useDeleteCart } from "../services/cartService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useLayoutEffect, useState } from "react";

export default function CartCard({
  OrderObj,
  selectThis,
  unSelectThis,
  isVisibleCheckbox,
}: {
  OrderObj: IOrder;
  selectThis: (item: IOrder) => void;
  unSelectThis: (item: IOrder) => void;
  isVisibleCheckbox: boolean;
}) {
  const user = useSelector((state: AppState) => state.auth.User);
  const [cupcakeObj, setCupcakeObj] = useState<IProduct | null>(null);
  const [flavors, setFlavors] = useState<JSX.Element[]>([]);

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

  useLayoutEffect(() => {
    async function fetchCupcake() {
      const destinationUrl = "melbake/cupcake/" + OrderObj.C_id;
      const response = await fetch(destinationUrl);
      await response.json().then((value) => {
        const cupcake = value;
        setCupcakeObj(cupcake);

        const arrayFlavors = cupcake.Flavor.split(" ");
        const flavorElements = arrayFlavors.map((flavor: string) => {
          let cname;
          switch (flavor) {
            case "Strawberry":
              cname =
                "w-max rounded bg-pink-400 px-1 py-0 text-xs text-white sm:px-2 sm:py-1 sm:text-sm md:px-3";
              break;
            case "Cherry":
              cname =
                "w-max rounded bg-red-500 px-1 py-0 text-xs text-white sm:px-2 sm:py-1 sm:text-sm md:px-3";
              break;
            case "Chocolate":
              cname =
                "w-max rounded bg-stone-500 px-1 py-0 text-xs text-white sm:px-2 sm:py-1 sm:text-sm md:px-3";
              break;
            case "Coffee":
              cname =
                "w-max rounded bg-stone-700 px-1 py-0 text-xs text-white sm:px-2 sm:py-1 sm:text-sm md:px-3";
              break;
            default:
              cname =
                "w-max rounded bg-gray-400 px-1 py-0 text-xs text-white sm:px-2 sm:py-1 sm:text-sm md:px-3";
          }
          return (
            <h1 className={cname} key={crypto.randomUUID()}>
              {flavor}
            </h1>
          );
        });
        setFlavors(flavorElements);
      });
    }
    fetchCupcake();
  }, []);
  return (
    <div className="group flex h-max w-full items-center justify-between border border-transparent hover:border-gray-300 sm:gap-2 sm:px-2 md:px-4">
      <div className="grid w-full max-w-md grid-cols-5 grid-rows-1 flex-row items-center justify-between sm:grid-cols-8 md:max-w-lg md:grid-cols-10 lg:max-w-2xl">
        {isVisibleCheckbox ? (
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
        ) : null}
        {OrderObj.Url ? (
          <div className="col-span-2 flex flex-col items-center text-center">
            <img
              src={OrderObj.Url}
              alt="cupcake"
              className="h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24"
            />
            <div className="col-span-2 sm:hidden">
              <h1 className="col-span-3 font-[Raleway] text-xs text-gray-700 sm:text-sm">
                {OrderObj.Name}
              </h1>
              <h1 className="col-span-3 font-[Raleway] text-xs text-gray-700 sm:text-sm">
                {OrderObj.Flavor}
              </h1>
            </div>
          </div>
        ) : (
          <div className="flex h-14 w-14 animate-pulse items-center justify-center rounded bg-slate-100 text-xl text-primarylight sm:h-16 sm:w-16">
            <FontAwesomeIcon icon={faImage} />
          </div>
        )}

        <div className="col-span-2 hidden sm:block">
          <h1 className="col-span-3 font-[Raleway] text-xs text-gray-700 sm:text-sm">
            {OrderObj.Name}
          </h1>
          <h1 className="col-span-3 font-[Raleway] text-xs text-gray-700 sm:text-sm">
            {OrderObj.Flavor}
          </h1>
        </div>

        <div className="col-span-2 col-start-7">
          <h1 className="text-end font-[Raleway] text-xs text-gray-700">
            Quantity : {OrderObj.Quantity}
          </h1>
          {OrderObj.Price ? (
            <h1 className="text-end font-[Raleway] text-xs text-gray-700">
              Price : &#8369;{cupcakeObj?.Price}.00
            </h1>
          ) : (
            <h1 className="text-end font-[Raleway] text-xs text-gray-700">
              Price : --.--
            </h1>
          )}
          <div className="flex flex-row items-end gap-1 md:hidden">
            {flavors}
          </div>
        </div>
        <div className="col-span-1 col-start-10 hidden flex-col items-center gap-1 md:flex">
          {flavors}
        </div>
      </div>

      <div className="hidden flex-col gap-1 p-1 group-hover:flex">
        {isVisibleCheckbox ? null : (
          <>
            {cupcakeObj?.Stock ? (
              <button
                className="h-full w-full self-end bg-slate-500 px-2 py-1 text-xs text-white md:text-sm"
                onClick={HandleCheckOut}
              >
                Check Out
              </button>
            ) : (
              <button className="h-full w-full self-end bg-red-400 px-2 py-1 text-xs text-white md:text-sm">
                Out of stock
              </button>
            )}
            <button
              className="h-full w-full self-end bg-red-300 px-2 py-1 text-xs text-white md:text-sm"
              onClick={handleRemove}
            >
              Remove
            </button>
          </>
        )}
      </div>
    </div>
  );
}
