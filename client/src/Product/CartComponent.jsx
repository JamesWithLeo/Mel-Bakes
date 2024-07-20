import { createContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderComponent from "./OrderComponent";

export const orderContext = createContext();

function CartComponent() {
  document.body.style.overflowY = "hidden";

  let id = localStorage.getItem("id");
  const [orderElements, SetOrderElements] = useState([]);
  const [selectedOrder, SetSelectedOrder] = useState(null);

  async function removeProduct() {
    // remove product in the cart
    let usersId = localStorage.getItem("id");
    const orderbody = JSON.stringify(selectedOrder);
    await fetch("/melbake/mycart/remove/" + usersId, {
      method: "POST",
      body: orderbody,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => {
        SetSelectedOrder(null);
        console.log("Remove in the Cart :", selectedOrder);
      })
      .catch((RejectReason) => {
        console.log(RejectReason);
      });
  }
  async function checkOut() {
    // removes the product in the cart then it checks out that product/ moves to Orders
    const id = localStorage.getItem("id");
    removeProduct();
    // SetSelectedOrder()
    selectedOrder.IsCancel = false;
    selectedOrder.IsDelivered = false;
    selectedOrder.DateOrdered = new Date().toLocaleString();
    console.log(selectedOrder);
    const orderbody = JSON.stringify(selectedOrder);
    await fetch("/melbake/order/" + id, {
      method: "POST",
      body: orderbody,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(async (response) => {
      await response.json().then((value) => {
        console.log(value);
      });
    });
  }

  useEffect(() => {
    async function fetchCartData() {
      // add the id to the params so server can fetch corresponding data in the cart .
      const url = "mycart/" + id;
      await fetch(url)
        .then((response) => {
          response.json().then((orders) => {
            // if successful, render the data in the UI .
            if (orders) {
              let ordersEl = orders.Cart.map((order) => {
                // order.index = selectedOrder;
                return (
                  <>
                    <OrderComponent
                      OrderObj={order}
                      key={crypto.randomUUID()}
                    />
                  </>
                );
              });
              // set the Rendered elements in the state which will be display .
              SetOrderElements(ordersEl);
            }
          });
        })
        .catch((err) => {
          SetOrderElements([
            <h1 className="text-xl font-bold text-primary">
              Can't fetch Cupcakes
            </h1>,
          ]);
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
        <div className="flex w-full justify-between">
          <h1 className="text-3xl font-bold text-primary">Cart</h1>
          <Link
            to="/Orders"
            className="rounded border border-slate-50 px-3 py-1 text-center text-primary shadow"
          >
            Orders
          </Link>
        </div>
        <div className="flex h-full w-full flex-col gap-2 overflow-auto md:flex-row md:gap-4">
          {orderElements.length ? (
            <div className="flex h-full w-full flex-col gap-2 bg-gray-50 px-2">
              <orderContext.Provider value={SetSelectedOrder}>
                {orderElements}
              </orderContext.Provider>
            </div>
          ) : (
            <div className="flex h-full w-full animate-pulse flex-col gap-2 bg-gray-200 px-2"></div>
          )}
        </div>
        <div className="flex flex-col gap-2 md:gap-4">
          {selectedOrder ? (
            <>
              <button
                onClick={checkOut}
                className="rounded border border-slate-50 px-3 py-1 text-red-300 shadow"
              >
                Check Out
              </button>
              <button
                onClick={removeProduct}
                className="rounded border border-slate-50 px-3 py-1 text-red-300 shadow"
              >
                Remove
              </button>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
export default CartComponent;
