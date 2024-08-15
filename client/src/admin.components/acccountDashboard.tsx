import axios from "axios";
import AccountTable from "./accountTable";
import { useLayoutEffect, useState } from "react";
import { IUser } from "../slice/authSlice";
function AddAcount() {
  const [accounts, SetAccounts] = useState<IUser[]>([]);
  useLayoutEffect(() => {
    axios.get("/melbake/account").then((value) => {
      SetAccounts(value.data);
    });
  }, []);

  return (
    <div className="flex h-full max-h-full w-full flex-col bg-white">
      {/* <div className="flex justify-evenly">
        <div className="flex w-1/2 flex-col justify-evenly gap-4 p-4 sm:grid sm:grid-cols-3 sm:gap-4">
          <h1 className="align-middle text-primary">Username</h1>
          <input className="col-span-2 mb-2 h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:mb-0 sm:w-full" />
          <h1 className="text-primary">Gmail</h1>
          <input className="col-span-2 mb-2 h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:mb-0 sm:w-full" />
          <h1 className="text-primary">Password</h1>
          <input className="col-span-2 mb-2 h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:mb-0 sm:w-full" />
        </div>

        <div className="flex w-1/3 flex-col gap-2 p-4">
          <button className="rounded bg-primary py-1 text-sm text-white">
            Save
          </button>
          <button className="rounded border border-primary bg-white py-1 text-sm">
            Cancel
          </button>
        </div>
      </div> */}
      {accounts ? <AccountTable data={accounts} /> : null}
    </div>
  );
}
export default AddAcount;
