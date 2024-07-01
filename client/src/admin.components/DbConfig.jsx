function DbConfig({ setVisibility }) {
  return (
    <div className="w-1/2 bg-slate-500">
      <h1>Database Configuration</h1>
      <div className="grid grid-cols-2 gap-2 bg-slate-400">
        <h1>URI</h1>
        <input />
        <h1>Password</h1>
        <input />
        <h1>Cluster</h1>
        <input />
      </div>
      <div className="flex flex-col">
        <button>Connect</button>
        <button>Disconnect</button>
        <button>Save</button>
        <button>Cancel</button>
      </div>
    </div>
  );
}
export default DbConfig;
