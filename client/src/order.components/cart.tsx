import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import { IOrder } from "../appTypes";
import CartCard from "../cart.components/cartCard";
import { Navigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useMultiDeleteCart } from "../services/cartService";

export default function Cart() {
  const user = useSelector((state: AppState) => state.auth.User);

  const [selectedProducts, setSelectedProducts] = useState<IOrder[]>([]);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await axios.get("/melbake/cart/" + user?._id);
      return await response.data;
    },
  });

  async function addToSelected(item: IOrder) {
    const existedItem = selectedProducts.filter(
      (value) => value._id === item._id,
    );
    if (item && !existedItem.length)
      setSelectedProducts([...selectedProducts, item]);
  }
  async function removeToSelected(item: IOrder) {
    setSelectedProducts(
      selectedProducts.filter((value) => value._id !== item._id),
    );
  }
  const { mutateAsync: MulitDeleteCart, isPending: isDeletingMultiDeleteCart } =
    useMultiDeleteCart();

  async function removeProduct() {
    console.log("1here`");
    if (!isDeletingMultiDeleteCart) {
      console.log("here`");
      MulitDeleteCart(selectedProducts.map((value: IOrder) => value._id));
      setIsSelecting(false);
      setSelectedProducts([]);
    }
  }
  if (!user) return <Navigate to={"/"} replace />;

  if (cartQuery.isError) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <>
      <main className="flex h-full flex-col items-center">
        {cartQuery.data && cartQuery.data.length ? (
          <div className="flex w-full justify-end gap-2 px-2 md:gap-4">
            {isSelecting ? (
              <button
                className="rounded border border-primarylight px-3 py-1 text-primarylight shadow"
                onClick={() => {
                  setSelectedProducts([]);
                  setIsSelecting(false);
                }}
              >
                deselect
              </button>
            ) : (
              <button
                className="rounded border border-primarylight px-3 py-1 text-primarylight shadow"
                onClick={() => {
                  setIsSelecting(true);
                }}
              >
                select
              </button>
            )}
            <div className="flex flex-row gap-2 md:gap-4">
              {selectedProducts.length ? (
                <>
                  <button
                    onClick={removeProduct}
                    className="rounded bg-red-300 px-3 py-1 text-red-500 shadow"
                  >
                    Remove ({selectedProducts.length})
                  </button>
                </>
              ) : null}
            </div>
          </div>
        ) : null}
        {cartQuery.data && cartQuery.data.length ? (
          <>
            <div className="flex w-full flex-col gap-1 p-2 lg:p-4">
              {cartQuery.data.map((cartItem: IOrder) => (
                <CartCard
                  OrderObj={cartItem}
                  key={cartItem._id}
                  selectThis={addToSelected}
                  isVisibleCheckbox={isSelecting}
                  unSelectThis={removeToSelected}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2">
            <h1 className="text-gray-300">No cupcakes yet?</h1>
            <Link
              to={"/"}
              replace
              className="flex items-center gap-1 rounded px-3 py-1 font-raleway text-primary shadow active:shadow-primary"
            >
              Start ordering
              <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
