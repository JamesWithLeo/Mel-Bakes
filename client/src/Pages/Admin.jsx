// import HeaderComponent from "../Header/Header";
import { Link } from "react-router-dom";
import { useState } from "react";
import AddAcount from "../admin.components/AddAccount";
import AddProduct from "../admin.components/AddProduct";
import DbConfig from "../admin.components/DbConfig";
import plaidPattern from "../assets/images/pattern.svg";

function Admin() {
  document.body.style.overflowY = "scroll";

  const [productFormVisibility, SetProductFromVisibility] = useState(false);
  const [accountFormVisibility, SetAccountFromVisibility] = useState(false);
  const [dbConfigVisibility, SetDbConfigVisibility] = useState(false);

  function handleAside(event) {
    if (event.target.id !== "adminAside") {
      const elements = document.getElementById("adminAside").children;
      let i;
      for (i = 0; i < elements.length; i++) {
        elements[i].className = "w-full px-3 py-2 text-xs text-white";
      }
      event.target.className = "w-full bg-white px-3 py-2 text-xs text-primary";
    }
    console.log(event.target);
  }

  return (
    <main
      className="flex h-svh w-full flex-col items-center"
      style={{ backgroundImage: `url(${plaidPattern})` }}
    >
      <header className="flex h-16 w-full flex-col items-center justify-center bg-primary">
        <div className="flex h-full w-full max-w-7xl items-center px-4">
          <Link to={"/"} className="font-[Lobster] text-3xl text-white">
            Mel Bakes
          </Link>
        </div>
      </header>
      <main className="flex h-full w-full max-w-7xl bg-[#a6b1e1]">
        <div className="justify-cente flex h-max w-1/3 flex-col items-center gap-2">
          <h1 className="my-4 text-2xl text-primary">Admin</h1>
          <aside id="adminAside" onClick={handleAside}>
            <button
              className="w-full px-3 py-2 text-xs text-white"
              onClick={() => {
                SetProductFromVisibility(true);
                SetAccountFromVisibility(false);
                SetDbConfigVisibility(false);
              }}
            >
              Add Product
            </button>
            <button
              className="w-full px-3 py-2 text-xs text-white"
              onClick={() => {
                SetAccountFromVisibility(true);
                SetProductFromVisibility(false);
                SetDbConfigVisibility(false);
              }}
            >
              Add Account
            </button>
            <button
              className="w-full px-3 py-2 text-xs text-white"
              onClick={() => {
                SetDbConfigVisibility(true);
                SetAccountFromVisibility(false);
                SetProductFromVisibility(false);
              }}
            >
              Database Configuration
            </button>
          </aside>
        </div>

        <div className="h-full w-full bg-white">
          {productFormVisibility ? (
            <AddProduct setVisibility={SetProductFromVisibility} />
          ) : null}
          {accountFormVisibility ? (
            <AddAcount setVisibility={SetAccountFromVisibility} />
          ) : null}
          {dbConfigVisibility ? (
            <DbConfig setVisibility={SetDbConfigVisibility} />
          ) : null}
        </div>
      </main>
    </main>
  );
}
export default Admin;
