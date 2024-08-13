import * as React from "react";
import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store";
import { fetchOrders, IOrder } from "../slice/orderSlice";

export default function Orders() {
  const dispatch = useDispatch<AppDispatch>();
  const [orders, setOrders] = useState<React.JSX.Element[]>([]);
  const orderState = useSelector((state: AppState) => state.order);
  const authState = useSelector((state: AppState) => state.auth);
  // console.log("order state : ", orderState);
  useEffect(() => {
    if (authState.User) {
      dispatch(fetchOrders(authState.User._id))
        .unwrap()
        .then((value: IOrder[]) => {
          console.log(value);

          const ordersElement = value.map((val) => {
            return (
              <OrderCard orderObj={val} key={val._id} setState={setOrders} />
            );
          });
          setOrders(ordersElement);
        });
    }
  }, []);
  return (
    <div className="flex flex-col items-center">
      <header className="sticky top-0 flex h-16 w-full flex-col items-center bg-secondarylight">
        <div className="flex h-full w-full max-w-7xl items-center px-4">
          <h1 className="font-[Lobster] text-3xl text-[#424874]">Mel Bakes</h1>
        </div>
      </header>
      <div className="flex h-max w-full max-w-7xl flex-col gap-4 p-4">
        {orders ? orders : null}
      </div>
    </div>
  );
}
