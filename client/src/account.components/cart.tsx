import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import { IOrder } from "../slice/orderSlice";
import CartCardComponent from "../Product/cartCardComponent";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useMultiDeleteCart } from "../services/cartService";

export default function Cart() {
  const [selectedProducts, SetSelectedProducts] = useState<IOrder[]>([]);
  const user = useSelector((state: AppState) => state.auth.User);
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
      SetSelectedProducts([...selectedProducts, item]);
  }
  async function removeToSelected(item: IOrder) {
    SetSelectedProducts(
      selectedProducts.filter((value) => value._id !== item._id),
    );
  }
  const { mutateAsync: MulitDeleteCart, isPending: isDeletingMultiDeleteCart } =
    useMultiDeleteCart();

  async function removeProduct() {
    if (!isDeletingMultiDeleteCart) {
      MulitDeleteCart(selectedProducts.map((value: IOrder) => value._id));
      SetSelectedProducts([]);
    }
  }
  if (!user) return <Navigate to={"/"} replace />;

  if (cartQuery.isError) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <main className="">
      {cartQuery.data && cartQuery.data.length ? (
        <div className="flex h-full w-full flex-col gap-2 p-4">
          {cartQuery.data.map((cartItem: IOrder) => (
            <CartCardComponent
              OrderObj={cartItem}
              key={cartItem._id}
              selectThis={addToSelected}
              unSelectThis={removeToSelected}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2">
          <h1 className="text-gray-300">No cupcakes yet?</h1>
        </div>
      )}
    </main>
  );
}
