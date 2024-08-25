import { useSelector } from "react-redux";
import { AppState } from "../store";
import axios from "axios";
import { IOrder } from "../appTypes";
import { useQuery } from "@tanstack/react-query";
import LoadingComponents from "../components/LoadingComponent";
import { Link, Navigate } from "react-router-dom";
import OrderCard from "./OrderCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Orders() {
  const user = useSelector((state: AppState) => state.auth.User);

  const fetchOrders = async () => {
    const response = await axios.get("/melbake/order/" + user?._id);
    console.log(response.data);
    return response.data;
  };

  const orderQuery = useQuery({ queryKey: ["order"], queryFn: fetchOrders });
  if (orderQuery.isError) return <Navigate to={"/account"} replace />;
  return (
    <>
      <main
        className="flex h-full w-full flex-col items-center"
        id="orderContainer"
      >
        {orderQuery.isLoading ? (
          <LoadingComponents />
        ) : (
          <>
            {orderQuery.data && orderQuery.data.length ? (
              <>
                <div className="grid h-max w-full max-w-7xl flex-col gap-4 p-4 md:grid-cols-2">
                  {orderQuery.data.map((order: IOrder) => {
                    return <OrderCard orderObj={order} key={order._id} />;
                  })}
                </div>
              </>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                <h1 className="text-gray-300">No orders yet?</h1>
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
          </>
        )}
      </main>
    </>
  );
}
