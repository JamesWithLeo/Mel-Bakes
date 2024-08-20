import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import CartCard from "./cartCard";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import axios from "axios";
import { IOrder } from "../slice/orderSlice";
import { useQuery } from "@tanstack/react-query";
import { useMultiDeleteCart } from "../services/cartService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";

export default function ModalCart() {
  document.body.style.overflowY = "hidden";
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
    if (!isDeletingMultiDeleteCart) {
      MulitDeleteCart(selectedProducts.map((value: IOrder) => value._id));
      setSelectedProducts([]);
    }
  }

  const exitCart = () => {
    document.body.style.overflowY = "scroll";
  };
  if (!user) return <Navigate to={"/"} replace />;
  if (cartQuery.isError) {
    return <Navigate to={"/"} replace />;
  }
  return (
    <>
      <Link to={"/"}>
        <div
          id="CardBackground"
          onClick={exitCart}
          className="z-500 fixed top-0 h-screen w-full bg-darker opacity-50"
        ></div>
      </Link>
      <div
        id="CartWrapper"
        className="fixed left-1/2 top-0 z-50 mx-auto flex h-2/3 w-full -translate-x-1/2 flex-col gap-4 rounded-b-lg bg-white p-2 sm:w-11/12 md:p-4"
      >
        <section className="flex w-full justify-between">
          <h1 className="text-3xl font-bold text-primary">Cart</h1>
          <div className="flex gap-2">
            {cartQuery.data && cartQuery.data.length ? (
              <>
                {isSelecting ? (
                  <button
                    className="rounded border border-primarylight px-3 py-1 text-primarylight shadow"
                    onClick={() => {
                      setIsSelecting(false);
                      setSelectedProducts([]);
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
              </>
            ) : null}
            <Link
              to="/order/order"
              onClick={() => {
                document.body.style.overflowY = "scroll";
              }}
              replace={true}
              className="flex items-center gap-2 rounded border border-slate-50 px-3 py-1 text-center text-primary shadow"
            >
              <FontAwesomeIcon icon={faBoxOpen} />
              orders
            </Link>
          </div>
        </section>
        <div className="flex h-full w-full flex-col gap-2 overflow-auto md:flex-row md:gap-4">
          {cartQuery.isFetching ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-2">
              <h1 className="text-sm text-primary">Loading...</h1>
            </div>
          ) : (
            <>
              {cartQuery.data && cartQuery.data.length ? (
                <div className="flex h-full w-full flex-col gap-2 px-2">
                  {cartQuery.data.map((cartItem: IOrder) => (
                    <CartCard
                      OrderObj={cartItem}
                      key={cartItem._id}
                      selectThis={addToSelected}
                      unSelectThis={removeToSelected}
                      isVisibleCheckbox={isSelecting}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gray-50">
                  <h1 className="text-gray-300">No cupcakes yet?</h1>
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-4">
          {selectedProducts.length ? (
            <>
              <button className="rounded border bg-primarylight px-3 py-1 text-white shadow">
                Check Out
              </button>
              <button
                onClick={removeProduct}
                className="rounded border bg-red-300 px-3 py-1 text-red-500 shadow"
              >
                Remove ({selectedProducts.length})
              </button>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
