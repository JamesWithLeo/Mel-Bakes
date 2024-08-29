import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { IAccount, IOrder } from "../appTypes";
import NewOrderCard from "./newOrderCard";
import NewUserCard from "./newUserCard";

export function useRemoveNewOrder() {
  const query = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return;
    },
    onMutate: (variables) => {
      query.setQueryData(["order"], (prevOrder: IOrder[]) => {
        return prevOrder.filter((value) => value._id !== variables);
      });
    },
  });
}
export function useRemoveNewUser() {
  const query = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return;
    },
    onMutate: (variables) => {
      query.setQueryData(["user"], (prevAccount: IAccount[]) => {
        return prevAccount.filter((value) => value._id !== variables);
      });
    },
  });
}
export default function New() {
  const orderQuery = useQuery({
    queryKey: ["order"],
    queryFn: async () => {
      const response = await axios.get("/melbake/order/");
      return await response.data;
    },
  });
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get("/melbake/accounts/");
      return await response.data;
    },
  });
  if (orderQuery.isError) return <Navigate to={"/"} />;
  return (
    <>
      <main className="flex gap-2 p-2">
        <section className="h-52 overflow-y-scroll border px-2 lg:h-96">
          <h1 className="sticky my-2 font-mono text-lg text-primary">
            New Users
          </h1>
          <div className="flex flex-col gap-1">
            {userQuery.data
              ? userQuery.data.map((value: IAccount) => {
                  return <NewUserCard account={value} />;
                })
              : null}
          </div>
        </section>
        <section className="h-52 overflow-y-scroll border px-2 lg:h-96">
          <h1 className="my-2 font-mono text-lg text-primary">Today Orders</h1>
          <div className="flex flex-col gap-1">
            {orderQuery.data
              ? orderQuery.data.map((value: IOrder) => {
                  if (
                    !value.IsPacked &&
                    !value.IsShipping &&
                    !value.IsReceived
                  ) {
                    console.log(value);
                    return <NewOrderCard order={value} />;
                  }
                })
              : null}
          </div>
        </section>
      </main>
    </>
  );
}
