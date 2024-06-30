// import HeaderComponent from "../Header/Header";
import { Link } from "react-router-dom";
import { useState } from "react";
import AddAcount from "./AddAccount";
import AddProduct from "./AddProduct";
import DbConfig from "./DbConfig";

function Admin() {
  const [productFormVisibility, SetProductFromVisibility] = useState(false);
  const [accountFormVisibility, SetAccountFromVisibility] = useState(false);
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
        {<DbConfig />}
      </div>
      <div></div>
    </main>
  );
}
export default Admin;
