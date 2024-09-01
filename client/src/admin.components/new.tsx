import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { IAccount, IOrder } from "../appTypes";
import NewOrderCard from "./newOrderCard";
import NewUserCard from "./newUserCard";
import { useState } from "react";
import Notify from "../components/notify";
import { useSearchProduct } from "../services/productService";

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
  const searchProduct = useSearchProduct();
  const [notification, setNotification] = useState<string>("");
  const [notificationType, setNotificationType] = useState<
    "information" | "danger"
  >("information");
  function HandleSearchProduct() {
    searchProduct.mutateAsync("667e93a3055f43825ee20dd9");
  }
  function HandleClearCreateProduct() {
    const name = document.getElementById("productName") as HTMLInputElement;
    const price = document.getElementById("productPrice") as HTMLInputElement;
    const stock = document.getElementById("productStock") as HTMLInputElement;
    const url = document.getElementById("productUrl") as HTMLInputElement;
    const flavors = document.getElementById(
      "productFlavors",
    ) as HTMLInputElement;
    const description = document.getElementById(
      "productDescription",
    ) as HTMLInputElement;
    name.value = "";
    price.value = "";
    stock.value = "";
    url.value = "";
    flavors.value = "";
    description.value = "";
  }
  async function HandleCreateProduct() {
    const name = document.getElementById("productName") as HTMLInputElement;
    const price = document.getElementById("productPrice") as HTMLInputElement;
    const stock = document.getElementById("productStock") as HTMLInputElement;
    const url = document.getElementById("productUrl") as HTMLInputElement;
    const flavors = document.getElementById(
      "productFlavors",
    ) as HTMLInputElement;
    const description = document.getElementById(
      "productDescription",
    ) as HTMLInputElement;
    if (!name.value || !price.value || !stock.value || !url.value) return;

    const newProduct = {
      Name: name.value,
      Price: Number(price.value),
      Stock: Number(stock.value),
      Url: url.value,
      Description: description.value,
      Flavor: flavors.value,
      _id: "",
    };
    const response = await axios.post("/melbake/product/", newProduct);
    if (response.data.insertedId) {
      setNotificationType("information");
      setNotification("A new product added!");
      HandleClearCreateProduct();
    } else {
      setNotificationType("danger");
      setNotification("failed adding product");
    }
    setTimeout(() => {
      setNotification("");
    }, 4000);
  }

  if (orderQuery.isError) return <Navigate to={"/"} />;
  return (
    <>
      {notification ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Notify text={notification} type={notificationType} />
        </div>
      ) : null}

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
          <section className="flex flex-col justify-between gap-4 overflow-y-auto rounded border p-2">
            <div className="flex items-center justify-between gap-2">
              <label className="text-priamry font-Redhat text-sm">id</label>
              <input className="rounded border bg-gray-100 px-1" />
              <button
                className="rounded bg-primary px-2 py-1 text-xs text-white"
                onClick={HandleSearchProduct}
              >
                search and edit
              </button>
            </div>

            <div className="flex h-max w-full flex-col gap-2 font-Redhat text-xs text-primary">
              <div className="flex justify-between gap-2">
                <label>name</label>
                <input
                  name="Name"
                  id="productName"
                  className="w-3/4 rounded border bg-gray-100 p-1"
                />
              </div>
              <div className="flex justify-between gap-2">
                <label>stock</label>
                <input
                  name="Stock"
                  id="productStock"
                  className="w-3/4 rounded border bg-gray-100 p-1"
                />
              </div>

              <div className="flex justify-between gap-2">
                <label>price</label>
                <input
                  name="Price"
                  id="productPrice"
                  className="w-3/4 rounded border bg-gray-100 p-1"
                  placeholder="$"
                />
              </div>
              <div className="flex justify-between gap-2">
                <label>photo Url</label>
                <input
                  name="Url"
                  id="productUrl"
                  className="w-3/4 rounded border bg-gray-100 p-1"
                />
              </div>

              <div className="flex justify-between gap-2">
                <label>description</label>
                <input
                  name="Description"
                  id="productDescription"
                  className="w-3/4 rounded border bg-gray-100 p-1"
                />
              </div>
              <div className="flex justify-between gap-2">
                <label>flavors</label>
                <input
                  name="Flavors"
                  id="productFlavors"
                  className="w-3/4 rounded border bg-gray-100 p-1"
                />
              </div>

              <div className="flex gap-2 self-end">
                <button
                  onClick={HandleClearCreateProduct}
                  className="rounded px-2 py-1 text-sm hover:bg-gray-100"
                >
                  clear
                </button>
                <button
                  onClick={HandleCreateProduct}
                  className="rounded bg-primary px-2 py-1 text-sm text-white"
                >
                  save
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
