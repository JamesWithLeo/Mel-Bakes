// import HeaderComponent from "../Header/Header";
import { Link } from "react-router-dom";
import { useState } from "react";
import AddAcount from "../admin.components/AddAccount";
import AddProduct from "../admin.components/AddProduct";
import DbConfig from "../admin.components/DbConfig";

function Admin() {
  document.body.style.overflowY = "scroll";

  const [productFormVisibility, SetProductFromVisibility] = useState(false);
  const [accountFormVisibility, SetAccountFromVisibility] = useState(false);
  const [dbConfigVisibility, SetDbConfigVisibility] = useState(false);

  return (
    <main className="flex h-svh w-full flex-col bg-darker">
      <div className="max-h-7xl h-max w-full border-b-2 border-solid border-white bg-darker">
        <Link to={"/"}>Mel Bakes</Link>

        {/* <HeaderComponent /> */}
      </div>
      <div>
        <h1>Admin</h1>
        <button
          className="mx-4 rounded bg-slate-400 px-3 py-1 text-xs text-slate-600"
          onClick={() => {
            SetProductFromVisibility(true);
          }}
        >
          Add Product
        </button>
        <button
          className="mx-4 rounded bg-slate-400 px-3 py-1 text-xs text-slate-600"
          onClick={() => {
            SetAccountFromVisibility(true);
          }}
        >
          Add Account
        </button>
        <button className="mx-4 rounded bg-slate-400 px-3 py-1 text-xs text-slate-600">
          Database Configuration
        </button>
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
      <div></div>
    </main>
  );
}
export default Admin;
