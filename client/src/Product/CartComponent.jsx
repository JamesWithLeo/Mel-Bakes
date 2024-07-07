import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
function CartComponent() {
  useEffect(() => {
    async function fetchCartData() {
      // await fetch("melbake/mycart/");
      console.log("Cart is Open");
    }
    fetchCartData();
  }, []);

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
        <div className="flex h-full w-full flex-col gap-2 md:flex-row md:gap-4">
          <ul className="flex flex-row gap-4 bg-white md:flex-col">
            <li>
              <Link className="text-primary">All</Link>
            </li>
            <li>
              <Link className="text-primary">Recieved</Link>
            </li>
            <li>
              <Link className="text-primary">Cancelled</Link>
            </li>
          </ul>
          <div className="h-full w-full bg-gray-50 px-2">
            <div className="flex justify-between bg-secondarylight p-2 md:px-4">
              <h1>Cappucino Lick</h1>
              <div>
                <h1 className="text-xs">Order by : July 5 2024</h1>
                <h1 className="text-xs">Recieve by : July 6 2024</h1>
              </div>
              <div>
                <h1 className="text-end text-sm">
                  Quantity : 1 dozen / 12 pieces
                </h1>
                <h1 className="text-end text-sm">Price : 130.00</h1>
              </div>
            </div>
          </div>
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
