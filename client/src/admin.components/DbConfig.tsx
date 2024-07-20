import * as React from "react";
function DbConfig({ setVisibility }) {
  return (
    <div className="flex h-full max-h-full w-full flex-col gap-4 bg-white">
      <div className="flex justify-between p-4">
        <h1 className="text-primary">Database Configuration</h1>
      </div>

      <div className="flex flex-col justify-evenly gap-4 sm:flex-row sm:py-8">
        <div className="flex flex-col rounded p-4 sm:grid sm:w-1/2 sm:grid-cols-3 sm:gap-4">
          <h1>URI</h1>
          <input className="col-span-2 mb-2 h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:mb-0 sm:w-full" />
          <h1>Password</h1>
          <input className="col-span-2 mb-2 h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:mb-0 sm:w-full" />
          <h1>Cluster</h1>
          <input className="col-span-2 mb-2 h-8 w-full rounded bg-slate-100 px-2 text-sm outline outline-1 outline-slate-300 focus:outline-2 focus:outline-slate-500 sm:mb-0 sm:w-full" />
        </div>
        <div className="flex flex-col gap-2 p-4 sm:w-1/3">
          <button className="rounded bg-lime-500 py-1 text-sm text-white">
            Connect
          </button>
          <button className="rounded bg-red-400 py-1 text-sm text-white">
            Disconnect
          </button>
          <button className="rounded bg-primary py-1 text-sm text-white">
            Save
          </button>
          <button className="rounded border border-primary bg-white py-1 text-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
export default DbConfig;
