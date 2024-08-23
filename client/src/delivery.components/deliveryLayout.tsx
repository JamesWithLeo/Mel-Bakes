import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IAccount, IOrder } from "../appTypes";
import DeliverCard from "./deliverCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Navigate } from "react-router-dom";
import { Logout } from "../slice/authSlice";
import { useShipping } from "../services/deliveryService";
import { ResetDelivery, SetDelivery } from "../slice/deliverySlice";

export default function DeliveryLayout() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: AppState) => state.auth.User);
  const delivery = useSelector((state: AppState) => state.delivery);

  const query = useQuery({
    queryKey: ["delivery"],
    queryFn: async () => {
      const response = await axios.get("/melbake/order/");
      return await response.data;
    },
  });

  const { mutateAsync: Ship, isPending: isPendingShip } = useShipping();

  const [isViewing, setIsViewing] = useState<boolean>(false);
  const [isHiddenDelivery, setIsHiddenDelivery] = useState<boolean>(true);

  const [order, setOrder] = useState<IOrder | null>(null);
  const [reciever, setReciever] = useState<IAccount | null>(null);

  const openView = () => {
    if (order) return;
    setIsViewing(true);
  };
  const closeView = () => {
    setIsViewing(false);
  };

  const setObjectAsCurrent = (order: IOrder) => {
    setOrder(order);
  };

  const fetchReciever = async () => {
    if (!order) return;
    const response = await axios.get("/melbake/account/" + order?.U_id);
    setReciever(response.data);
  };
  useEffect(() => {
    if (order) {
      fetchReciever();
    }
  }, [order]);

  const HandleAbort = async () => {
    if (!delivery) return;
    dispatch(ResetDelivery());
    Ship({ oid: delivery?._id, IsShipping: false });
  };

  const HandleShip = () => {
    if (!order || isPendingShip) return;

    Ship({ oid: order._id, IsShipping: true });
    dispatch(SetDelivery(order));

    setOrder(null);
    setIsViewing(false);
  };

  const HandleLogout = () => {
    dispatch(Logout());
  };

  if (!user) return <Navigate to={"/"} replace />;
  else if (user.type === "user") return <Navigate to={"/"} replace />;

  return (
    <>
      {isViewing && order ? (
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
              <h1>Date Ordered : {order.DateOrdered}</h1>

              <h1 className="text-md mt-2 font-semibold text-gray-400">
                Reciever Info
              </h1>
              <h1>
                reciever : {reciever?.firstName} {reciever?.lastName}
              </h1>
              <h1>address : {reciever?.address}</h1>
              <h1>contact : {reciever?.contact}</h1>
              <h1>email : {reciever?.email}</h1>
              <span className="mt-2 flex gap-2 self-end">
                <button
                  className="rounded p-1 px-2 font-redhat text-base text-primary hover:bg-gray-100"
                  onClick={closeView}
                >
                  cancel
                </button>
                <button
                  className="self-end rounded bg-primary p-1 px-2 font-redhat text-base text-white"
                  onClick={HandleShip}
                >
                  Ship this
                </button>
              </span>
            </div>
          </section>
        </>
      ) : null}

      <main className="flex h-dvh w-full flex-col items-center gap-2">
        <section className="flex h-max w-full flex-col items-center justify-between p-2">
          <div className="flex w-full flex-col rounded bg-gradient-to-br from-primarylight from-50% p-4 shadow sm:max-w-md">
            <span className="flex justify-between">
              <h1 className="font-redhat font-medium text-darker">
                {user.firstName} {user.lastName}
              </h1>
              <button
                className="w-max rounded bg-white px-2 font-redhat text-sm active:scale-105"
                onClick={HandleLogout}
              >
                Logout
              </button>
            </span>
            <h1 className="font-redhat font-medium text-darker">
              {user.contact}
            </h1>
            <span className="flex gap-2 font-redhat font-medium text-darker">
              <h1>status: active</h1>
            </span>
            <hr className="h-0.5 rounded bg-primarylight" />
            {delivery._id ? (
              <>
                <div className="group flex w-full flex-col items-end text-primary transition-transform delay-300 duration-200 ease-linear">
                  {isHiddenDelivery ? (
                    <button
                      className="ml-1 mt-1 flex w-max items-center place-self-start text-xl"
                      onClick={() => {
                        setIsHiddenDelivery(false);
                      }}
                    >
                      <FontAwesomeIcon icon={faEye} className="text-primary" />
                    </button>
                  ) : (
                    <button
                      className="ml-1 mt-1 flex w-max items-center place-self-start text-xl"
                      onClick={() => {
                        setIsHiddenDelivery(true);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="text-primary"
                      />
                    </button>
                  )}
                  {isHiddenDelivery ? (
                    <>
                      <h1 className="col-span-1 col-start-1 row-start-1 font-redhat text-sm font-medium">
                        Currently shipping : {delivery.Name}
                      </h1>
                      <h1 className="font-redhat text-sm font-medium">
                        Price : {delivery.Amount}
                      </h1>
                      <h1 className="col-start-1 font-redhat text-sm font-medium">
                        Quantity : {delivery.Quantity}
                      </h1>
                      <button
                        className="col-start-2 row-start-6 w-max place-self-end rounded bg-white px-2 py-1 text-sm text-red-500 shadow"
                        onClick={HandleAbort}
                      >
                        abort delivery
                      </button>
                    </>
                  ) : null}
                </div>
              </>
            ) : (
              <h1 className="text-sm text-gray-500">No Selected delivery</h1>
            )}
          </div>
        </section>

        <section className="flex w-full flex-col gap-2 overflow-y-scroll p-1 sm:max-w-md">
          {query.data && query.data.length ? (
            <>
              {query.data.map((value: IOrder) => {
                if (value && value.IsShipping === false)
                  return (
                    <DeliverCard
                      key={value._id}
                      OrderObj={value}
                      viewOrder={openView}
                      setter={setObjectAsCurrent}
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
}
