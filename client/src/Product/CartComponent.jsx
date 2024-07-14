import { createContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import OrderComponent from "./OrderComponent";

export const orderContext = createContext();

function CartComponent() {
  let id = localStorage.getItem("id");
  const [orderElements, SetOrderElements] = useState([]);
  const [selectedOrder, SetSelectedOrder] = useState(null);

  async function removeProduct() {
    let usersId = localStorage.getItem("id");
    const orderbody = JSON.stringify(selectedOrder);
    await fetch("/melbake/mycart/remove/" + usersId, {
      method: "POST",
      body: orderbody,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => {
      SetSelectedOrder(null);
      console.log("Remove in the Cart :", selectedOrder);
    });
  }

  useEffect(() => {
    async function fetchCartData() {
      // add the id to the params so server can fetch corresponding data in the cart .
      const url = "mycart/" + id;
      const response = await fetch(url);
      await response
        .json()
        .then((orders) => {
          // if successful, render the data in the UI .
          if (orders) {
            let ordersEl = orders.Cart.map((order) => {
              // order.index = selectedOrder;
              return (
                <>
                  <OrderComponent OrderObj={order} key={crypto.randomUUID()} />
                </>
              );
            });
            // set the Rendered elements in the state which will be display .
            SetOrderElements(ordersEl);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchCartData();
  }, [id, selectedOrder]);

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
        <h1 className="text-3xl font-bold text-primary">Order {id}</h1>
        <div className="flex h-full w-full flex-col gap-2 md:flex-row md:gap-4">
          {orderElements.length ? (
            <div className="flex h-full w-full flex-col gap-2 bg-gray-50 px-2">
              <orderContext.Provider value={SetSelectedOrder}>
                {orderElements}
              </orderContext.Provider>
            </div>
          ) : (
            <div className="flex h-full w-full animate-pulse flex-col gap-2 bg-gray-200 px-2"></div>
          )}

          <div className="flex flex-col gap-2 md:gap-4">
            <button className="rounded border border-slate-50 px-3 py-1 text-primary shadow">
              Order
            </button>
            <button className="rounded border border-slate-50 px-3 py-1 text-primary shadow">
              Payment
            </button>
            {selectedOrder ? (
              <button
                onClick={removeProduct}
                className="rounded border border-slate-50 px-3 py-1 text-red-300 shadow"
              >
                Remove
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
export default CartComponent;
