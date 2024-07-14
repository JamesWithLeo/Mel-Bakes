import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderComponent from "./OrderComponent";

function CartComponent() {
  let id = sessionStorage.getItem("id");
  const [orderElements, SetOrderElements] = useState([]);
  useEffect(() => {
    async function fetchCartData() {
      const url = "mycart/" + id;

      const response = await fetch(url);
      await response
        .json()
        .then((orders) => {
          if (orders.length) {
            let ordersEl = orders.Cart.map((order) => {
              return (
                <>
                  <OrderComponent OrderObj={order} key={crypto.randomUUID()} />
                </>
              );
            });
            SetOrderElements(ordersEl);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchCartData();
  }, [id]);

  const exitCart = () => {
    document.body.style.overflowY = "scroll";
  };

  return (
    <>
      <Link to={"/"}>
        <div
          id="CardBackground"
          onClick={exitCart}
          className="z-500 fixed top-0 h-screen w-full bg-darker opacity-50"
        ></div>
      </Link>
      <div
        id="CartWrapper"
        className="fixed left-1/2 top-0 z-50 mx-auto flex h-2/3 w-full -translate-x-1/2 flex-col gap-4 rounded-b-lg bg-white p-2 sm:w-11/12 md:p-4"
      >
        <h1 className="text-3xl font-bold text-primary">Order</h1>
        {/* <h1 className="text-3xl font-bold text-primary">{id}</h1> */}
        <div className="flex h-full w-full flex-col gap-2 md:flex-row md:gap-4">
          {orderElements.length ? (
            <div className="flex h-full w-full flex-col gap-2 bg-gray-50 px-2">
              {orderElements}
            </div>
          ) : null}

          <div className="flex flex-col gap-2 md:gap-4">
            <button className="rounded border border-slate-50 px-3 py-1 text-primary shadow">
              Order
            </button>
            <button className="rounded border border-slate-50 px-3 py-1 text-primary shadow">
              Payment
            </button>
            <button className="rounded border border-slate-50 px-3 py-1 text-red-300 shadow">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CartComponent;
