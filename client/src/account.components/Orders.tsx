import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import axios from "axios";
import { IOrder } from "../slice/orderSlice";
import { useQuery } from "@tanstack/react-query";
import LoadingComponents from "../components/LoadingComponent";
import { Link, Navigate } from "react-router-dom";
import OrderCard from "./OrderCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRight,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

export default function Orders() {
  const user = useSelector((state: AppState) => state.auth.User);

  const fetchOrders = async () => {
    const response = await axios.get("/melbake/order/" + user?._id);
    console.log(response);
    return response.data;
  };

  const orderQuery = useQuery({ queryKey: ["order"], queryFn: fetchOrders });
  if (orderQuery.isError) return <Navigate to={"/account"} replace />;
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-max w-full max-w-7xl flex-col gap-4 p-4">
        {orderQuery.isLoading ? (
          <LoadingComponents />
        ) : (
          <>
            {orderQuery.data && orderQuery.data.length ? (
              <>
                {orderQuery.data.map((order: IOrder) => {
                  return <OrderCard orderObj={order} />;
                })}
              </>
            ) : (
              <div className="flex h-52 w-full flex-col items-center justify-center gap-2">
                <h1 className="text-gray-300">No orders yet</h1>
                <Link
                  to={"/"}
                  replace
                  className="font-raleway flex items-center gap-1 rounded bg-primary px-3 py-1 text-white"
                >
                  Start ordering
                  <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
