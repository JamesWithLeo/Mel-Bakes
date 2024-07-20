import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function fetchOrders() {
      const UserId = localStorage.getItem("id");
      await fetch("melbake/orders/" + UserId).then(async (response) => {
        await response.json().then((value) => {
          console.log(value.Order);
          if (value.Order) {
            const orders = value.Order.map((order) => {
              return <OrderCard orderObj={order} />;
            });
            setOrders(orders);
          } else setOrders([<h1>No Orders Yet!</h1>]);
        });
      });
    }
    fetchOrders();
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
