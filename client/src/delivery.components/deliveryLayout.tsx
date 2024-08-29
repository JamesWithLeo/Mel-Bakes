import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IAccount, IOrder } from "../appTypes";
import DeliverCard from "./deliverCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store";

import { Navigate } from "react-router-dom";
import { SetDelivery, ShipDelivery } from "../slice/deliverySlice";
import DeliveryControlPanel from "./deliveryControlPanel";

export default function DeliveryLayout() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: AppState) => state.auth.User);
  const delivery = useSelector((state: AppState) => state.deliver.current);

  const query = useQuery({
    queryKey: ["delivery"],
    queryFn: async () => {
      const response = await axios.get("/melbake/order/");
      response.data.forEach((order: IOrder) => {
        if (order.courierId === user?._id) {
          dispatch(SetDelivery(order));
        }
      });
      return await response.data;
    },
  });
  // if user click on card, this state will be defime. then if fetches the receiver
  const [order, setOrder] = useState<IOrder | null>(null);
  const [reciever, setReciever] = useState<IAccount | null>(null);

  const closeView = () => {
    setOrder(null);
  };

  const setView = (order: IOrder) => {
    if (delivery) return;
    setOrder(order);
  };

  useEffect(() => {
    const fetchReciever = async () => {
      if (!order) return;
      const response = await axios.get("/melbake/account/" + order.U_id);
      setReciever(response.data);
    };
    if (order) {
      fetchReciever();
    }
  }, [order]);

  const HandleShip = () => {
    if (!order?._id || !user?._id) return;
    dispatch(
      ShipDelivery({ Oid: order._id, CourierId: user._id, isShipping: true }),
    )
      .unwrap()
      .then(() => {
        query.refetch();
      });
    setOrder(null);
  };

  if (user && (user.role === "admin" || user.role === "courier"))
    return (
      <>
        {order ? (
          <>
            <main
              className="fixed z-10 flex h-svh w-full bg-[#393664] opacity-70"
              onClick={closeView}
            />
            <section className="fixed left-1/2 top-1/2 z-10 flex w-full max-w-sm -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-3">
              <div className="z-10 flex w-full max-w-sm flex-col rounded bg-white p-4 font-mono text-sm text-darker">
                <h1 className="text-md font-semibold text-gray-400">
                  Product Info
                </h1>
                <h1>{order.Name}</h1>
                <h1>Transaction id : {order._id}</h1>
                <h1>Amount : {order.Amount}</h1>
                <h1>Price : {order.Quantity}</h1>
                <h1>Date Ordered : {order.dateOrdered}</h1>

                <h1 className="text-md mt-2 font-semibold text-gray-400">
                  Reciever Info
                </h1>
                <h1>
                  reciever : {reciever?.firstName} {reciever?.lastName}
                </h1>
                <h1>email : {reciever?.email}</h1>
                <h1>address : {reciever?.address}</h1>
                <span className="mt-2 flex gap-2 self-end">
                  <button
                    className="font-redhat rounded p-1 px-2 text-base text-primary hover:bg-gray-100"
                    onClick={closeView}
                  >
                    cancel
                  </button>
                  <button
                    className="font-redhat self-end rounded bg-primary p-1 px-2 text-base text-white"
                    onClick={HandleShip}
                  >
                    Ship this
                  </button>
                </span>
              </div>
            </section>
          </>
        ) : null}

        <main className="flex h-dvh w-full flex-col items-center gap-2 sm:pt-2">
          <DeliveryControlPanel
            refresh={() => {
              query.refetch();
            }}
          />

          <section className="flex w-full flex-col gap-2 overflow-y-scroll sm:max-w-md">
            {query.data && query.data.length ? (
              <>
                {query.data.map((value: IOrder) => {
                  if (value && value.IsPacked && !value.IsShipping)
                    return (
                      <DeliverCard
                        key={value._id}
                        OrderObj={value}
                        setter={setView}
                      />
                    );
                  return null;
                })}
              </>
            ) : null}
          </section>
        </main>
      </>
    );
  else {
    return <Navigate to={"/"} replace />;
  }
}
