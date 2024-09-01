import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Form, Navigate } from "react-router-dom";
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
      <main className="flex h-full gap-2 p-2">
        <div>
          <h1 className="sticky my-2 font-mono text-lg text-primary">
            New Users
          </h1>
          <section className="h-56 overflow-y-auto overflow-x-hidden rounded border px-2">
            <div className="flex flex-col gap-1">
              {userQuery.data
                ? userQuery.data.map((value: IAccount) => {
                    return <NewUserCard account={value} />;
                  })
                : null}
            </div>
          </section>
          <div>
            <h1 className="my-2 font-mono text-lg text-primary">
              Today Orders
            </h1>
            <section className="h-56 overflow-y-auto overflow-x-hidden rounded border px-2">
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
                      return null;
                    })
                  : null}
              </div>
            </section>
          </div>
        </div>

        <div className="h-max">
          <h1 className="my-2 font-mono text-lg text-primary">Add product</h1>
          <section className="flex h-56 flex-col justify-between overflow-y-auto rounded border p-2">
            <div className="flex items-center justify-between gap-2">
              <label className="text-priamry font-Redhat text-sm">id</label>
              <input className="rounded border bg-gray-100 px-1" />
              <button className="rounded bg-primary px-2 py-1 text-xs text-white">
                search and edit
              </button>
            </div>

            <Form className="flex h-max w-full flex-col gap-2 font-Redhat text-sm text-primary">
              <div className="flex justify-between gap-2">
                <label>name</label>
                <input className="w-3/4 rounded border bg-gray-100 px-1" />
              </div>
              <div className="flex justify-between gap-2">
                <label>stock</label>
                <input className="w-3/4 rounded border bg-gray-100 px-1" />
              </div>

              <div className="flex justify-between gap-2">
                <label>price</label>
                <input
                  className="w-3/4 rounded border bg-gray-100 px-1"
                  placeholder="$"
                />
              </div>
              <div className="flex justify-between gap-2">
                <label>photo Url</label>
                <input className="w-3/4 rounded border bg-gray-100 px-1" />
              </div>
              <div className="flex gap-2 self-end">
                <button className="rounded px-2 py-1 text-sm hover:bg-gray-100">
                  clear
                </button>
                <button className="rounded bg-primary px-2 py-1 text-sm text-white">
                  save
                </button>
              </div>
            </Form>
          </section>
        </div>
      </main>
    </>
  );
}
