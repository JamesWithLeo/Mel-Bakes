function AddAcount({ setVisibility }) {
  return (
    <div className="flex w-1/2 flex-col bg-slate-500">
      <h1>Edit user</h1>
      <div className="grid grid-cols-2 gap-2 bg-slate-400">
        <h1>Username</h1>
        <input />
        <h1>Gmail</h1>
        <input />
        <h1>Password</h1>
        <input />
      </div>
      <button>Save</button>
      <button
        onClick={() => {
          setVisibility(false);
        }}
      >
        Cancel
      </button>
    </div>
  );
}
export default AddAcount;
